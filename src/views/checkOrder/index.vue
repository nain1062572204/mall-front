<template>
    <div class="checkout">
        <div class="header">
            <div class="container">
                <div class="header-title has-more">
                    <h2>确认订单</h2>
                </div>
            </div>
        </div>
        <div class="page-main">
            <div class="container">
                <div class="checkout-box">
                    <div class="section section-address">
                        <div class="section-header clearfix">
                            <h3 class="title">收货地址</h3>

                            <div class="more">
                            </div>

                            <div class="mitv-tips">
                                大型商品下单后，收货地址将无法修改。
                                <span>快递公司会电话联系您确认送货时间，收货时需核对身份证信息。
                                </span>
                            </div>
                        </div>
                        <div class="section-body clearfix">
                            <!-- addresslist begin -->
                            <div class="address-item" v-for="(item,index) in addressList" :key="index"
                                 :class="{'selected':item.selected}"
                            >
                                <dl @click="selectAddress(index)">
                                    <dt>
                                        <span class="tag"></span>
                                        <em class="uname">{{item.name}}</em>
                                    </dt>
                                    <dd class="utel">
                                        {{item.phoneNumber|phoneNumberFilter}}
                                    </dd>
                                    <dd class="uaddress">
                                        {{item.province}}{{item.city}}{{item.region}}{{item.street}}<br>
                                        {{item.detailAddress}}
                                    </dd>
                                </dl>
                                <div class="actions">
                                    <a href="javascript:void(0);" class="modify">修改</a>
                                </div>
                            </div>
                            <div class="address-item address-item-new" @click="addAddress">
                                <i class="iconfont"></i>
                                添加新地址
                            </div>
                        </div>
                    </div>
                    <div class="section section-goods">
                        <div class="section-header clearfix">
                            <h3 class="title">商品及优惠券</h3>
                        </div>
                        <div class="section-body">
                            <ul class="good-list">
                                <li class="clearfix" v-for="(item,index) in confirmOrder.cartItemList" :key="index">
                                    <div class="col col-img">
                                        <img :src="item.productPic">
                                    </div>
                                    <div class="col col-name">
                                        <router-link :to="{path:'/product',query:{'id':item.productId}}"
                                                     target="_blank">
                                            {{item.productName}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.productAttr}}
                                        </router-link>
                                    </div>
                                    <div class="col col-price">
                                        {{item.price}}元 x {{item.quantity}}
                                    </div>
                                    <div class="col col-total">
                                        {{item.price*item.quantity}}元
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="section section-options clearfix">
                        <div class="section-header">
                            <h3 class="title">配送方式</h3>
                        </div>
                        <div class="section-body clearfix">
                            <ul class="clearfix J_optionList options ">
                                <li data-type="shipment" class="J_option selected" data-amount="0" data-value="2">
                                    包邮
                                </li>
                            </ul>

                            <div class="service-self-tip" id="J_serviceSelfTip" style="display: none;"></div>
                        </div>
                    </div>
                    <div class="section section-count clearfix">
                        <div class="count-actions ">
                            <!-- 优惠券 -->
                            <a class="coupon-trigger">
                                <i class="iconfont icon-plus"></i>使用优惠券
                            </a>
                            <div class="coupon-result hide">
                                <i class="iconfont icon-selected"></i>
                                正在使用：<span class="coupon-title"></span>
                                <a href="javascript:void(0)"></a>
                            </div>
                            <div class="coupon-box hide" id="J_couponBox">
                                <ul class="clearfix tab-switch J_tabSwitch">
                                    <li>选择优惠券</li>
                                    <li>输入优惠券码</li>
                                </ul>
                                <div class="tab-container">
                                    <div class="tab-content list-content">
                                        <p class="coupon-empty">您暂时没有可用的优惠券</p>
                                    </div>
                                    <div class="tab-content code-content hide">
                                        <div class="form-section">
                                            <label class="input-label" for="coupon_code">请输入优惠券码</label>
                                            <input class="input-text" type="text" id="coupon_code" name="coupon_code">
                                        </div>
                                        <div class="coupon-confirm">
                                            <a href="javascript:void(0);" class="btn btn-primary">立即使用</a>
                                            <a href="javascript:void(0);" class="btn btn-gray">不使用优惠券</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 购物卡 -->
                            <a class="ecard-trigger"><i
                                    class="iconfont icon-plus"></i>使用小米礼品卡</a>
                            <div class="ecard-result hide" id="J_ecardResult">
                                <i class="iconfont icon-selected"></i> 已使用礼品卡 <span id="J_ecardVal"></span>
                                <a href="javascript:void(0);">［修改］</a>
                            </div>
                            <!-- 现金券 -->
                            <a class="ecard-trigger hide"><i
                                    class="iconfont icon-plus"></i>使用现金券</a>
                            <div class="ecard-result hide" id="J_recycleResult">
                                <i class="iconfont icon-selected"></i> 已使用现金券 <span id="J_recycleVal"></span>
                                <a href="javascript:void(0);">［修改］</a>
                            </div>
                            <!-- 红包 -->

                            <div class="ecard-box hide" id="J_ecardBox">
                                <ul class="clearfix tab-switch J_tabSwitch">
                                    <li>已绑定的礼品卡</li>
                                    <li>输入礼品卡以绑定</li>
                                </ul>
                                <div class="tab-container">
                                    <!-- 选卡 -->
                                    <div class="tab-content ecard-list">
                                        <div class="empty hide" id="J_ecardEmpty">
                                            <p>没有发现可用的礼品卡！</p>
                                            <a href="javascript:void(0);" class="btn btn-gray J_ecardCancel">取消</a>
                                        </div>
                                        <div class="hide">
                                            <div id="J_ecardList">
                                            </div>
                                            <div class="ecard-info" id="J_ecardInfo"></div>
                                            <div class="btns">
                                                <a href="javascript:void(0);" class="btn btn-primary">确认以上选择</a>
                                                <a href="javascript:void(0);" class="btn btn-gray">取消
                                                    不使用礼品卡</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="recycle-box hide" id="J_recycleBox">
                                    <div class="ecard-list recycle-list">
                                        <div id="J_recycleList">
                                            <div class="table-wrapper">
                                                <ul class="clearfix">
                                                    <li class="col-1">选择</li>
                                                    <li class="col-2">券号</li>
                                                    <li class="col-3">本次使用（元）</li>
                                                    <li class="col-4">余额（元）</li>
                                                </ul>
                                                <div>
                                                    <table>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ecard-info" id="J_recycleInfo"></div>
                                        <div class="btns">
                                            <a href="javascript:void(0);" class="btn btn-primary">确认以上选择</a>
                                            <a href="javascript:void(0);" class="btn btn-gray">取消
                                                不使用现金券</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="money-box" id="J_moneyBox">
                            <ul>
                                <li class="clearfix">
                                    <label>商品件数：</label>
                                    <span class="val">{{confirmOrder.cartItemList.length}}件</span>
                                </li>
                                <li class="clearfix">
                                    <label>商品总价：</label>
                                    <span class="val">{{confirmOrder.calcAmount.total}}元</span>
                                </li>
                                <li class="clearfix">
                                    <label>活动优惠：</label>
                                    <span class="val">-{{confirmOrder.calcAmount.coupon}}元</span>
                                </li>
                                <li class="clearfix">
                                    <label>优惠券抵扣：</label>
                                    <span class="val"><i
                                            id="J_couponVal">-{{confirmOrder.calcAmount.promotion}}</i>元</span>
                                </li>
                                <li class="clearfix">
                                    <label>运费：</label>
                                    <span class="val"><i>{{confirmOrder.calcAmount.freight}}</i>元</span>
                                </li>
                                <li class="clearfix total-price">
                                    <label>应付总额：</label>
                                    <span class="val"><em>{{confirmOrder.calcAmount.total}}</em>元</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="section-bar clearfix">
                        <div class="fr">
                            <div class="clearfix">
                                <a href="javascript:void(0);" class="btn btn-primary" @click="settleAccounts">立即下单</a>
                                <a href="javascript:void(0);" class="btn  btn-return" @click="backToCartItem">返回购物车</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <address-detail :address="address" @finishCommit="finishCommit" :hide="showAddAddress"
                        @closeAddressDetail="closeAddressDetail"></address-detail>
        <back-drop :hide="showAddAddress"></back-drop>
    </div>
</template>

<script>
    import AddressDetail from '@/components/AddressDetail/index'
    import BackDrop from '@/components/BackDrop'
    import {getList, add} from '@/api/memberReceiveAddress'
    import {generateConfirmOrder, generateOrder} from '@/api/order'

    export default {
        name: "checkOrder",
        props: {},
        data() {
            return {
                address: {
                    name: null,
                    province: null,
                    city: null,
                    region: null,
                    street: null,
                    detailAddress: null,
                    tag: null,
                    phoneNumber: null,

                },
                showAddAddress: false,
                addressList: [],
                selectedAddress: null,
                confirmOrder: {
                    "cartItemList": [
                        {
                            "id": null,
                            "productId": null,
                            "productSkuId": null,
                            "memberId": null,
                            "quantity": null,
                            "price": null,
                            "productPic": null,
                            "productName": null,
                            "productSkuCode": null,
                            "productSn": null,
                            "productAttr": null
                        }
                    ],
                    "calcAmount": {
                        "total": null,
                        "promotion": null,
                        "coupon": null,
                        "freight": null
                    }
                }
            }
        },
        methods: {
            finishCommit() {
                add(this.address).then(() => {
                    this.closeAddressDetail()
                    this.getAddressList()
                })
            },
            addAddress() {
                this.showAddAddress = true
            },
            closeAddressDetail() {
                this.showAddAddress = false
            },
            getAddressList() {
                if (this.$store.getters.token) {
                    getList().then((response) => {
                        response.data.map((item, index) => {
                            this.addressList.push(
                                Object.assign({}, item, {selected: false})
                            )
                        })
                    })
                }

            },
            //获取确认订单信息
            getConfirmOrder() {
                let params = new URLSearchParams();
                let ids = this.$route.params.ids
                params.append('ids', ids)

                generateConfirmOrder(params).then((response) => {
                    this.confirmOrder = response.data
                })
            },
            //选择收货地址
            selectAddress(index) {
                this.addressList.forEach((e) => {
                    e.selected = false
                })
                this.addressList[index].selected = true
                this.selectedAddress = this.addressList[index]
            },
            //返回购物车
            backToCartItem() {
                this.$router.go(-1)
            },
            //下单
            settleAccounts() {
                if (this.selectedAddress === undefined || this.selectedAddress === null) {
                    //TODO  提示未选择收货地址
                    window.console.log("未选择收货地址")
                    return
                }
                let orderParam = {
                    'address': this.selectedAddress,
                    'note': '这是订单备注',
                    'productInfos': this.getProductInfos()
                }
                window.console.log(orderParam)
                generateOrder(orderParam).then((response) => {
                    //跳转到支付页面
                    /**
                     * this.$router.push({
                        name: 'checkOrder',
                        params: {'selectedItem': selectedItem}
                      })
                     */
                    this.$router.push({
                        name: 'pay',
                        params: {'orderSn': response.data}
                    })

                })
            },
            //获取选中商品
            getProductInfos() {
                return this.confirmOrder.cartItemList
            }
        },
        created() {
            document.title = "填写订单信息"
            this.getAddressList()
            this.getConfirmOrder()
        },
        components: {
            AddressDetail, BackDrop
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
                        float: left;
                        line-height: 48px;
                        margin-bottom: 0;
                        font-size: 28px;
                        font-weight: normal;
                        color: #424242;
                    }

                    p {
                        float: left;
                        height: 20px;
                        line-height: 20px;
                        margin-top: 20px;
                        margin-left: 15px;
                        color: #757575;
                    }
                }
            }
        }

        .page-main {
            padding-top: 38px;
            padding-bottom: 38px;
            background-color: #f5f5f5;

            .container {
                .checkout-box {
                    padding: 48px 0 0;
                    background-color: #fff;

                    .section {
                        margin-left: 48px;
                        margin-right: 48px;

                        .section-header {
                            margin-bottom: 20px;

                            .title {
                                float: left;
                                color: #333;
                                font-size: 18px;
                                line-height: 20px;
                                font-weight: normal;
                                margin: 0;
                                padding: 0;
                            }

                            .mitv-tips {
                                float: left;
                                margin-left: 20px;
                                margin-top: 3px;
                                padding-left: 10px;
                                color: #757575;
                                border-left: 1px solid #e0e0e0;
                                line-height: 1;

                                span {
                                    color: #ff6700;
                                }
                            }
                        }

                        .section-body {
                            margin-left: -18px;

                            .address-item {
                                float: left;
                                margin-left: 17px;
                                margin-bottom: 24px;
                                width: 268px;
                                height: 178px;
                                border: 1px solid #e0e0e0;
                                cursor: pointer;
                                position: relative;
                                -webkit-transition: all .4s ease;
                                transition: all .4s ease;

                                &:hover {
                                    border-color: #b0b0b0;
                                }

                                dl {
                                    padding: 15px 24px 0;
                                    margin: 0;

                                    dt {
                                        margin: 0 0 10px;
                                        line-height: 30px;

                                        .tag {
                                            float: right;
                                            color: #b0b0b0;
                                        }

                                        .uname {
                                            font-size: 18px;
                                            color: #333;
                                            font-style: normal;
                                        }
                                    }

                                    dd {
                                        margin: 0;
                                        line-height: 22px;
                                        color: #757575;
                                    }

                                    .uaddress {
                                        max-height: 88px;
                                        overflow: hidden;
                                    }
                                }

                                .actions {
                                    position: absolute;
                                    right: 24px;
                                    bottom: 10px;

                                    a {
                                        display: inline-block;
                                        margin-left: 10px;
                                        color: #ff6700;
                                    }
                                }
                            }

                            .selected {
                                border-color: #ff6700 !important;
                            }

                            .address-item-new {
                                text-align: center;
                                color: #b0b0b0;

                                &:hover {
                                    color: #757575;
                                }

                                &:hover > .iconfont {
                                    background-color: rgba(0, 0, 0, .5);
                                }

                                .iconfont {
                                    display: block;
                                    width: 30px;
                                    height: 30px;
                                    margin: 63px auto 8px;
                                    font-size: 30px;
                                    line-height: 30px;
                                    background-color: #e0e0e0;
                                    border-radius: 17px;
                                    text-align: center;
                                    -webkit-transition: all .4s ease;
                                    transition: all .4s ease;
                                    color: #fff;
                                }
                            }

                        }
                    }

                    .section-address {

                    }

                    .section-goods {
                        .good-list {
                            margin-left: 18px;
                            padding: 5px 0;
                            border-bottom: 1px solid #e0e0e0;

                            li {
                                padding: 10px 0;
                                list-style: none;

                                .col {
                                    float: left;
                                    line-height: 30px;
                                    color: #424242;
                                }

                                .col-img {
                                    width: 30px;
                                    height: 30px;
                                    margin-right: 10px;

                                    img {
                                        width: 30px;
                                        height: 30px;
                                    }
                                }

                                .col-name {
                                    width: 650px;

                                    a {
                                        color: #424242;
                                    }
                                }

                                .col-price {
                                    width: 150px;
                                    text-align: center;
                                }

                                .col-status {
                                    width: 100px;
                                    text-align: center;
                                }

                                .col-total {
                                    width: 190px;
                                    text-align: center;
                                    color: #ff6700;
                                }
                            }

                        }
                    }

                    .section-options {
                        padding: 25px 0;
                        border-bottom: 1px solid #e0e0e0;

                        .section-header {
                            float: left;
                            width: 150px;

                            .title {
                                line-height: 38px;
                            }
                        }

                        .section-body {
                            float: left;

                            ul {
                                list-style: none;

                                li {
                                    float: left;
                                    height: 38px;
                                    line-height: 38px;
                                    color: #ff6700;
                                }
                            }
                        }
                    }

                    .section-count {
                        min-height: 200px;
                        *height: 200px;
                        padding: 20px 0;
                        position: relative;

                        .count-actions {
                            float: left;
                            position: relative;

                            a {
                                height: 50px;
                                line-height: 50px;
                                cursor: pointer;
                                display: block;

                                .icon-plus {
                                    display: inline-block;
                                    *zoom: 1;
                                    *display: inline;
                                    width: 22px;
                                    height: 22px;
                                    font-size: 22px;
                                    line-height: 1;
                                    border-radius: 11px;
                                    text-align: center;
                                    background-color: #ff6700;
                                    color: #fff;
                                    vertical-align: middle;
                                    margin-right: 10px;
                                    position: relative;
                                    top: -1px;
                                }
                            }
                        }

                        .money-box {
                            position: absolute;
                            right: 0;
                            bottom: 20px;
                            text-align: right;

                            ul {
                                float: right;
                                list-style: none;

                                li {
                                    display: block;
                                    padding-left: 126px;
                                    line-height: 2;
                                    position: relative;
                                    zoom: 1;

                                    label {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        width: 126px;
                                        white-space: nowrap;
                                        color: #757575;
                                        zoom: 1;
                                    }

                                    .val {
                                        color: #ff6700;
                                        zoom: 1;

                                        em {
                                            font-size: 30px;
                                            line-height: 1;
                                            font-style: normal;
                                        }
                                    }
                                }

                                .total-price {
                                    margin-top: 10px;
                                }
                            }
                        }
                    }

                    .section-bar {
                        padding: 20px 48px;
                        border-top: 2px solid #f5f5f5;

                        .fl {
                            float: left;
                        }

                        .fr {
                            float: right;
                            color: #757575;

                            .btn {
                                float: right;
                                margin-left: 30px;
                                vertical-align: top;
                                display: inline-block;
                                *zoom: 1;
                                *display: inline;
                                width: 158px;
                                height: 38px;
                                padding: 0;
                                border: 1px solid #b0b0b0;
                                font-size: 14px;
                                line-height: 38px;
                                text-align: center;
                                color: #b0b0b0;
                                cursor: pointer;
                                -webkit-transition: all .4s;
                                transition: all .4s;
                            }

                            .btn-primary {
                                background: #ff6700;
                                border-color: #ff6700;
                                color: #fff;

                                &:hover {
                                    background-color: #f25807;
                                    border-color: #f25807;
                                    color: #fff;
                                }
                            }

                            .btn-return {
                                color: rgba(0, 0, 0, 0.27);
                                border-color: rgba(0, 0, 0, 0.27);
                            }
                        }
                    }
                }


            }
        }
    }
</style>