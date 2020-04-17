<template>
    <div class="uc-box uc-main-box">
        <div class="uc-content-box order-list-box">
            <div class="box-hd">
                <h1 class="title">我的订单
                    <small>请谨防钓鱼链接或诈骗电话，<a href="#">了解更多&gt;</a>
                    </small>
                </h1>
                <div class="more clearfix">
                    <ul class="filter-list">
                        <li v-for="(item,index) in orderType" :key="index"
                            :class="{'first':index===0,'active':item.selected}"
                        >
                            <a href="javascript:void(0)" @click="getList(index)">{{item.title}}</a>
                        </li>

                    </ul>
                    <form class="search-form clearfix" action="#" method="get">
                        <input class="search-text" type="search" id="J_orderSearchKeywords" name="keywords"
                               autocomplete="off" placeholder="输入商品名称、商品编号、订单号">
                        <input type="submit" class="search-btn iconfont" value="">
                    </form>
                </div>
            </div>
            <div class="box-bd">
                <div class="loading" v-show="loading">
                    <div class="loader"></div>
                </div>
                <div id="J_orderList">
                    <p class="empty" v-show="this.orderList.length===0">当前没有交易订单。</p>
                    <ul class="order-list">
                        <li class="uc-order-item uc-order-item-pay" v-for="(order,index) in orderList" :key="index">
                            <div class="order-remove J_removeBtn"
                                 v-if="order.type===4"
                                 @click="deleteOrder(order.id)"
                            ><img src="../../../../assets/images/trash.png"
                                  alt="垃圾桶"></div>
                            <div class="order-detail">
                                <div class="order-summary">
                                    <!--<div class="order-status">等待付款</div>-->
                                </div>
                                <table class="order-detail-table">
                                    <thead>
                                    <tr>
                                        <th class="col-main"><p class="caption-info">{{order.createTime}}<span
                                                class="sep">|</span>{{order.receiverName}}<span
                                                class="sep">|</span>订单号： <a>{{order.orderSn}}</a><span
                                                class="sep">|</span>在线支付</p></th>
                                        <th class="col-sub"><p class="caption-price">应付金额：<span
                                                class="num">{{order.payAmount}}</span>元</p></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="order-items">
                                            <ul class="goods-list">
                                                <li v-for="(item,index) in order.orderItemList" :key="index">
                                                    <div class="figure figure-thumb">
                                                        <router-link :to="{path:'/product',query:{id:item.productId}}">
                                                            <img :src="item.productPic" width="80" height="80">
                                                        </router-link>
                                                    </div>
                                                    <p class="name">
                                                        <a>{{item.productName}}&nbsp;{{getSpDate(item.productAttr)}}</a>
                                                    </p>
                                                    <p class="price"> {{item.productPrice}}元 ×
                                                        {{item.productQuantity}} </p></li>
                                            </ul>
                                        </td>
                                        <td class="order-actions">
                                            <router-link :to="{name:'pay',params:{'orderSn':order.orderSn}}"
                                                         v-if="order.type===1"
                                                         class="btn btn-small btn-primary">
                                                立即付款
                                            </router-link>
                                            <a class="btn btn-small btn-line-gray" v-if="order.type!==4">订单详情</a>
                                            <a href="javascript:void(0)"
                                               class="btn btn-small btn-line-gray btn-contract">
                                                联系客服
                                            </a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="J_orderListPages"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderList, deleteOrder} from '@/api/order'

    export default {
        name: "",
        data() {
            return {
                orderList: [],
                loading: true,
                orderType: [
                    {
                        title: "全部有效订单",
                        selected: true,
                        type: 0
                    }, {
                        title: "待支付",
                        selected: false,
                        type: 1
                    }, {
                        title: "待发货",
                        selected: false,
                        type: 2
                    }, {
                        title: "待收货",
                        selected: false,
                        type: 3
                    }, {
                        title: "已关闭",
                        selected: false,
                        type: 4
                    }
                ],
                currentOrderTypeIndex: null,
            }
        },
        methods: {
            //获取订单列表
            getList(index) {
                this.currentOrderTypeIndex = index
                this.loading = true
                this.orderType.map(e => {
                    e.selected = false
                })
                this.orderType[index].selected = true
                getOrderList(this.orderType[index].type).then((response) => {
                    this.loading = false
                    this.orderList = []
                    response.data.map((item) => {
                        this.orderList.push(
                            Object.assign({}, item, {type: this.orderType[index].type})
                        )
                    })
                    window.console.log(this.orderList)
                })
            },
            //delete order
            deleteOrder(orderId) {
                deleteOrder(orderId).then((response) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getList(this.currentOrderTypeIndex)
                })
            },
            getSpDate(value) {
                let values = JSON.parse(value)
                let result = ''
                for (let i = 0; i < values.length; i++) {
                    result += values[i].value + ' '
                }
                return result
            },

        },
        created() {
            document.title = "我的订单"
            this.getList(0)
        }
    }
</script>

<style lang="scss">
    .uc-box {
        padding: 36px 0;
        background-color: #FFF;

        .uc-content-box {
            margin: 0 48px;

            .box-hd {
                height: 124px;

                .title {
                    margin: 0;
                    font-size: 30px;
                    font-weight: 400;
                    line-height: 68px;
                    color: #757575;

                    small {
                        margin-left: 10px;
                        font-size: 12px;
                        line-height: 1.5;
                    }
                }

                .more {
                    margin-bottom: 0;

                    .filter-list {
                        float: left;
                        margin: 0;
                        padding: 18px 0;
                        list-style-type: none;
                        font-size: 16px;
                        line-height: 1.25;

                        li {
                            float: left;
                            padding: 0 20px;
                            border-left: 1px solid #e0e0e0;
                            color: #757575;
                        }

                        .first {
                            padding-left: 0;
                            border-left: 0;
                        }

                        .active > a {
                            color: #ff6700;
                        }
                    }

                    .search-form {
                        float: right;
                        position: relative;
                        width: 262px;
                        height: 40px;
                        margin-top: 8px;

                        .search-text {
                            position: absolute;
                            top: 0;
                            right: 41px;
                            z-index: 1;
                            width: 189px;
                            height: 40px;
                            padding: 0 15px;
                            border: 1px solid #e0e0e0;
                            font-size: 12px;
                            line-height: 40px;
                            outline: 0;
                            color: #757575;
                            -webkit-transition: all .2s;
                            transition: all .2s;
                        }

                        .search-btn {
                            position: absolute;
                            right: 0;
                            top: 0;
                            z-index: 2;
                            width: 42px;
                            height: 40px;
                            border: 1px solid #e0e0e0;
                            font-size: 24px;
                            line-height: 24px;
                            background: #fff;
                            color: #616161;
                            outline: 0;
                            -webkit-transition: all .2s;
                            transition: all .2s;

                            &:hover {
                                background: #ff6700;
                                color: #fff;
                            }
                        }
                    }
                }
            }

            .box-bd {
                .empty {
                    margin: 40px 0;
                    font-size: 18px;
                    text-align: center;
                    color: #b0b0b0;
                }

                .order-list {
                    margin: 0;
                    padding: 10px 0;
                    list-style-type: none;

                    .uc-order-item {
                        margin-bottom: 20px;
                        border: 1px solid #e0e0e0;
                        position: relative;

                        &:hover > .order-remove {
                            opacity: 1 !important;
                        }

                        .order-remove {
                            position: absolute;
                            right: 15px;
                            top: 15px;
                            height: 20px;
                            width: 20px;
                            cursor: pointer;
                            opacity: 0;

                            img {
                                display: block;
                                width: 100%;
                            }
                        }
                    }

                    .uc-order-item-pay {
                        border-color: #ff6700;
                    }

                    .order-detail {
                        .order-summary {
                            padding: 25px 30px 1px;
                            background-color: #fffaf7;

                            .order-status {
                                color: #ff6700;
                                font-size: 18px;
                            }
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                            width: 100%;

                            thead {
                                display: table-header-group;
                                vertical-align: middle;
                                border-color: inherit;

                                tr {
                                    display: table-row;
                                    vertical-align: inherit;
                                    border-color: inherit;

                                    th {
                                        height: 28px;
                                        padding: 0 30px 24px;
                                        border-bottom: 1px solid #e0e0e0;
                                        font-weight: 400;
                                        text-align: left;
                                        color: #757575;
                                        vertical-align: bottom;
                                        background: #fffaf7;
                                        border-bottom: 1px solid #feccac;

                                        .num {
                                            height: 18px;
                                            margin-right: 5px;
                                            font-size: 28px;
                                            font-weight: 200;
                                            line-height: 1;
                                            color: #333;
                                        }
                                    }

                                    .col-sub {
                                        width: 240px;
                                        padding-left: 10px;
                                        text-align: right;
                                    }
                                }
                            }

                            tbody {
                                display: table-row-group;
                                vertical-align: middle;
                                border-color: inherit;

                                tr {
                                    display: table-row;
                                    vertical-align: inherit;
                                    border-color: inherit;

                                    td {
                                        display: table-cell;
                                        vertical-align: inherit;
                                        padding: 0 30px;

                                        .goods-list {
                                            margin: 0;
                                            padding: 10px 0;
                                            list-style-type: none;
                                            padding-inline-start: 0;

                                            li {
                                                position: relative;
                                                height: 44px;
                                                margin: 10px 0;
                                                padding: 18px 18px 18px 100px;
                                                line-height: 22px;
                                                color: #333;
                                                list-style: nonel;

                                                .figure-thumb {
                                                    position: absolute;
                                                    left: 0;
                                                    top: 0;

                                                    a {
                                                        img {
                                                            width: 80px;
                                                            height: 80px;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    .order-actions {
                                        padding-top: 20px;
                                        text-align: right;
                                        vertical-align: top;

                                        .btn {
                                            display: block;
                                            margin: 0 0 10px auto;
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

                                        .btn-small {
                                            width: 118px;
                                            height: 28px;
                                            font-size: 12px;
                                            line-height: 28px;
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

                                        .btn-line-gray {
                                            border-color: #b0b0b0;
                                            background: #fff;
                                            color: #757575;

                                            &:hover {
                                                color: #fff;
                                                background-color: #757575;
                                                border-color: #757575;
                                            }
                                        }
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