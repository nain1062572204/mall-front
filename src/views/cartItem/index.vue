<template>
    <div class="cart-item">
        <div class="header">
            <div class="container">
                <div class="header-title has-more"><h2>我的购物车</h2>
                    <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
                </div>
            </div>
        </div>
        <div class="page-main">
            <div class="container">
                <div class="cart-loading loading" v-if="loading">
                    <div class="loader"></div>
                </div>
                <div class="cart-empty" v-if="!isLogin||cartItem.length===0">
                    <h2>穷逼的购物车还是空的!</h2>
                    <p class="login-desc">登录后将显示您的购物车商品</p>
                    <a href="javascript:void (0)" class="btn btn-login" v-if="!isLogin">立即登录</a>
                    <a href="javascript:void (0)" class="btn" v-if="isLogin">马上去购物</a>
                </div>
                <div class="cart-box" v-if="cartItem.length!==0" ref="cartBox">
                    <div class="good-list">
                        <div class="list-head clearfix">
                            <div class="col col-check"><i class="iconfont icon-checkbox"
                                                          @click="selectAllChange"
                                                          :class="{'icon-checkbox-selected':this.selectAll}">√</i>全选
                            </div>
                            <div class="col col-img">&nbsp;</div>
                            <div class="col col-name">商品名称</div>
                            <div class="col col-price">单价</div>
                            <div class="col col-num">数量</div>
                            <div class="col col-total">小计</div>
                            <div class="col col-action">操作</div>
                        </div>
                        <div class="list-body">
                            <div class="item-box" v-for="(item,index) in cartItem" :key="index">
                                <div class="list-table">
                                    <div class="item-row clearfix">
                                        <div class="item-row clearfix">
                                            <div class="col col-check">
                                                <i class="iconfont icon-checkbox"
                                                   :class="{'icon-checkbox-selected':item.selected}"
                                                   @click="selectItem(index)"
                                                >
                                                    √
                                                </i>
                                            </div>
                                            <div class="col col-img">
                                                <router-link :to="{path:'/product',query:{'id':item.productId}}"
                                                             target="_blank">
                                                    <img alt=""
                                                         :src="item.productPic"
                                                         width="80" height="80">
                                                </router-link>
                                            </div>
                                            <div class="col col-name">
                                                <h3 class="name">
                                                    <router-link :to="{path:'/product',query:{'id':item.productId}}"
                                                                 target="_blank">
                                                        {{item.productName}} &nbsp;{{item.productAttr}}
                                                    </router-link>
                                                </h3>
                                            </div>
                                            <div class="col col-price"> {{item.price}}元 <p class="pre-info"></p></div>
                                            <div class="col col-num">
                                                <div class="change-goods-num clearfix">
                                                    <a href="javascript:void(0)" class="J_minus"
                                                       @click="subNum(index)"><i
                                                            class="iconfont"></i></a>
                                                    <input tyep="text" name="2191600018_0_buy" v-model="item.quantity"
                                                           @change="quantityChange(index)"
                                                           data-num="1"
                                                           data-buylimit="5" autocomplete="off"
                                                           class="goods-num J_goodsNum">
                                                    <a href="javascript:void(0)" class="J_plus"
                                                       @click="addNum(index)"><i
                                                            class="iconfont"></i></a>
                                                </div>
                                            </div>
                                            <div class="col col-total"> {{itemTotal(item)}}元 <p class="pre-info"></p>
                                            </div>
                                            <div class="col col-action"><a href="javascript:void(0);" title="删除"
                                                                           class="del J_delGoods"><i
                                                    class="iconfont"></i></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="raise-buy-box" id="J_raiseBuyBox"></div>
                    </div>
                    <!-- <div class="cart-bar clearfix cart-bar-fixed">-->
                    <div class="cart-bar clearfix">
                        <div class="section-left">
                            <a href="//list.mi.com/0" class="back-shopping">继续购物</a>
                            <span class="cart-total">共 <i>3</i> 件商品，已选择 <i>3</i> 件</span>
                        </div>
                        <span class="total-price">
                            合计：
                            <em>{{total()}}</em>元
                        </span>
                        <a href="javascript:void(0);" class="btn btn-a btn btn-primary "
                           :class="{'btn-disabled':settleAccountDisabled}"
                           @click="settleAccount">去结算</a>
                        <div class="no-select-tip" v-show="settleAccountDisabled">
                            请勾选需要结算的商品
                            <i class="arrow arrow-a"></i>
                            <i class="arrow arrow-b"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {list, updateQuantity} from "@/api/cartItem"

    export default {
        name: "CartItem",
        data() {
            return {
                loading: true,
                cartItem: [],
                selectAll: true,
                checkModel: []
            }
        },
        methods: {
            getCartItem() {
                list().then((response) => {
                    this.loading = false
                    response.data.map((item, index) => {
                        this.cartItem.push(
                            Object.assign({}, item, {selected: true})
                        )
                    })
                })
            },
            //每件商品小计
            itemTotal(item) {
                return item.price * item.quantity
            },
            //购物车总计
            total() {
                let total = 0;
                this.cartItem.filter((e) => {
                    return e.selected
                }).forEach((val) => {
                    total += val.price * val.quantity
                })
                return total
            },
            //增加数量
            addNum(index) {
                this.cartItem[index].quantity = Number.parseInt(this.cartItem[index].quantity) + 1
                this.quantityChange(index);
            },
            //减少数量
            subNum(index) {
                this.cartItem[index].quantity = Number.parseInt(this.cartItem[index].quantity) - 1
                if (this.cartItem[index].quantity <= 1)
                    this.cartItem[index].quantity = 1
                this.quantityChange(index);
            },
            quantityChange(index) {
                window.console.log(this.cartItem[index])
                let params = {
                    id: this.cartItem[index].id,
                    quantity: this.cartItem[index].quantity
                }
                updateQuantity(params).then((response) => {
                    window.console.log("修改成功")
                })
            },

            //全选
            selectAllChange() {
                this.selectAll = !this.selectAll
                if (this.selectAll) {
                    //全选
                    this.cartItem.forEach((e) => {
                        e.selected = true
                    })
                } else {
                    //全不选
                    this.cartItem.forEach((e) => {
                        e.selected = false
                    })
                }

            },
            selectItem(index) {
                if (this.cartItem[index].selected) {
                    this.cartItem[index].selected = false
                    this.selectAll = false
                } else {
                    this.cartItem[index].selected = true
                    this.cartItem.forEach((e) => {
                        if (!e.selected)
                            return
                    })
                    this.selectAll = true
                }

            },
            //结算
            settleAccount() {
                //获取选中列表
                let selectedItem =
                    this.cartItem.filter((e) => {
                        return e.selected
                    })
                let ids = selectedItem.map(item => {
                    return item.id
                })
                this.$router.push({
                    name: 'checkOrder',
                    params: {'ids': ids}
                })

            },
        },
        created() {
            this.getCartItem()
        },
        computed: {
            isLogin: function () {
                if (this.$store.getters.token) {
                    return true
                } else {
                    return false
                }
            },
            settleAccountDisabled: function () {
                return this.cartItem.filter((e) => {
                    return e.selected
                }).length === 0
            }
        }
    }
</script>

<style lang="scss">
    .cart-item {
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
                .cart-empty {
                    height: 273px;
                    padding-left: 558px;
                    margin: 65px 0 130px;
                    background: url(../../assets/images/cart-empty.png) no-repeat 124px 0;
                    color: #b0b0b0;
                    overflow: hidden;

                    h2 {
                        margin: 70px 0 15px;
                        font-size: 36px;
                    }

                    .login-desc {
                        display: none;
                        margin: 0 0 20px;
                        font-size: 20px;
                        color: #b0b0b0;
                    }

                    .btn {
                        width: 170px;
                        height: 48px;
                        line-height: 48px;
                        background: #ff6700;
                        border-color: #ff6700;
                        color: #fff;
                        display: inline-block;
                        *zoom: 1;
                        *display: inline;
                        padding: 0;
                        margin: 0;
                        font-size: 14px;
                        text-align: center;
                        cursor: pointer;
                        -webkit-transition: all .4s;
                        transition: all .4s;

                        &:hover {
                            background-color: #f25807;
                        }
                    }
                }

                .raise-buy-box {
                    margin: 20px 0;
                }

                .cart-box {
                    .good-list {
                        background-color: #fff;

                        .list-head {
                            height: 70px;
                            line-height: 70px;
                            padding-right: 26px;
                            color: #424242;

                            .col {
                                float: left;
                            }

                            .col-check {
                                width: 110px;
                            }

                            .col-img {
                                width: 120px;
                            }

                            .col-name {
                                width: 380px;
                            }

                            .col-price {
                                width: 140px;
                                padding-right: 18px;
                                text-align: center;
                                color: #424242;
                            }

                            .col-num {
                                width: 150px;
                                text-align: center;
                                color: #424242;
                            }

                            .col-total {
                                width: 120px;
                                padding-right: 81px;
                                text-align: right;
                            }

                            .col-action {
                                width: 80px;
                                text-align: center;
                            }
                        }

                        .list-body {

                            .item-box {
                                padding: 15px 26px 15px 0;
                                border-top: 1px solid #e0e0e0;

                                .list-table {
                                    display: table;
                                    border-collapse: collapse;
                                    border-spacing: 0;

                                    .item-row {
                                        display: table-row;

                                        .col {
                                            display: table-cell;
                                            vertical-align: middle;
                                            float: none;
                                        }

                                        .col-check {
                                            width: 110px;
                                        }

                                        .col-img {
                                            width: 80px;
                                            height: 80px;
                                            padding-right: 40px;
                                            overflow: hidden;
                                        }

                                        .col-name {
                                            h3 {
                                                line-height: 1;
                                                margin-top: 8px;
                                                margin-bottom: 8px;
                                                font-size: 18px;
                                                font-weight: normal;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                                overflow: hidden;
                                            }
                                        }

                                        .col-num {
                                            .change-goods-num {
                                                width: 148px;
                                                height: 38px;
                                                border: 1px solid #e0e0e0;
                                                text-align: center;
                                                background-color: #fff;
                                                position: relative;
                                                zoom: 1;

                                                a {
                                                    float: left;
                                                    width: 38px;
                                                    height: 39px;
                                                    line-height: 38px;
                                                    color: #757575;
                                                    font-size: 20px;
                                                    -webkit-transition: all .3s;
                                                    transition: all .3s;

                                                    &:hover {
                                                        background-color: #e0e0e0;
                                                    }
                                                }

                                                input {
                                                    float: left;
                                                    width: 72px;
                                                    height: 38px;
                                                    line-height: 38px;
                                                    padding: 0;
                                                    border-width: 0;
                                                    color: #424242;
                                                    font-size: 16px;
                                                    text-align: center;
                                                    margin: 0;
                                                    vertical-align: baseline;
                                                    outline: none;
                                                }
                                            }
                                        }

                                        .col-total {
                                            color: #ff6700;
                                        }

                                        .col-action {
                                            a {
                                                &:hover {
                                                    color: #fff;
                                                    background-color: #e53935;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }

                    .cart-bar {
                        user-select: none;
                        height: 50px;
                        text-align: right;
                        background-color: #fff;
                        -webkit-transition: background .3s ease, top .3s ease;
                        transition: background .3s ease, top .3s ease;
                        position: relative;

                        .section-left {
                            float: left;

                            a {
                                line-height: 50px;
                                margin-left: 32px;
                                transition: color .3s;
                            }

                            .cart-total {
                                margin-left: 16px;
                                padding-left: 16px;
                                border-left: 1px solid #eee;
                                color: #757575;

                                i {
                                    color: #ff6700;
                                    font-style: normal;
                                }
                            }
                        }

                        .total-price {
                            padding-left: 13px;
                            color: #ff6700;

                            em {
                                font-style: normal;
                                font-size: 30px;
                            }
                        }

                        .btn {
                            width: 200px;
                            height: 48px;
                            line-height: 48px;
                            font-size: 18px;
                            margin-left: 50px;
                            vertical-align: top;
                            background: #ff6700;
                            border-color: #ff6700;
                            color: #fff;
                            display: inline-block;
                            *zoom: 1;
                            *display: inline;
                            padding: 0;
                            text-align: center;
                            cursor: pointer;
                            -webkit-transition: all .4s;
                            transition: all .4s;


                            &:hover {
                                background-color: #f25807;
                                border-color: #f25807;
                                color: #fff;
                            }
                        }

                        .btn-disabled {
                            background: #e0e0e0 !important;
                            border-color: #e0e0e0 !important;
                            color: #b0b0b0 !important;
                            cursor: default !important;
                            pointer-events: none;
                        }

                        .no-select-tip {
                            width: 200px;
                            height: 48px;
                            line-height: 48px;
                            position: absolute;
                            top: -58px;
                            right: 0;
                            background-color: #fff;
                            border: 1px solid #ff6700;
                            color: #ff6700;
                            text-align: center;

                            .arrow {
                                display: block;
                                width: 0;
                                height: 0;
                                border-style: solid dashed dashed;
                                overflow: hidden;
                                _zoom: 1;
                                position: absolute;
                                left: 50%;
                                font-style: normal;
                            }

                            .arrow-a {
                                bottom: -8px;
                                margin-left: -10px;
                                border-width: 8px 10px 0;
                                border-color: #ff6700 transparent transparent;
                                z-index: 1;
                            }

                            .arrow-b {
                                bottom: -7px;
                                margin-left: -8px;
                                border-width: 7px 8px 0;
                                border-color: #fff transparent transparent;
                                z-index: 2;
                            }
                        }
                    }

                    .cart-bar-fixed {
                        width: 1226px;
                        position: fixed;
                        left: 50%;
                        margin-left: -613px;
                        bottom: 0;
                        z-index: 20;
                        background-color: #fafafa;
                        -webkit-box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.1);
                        box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.1);
                    }
                }


            }
        }
    }
</style>