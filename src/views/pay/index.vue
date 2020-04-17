<template>
    <div class="checkout">
        <div class="header">
            <div class="container">
                <div class="header-title has-more">
                    <h2>支付订单</h2>
                </div>
            </div>
        </div>
        <div class="page-main">
            <div class="container confirm-box">
                <form action="#" method="post">
                    <div class="section section-order">
                        <div class="order-info clearfix">
                            <div class="fl">
                                <h2 class="title">订单提交成功！去付款咯～</h2>
                                <p class="order-time"></p>
                                <p class="order-time">请在<span class="pay-time-tip">{{exceptionTime}}</span>内完成支付,
                                    超时后将取消订单</p>
                                <p class="post-info post-info-hide">
                                    收货信息：{{orderInfo.address.name}}
                                    {{orderInfo.address.phoneNumber|phoneNumberFilter}} &nbsp;&nbsp;&nbsp;&nbsp;
                                    {{orderInfo.address.city}}&nbsp;&nbsp;
                                    {{orderInfo.address.region}}&nbsp;&nbsp;
                                    {{orderInfo.address.street}}&nbsp;&nbsp;
                                    {{orderInfo.address.detailAddress}}
                                </p>
                            </div>
                            <div class="fr">
                                <p class="total">
                                    应付总额：<span class="money"><em>{{orderInfo.total}}</em>元</span>
                                </p>
                                <a href="javascript:void(0);" class="show-detail">订单详情<i
                                        class="iconfont"></i></a>
                            </div>
                        </div>
                        <i class="iconfont icon-right">√</i>
                        <div class="order-detail" style="display: block">
                            <ul>
                                <li class="clearfix">
                                    <div class="label">订单号：</div>
                                    <div class="content">
                                        <span class="order-num">
                                         {{orderInfo.orderSn}}
                                        </span>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="label">收货信息：</div>
                                    <div class="content">
                                        {{orderInfo.address.name}}
                                        {{orderInfo.address.phoneNumber|phoneNumberFilter}} &nbsp;&nbsp;&nbsp;&nbsp;
                                        {{orderInfo.address.city}}&nbsp;&nbsp;
                                        {{orderInfo.address.region}}&nbsp;&nbsp;
                                        {{orderInfo.address.street}}&nbsp;&nbsp;
                                        {{orderInfo.address.detailAddress}}
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="label">商品名称：</div>
                                    <div class="content">
                                        <p v-for="(item,index) in orderInfo.productList" :key="index">
                                            {{getProductName(item)}}
                                        </p>
                                    </div>
                                </li>
                                <li class="clearfix hide">
                                    <div class="label">配送时间：</div>
                                    <div class="content">
                                        不限送货时间
                                    </div>
                                </li>
                                <!--<li class="clearfix">
                                    <div class="label">发票信息：</div>
                                    <div class="content">
                                        电子发票 个人
                                    </div>
                                </li>-->
                            </ul>
                        </div>
                    </div>
                    <div class="section section-payment">
                        <div class="cash-title">
                            选择以下支付方式付款
                        </div>

                        <div class="payment-box ">
                            <div class="payment-header clearfix">
                                <h3 class="title">支付平台</h3>
                                <span class="desc"></span>
                            </div>
                            <div class="payment-body">
                                <ul class="clearfix payment-list">
                                    <li @click="pay">
                                        <input type="radio" name="payOnlineBank" value="alipay"> <img
                                            src="../../assets/images/payOnline_zfb.png" alt="支付宝"
                                            style="margin-left: 0;"></li>
                                    <li>
                                        <img src="../../assets/images/weixinpay.png" alt="微信支付"
                                             style="margin-left: 0;"></li>
                                    <li>
                                        <input type="radio" name="payOnlineBank" id="unionpay" value="unionpay"> <img
                                            src="../../assets/images/unionpay.png?ver2015" alt="银联"
                                            style="margin-left: 0;"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderInfoByOrderSn, payOrder} from '@/api/order'

    export default {
        name: "checkOrder",
        props: {},
        data() {
            return {
                orderInfo: {
                    "orderSn": "",
                    "address": {
                        "name": "",
                        "phoneNumber": "",
                        "province": "",
                        "city": "",
                        "region": "",
                        "street": ""
                    },
                    "productList": [
                        {
                            "productName": "",
                            "productAttr": ""
                        }
                    ],
                    "total": 0,
                    "createTime": ""
                },
                expirationTimeStamp: '',
                timer: null,
                exceptionTime: '',
                timeOut: false
            }
        },
        methods: {
            //获取订单信息
            getOrderInfo(orderSn) {
                getOrderInfoByOrderSn(orderSn).then((response) => {
                    this.orderInfo = response.data
                    this.getExpirationTime(this.orderInfo.createTime)
                })
            },
            getProductName(item) {
                let productName = item.productName;
                let values = JSON.parse(item.productAttr);
                let result = "";
                for (let i = 0; i < values.length; i++) {
                    result += values[i].value + " "
                }
                return productName + " " + result
            },
            getExpirationTime(createTime) {
                let date = new Date(createTime);
                date.setMinutes(date.getMinutes() + 30)
                window.console.log(date)
                this.expirationTimeStamp = date.getTime()
            },
            getDifference() {
                // 获取当前时间，同时得到活动结束时间数组
                let newTime = new Date().getTime();
                // 对结束时间进行处理渲染到页面
                let endTime = this.expirationTimeStamp
                let obj = null;
                // 如果活动未结束，对时间进行处理
                if (endTime - newTime > 0) {
                    let time = (endTime - newTime) / 1000;
                    // 获取天、时、分、秒
                    let day = parseInt(time / (60 * 60 * 24));
                    let hou = parseInt(time % (60 * 60 * 24) / 3600);
                    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
                    obj = {
                        day: this.timeFormat(day),
                        hou: this.timeFormat(hou),
                        min: this.timeFormat(min),
                        sec: this.timeFormat(sec)
                    };
                } else { // 活动已结束，全部设置为'00'
                    this.timeOut = true
                    obj = {
                        day: '00',
                        hou: '00',
                        min: '00',
                        sec: '00'
                    };
                    clearInterval(this.timer);
                }
                this.exceptionTime = obj.min + '分' + obj.sec + '秒';

            },
            timeFormat(param) {
                return param < 10 ? '0' + param : param;
            },
            //订单支付
            pay() {
                let orderSn = this.$route.params.orderSn
                let params = new URLSearchParams();
                params.append('orderSn', orderSn)
                payOrder(params).then((response) => {
                    this.$message({
                        message: '支付成功',
                        type: 'success'
                    });
                })
            }
        },
        created() {
            document.title = "选择支付方式"
            this.getOrderInfo(this.$route.params.orderSn);
            this.getDifference()
            this.timer = setInterval(() => {
                this.getDifference()
            }, 1000);
        },
        filters: {
            phoneNumberFilter(val) {
                return val.substring(0, 3) + ' ^_^ ' + val.substring(val.length - 4);
            }
        }

    }
</script>

<style lang="scss">
    .checkout {
        .header {
            font-size: 12px;
            border-bottom: 2px solid #ff6700;
            background: #fff;
            color: #b0b0b0;
            height: 100px;
            width: 100%;
            margin: 0 auto;

            .container {
                position: relative;

                .header-title {
                    float: left;
                    margin-top: 26px;
                    height: 48px;
                    color: #b0b0b0;

                    h2 {
                        font-size: 28px;
                        line-height: 48px;
                        font-weight: normal;
                        color: #424242;
                    }

                }
            }
        }

        .page-main {
            padding-top: 38px;
            padding-bottom: 38px;
            background-color: #f5f5f5;

            .confirm-box {
                form {
                    margin: 0;

                    .section {
                        padding: 30px 48px;
                        margin-bottom: 30px;
                        background-color: #fff;
                        color: #424242;
                    }

                    .section-order {
                        padding-left: 183px;
                        position: relative;

                        .order-info {
                            padding: 20px 0;

                            .fl {
                                float: left;

                                .title {
                                    margin-bottom: 10px;
                                    font-size: 24px;
                                    font-weight: normal;
                                    line-height: 36px;
                                }

                                .order-time {
                                    color: #616161;
                                    margin-bottom: 5px;
                                    line-height: 2;

                                    .pay-time-tip {
                                        margin: 0 5px;
                                        color: #ff6700;
                                    }
                                }

                                .post-info {
                                    color: #616161;
                                    -webkit-transition: height .3s ease;
                                    transition: height .3s ease;
                                }

                                .post-info-hide {
                                    visibility: hidden;
                                }
                            }

                            .fr {
                                float: right;

                                .total {
                                    margin-bottom: 10px;
                                    color: #757575;

                                    .money {
                                        color: #ff6700;
                                        font-size: 14px;

                                        em {
                                            font-style: normal;
                                            font-size: 24px;
                                        }
                                    }
                                }
                            }


                        }

                        .icon-right {
                            width: 80px;
                            height: 80px;
                            line-height: 80px;
                            position: absolute;
                            top: 40px;
                            left: 50px;
                            font-size: 80px;
                            color: #83c44e;
                            text-align: center;
                            border: 2px solid #83c44e;
                            border-radius: 42px;
                            overflow: hidden;
                            _zoom: 1;
                        }

                        .order-detail {
                            display: none;
                            margin-top: 10px;
                            padding-top: 20px;
                            border-top: 1px solid #e0e0e0;

                            ul {
                                padding: 0;
                                list-style: none;

                                li {
                                    line-height: 24px;
                                    margin-bottom: 8px;
                                    color: #333;

                                    .label {
                                        float: left;
                                        width: 85px;
                                    }

                                    .content {
                                        float: left;

                                        .order-num {
                                            color: #ff6700;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .section-payment {
                        .cash-title {
                            height: 50px;
                            margin-bottom: 30px;
                            border-bottom: 1px solid #e0e0e0;
                            font-size: 18px;
                        }

                        .payment-box {
                            margin-bottom: 30px;

                            .payment-header {
                                margin-bottom: 15px;

                                .title {
                                    float: left;
                                    font-size: 16px;
                                    color: #616161;
                                }

                                .desc {
                                    float: left;
                                    margin-left: 10px;
                                    margin-top: 6px;
                                    font-size: 12px;
                                    color: #b0b0b0;

                                }
                            }

                            .payment-body {
                                .payment-list {
                                    margin: 0 0 0 -14px;
                                    padding: 0;
                                    overflow: hidden;

                                    li {
                                        float: left;
                                        width: 174px;
                                        height: 60px;
                                        line-height: 60px;
                                        margin-left: 14px;
                                        margin-bottom: 14px;
                                        border: 1px solid #e0e0e0;
                                        text-align: center;
                                        cursor: pointer;
                                        overflow: hidden;
                                        _zoom: 1;
                                        -webkit-transition: all .4s;
                                        transition: all .4s;

                                        input {
                                            display: none;
                                        }

                                        img {
                                            margin-left: 0;
                                        }
                                    }

                                    .selected {
                                        border-color: #ff6700;
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>