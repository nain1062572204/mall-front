<template>
    <div class="product-detail">
        <div class="xm-product-box">
            <div class="nav-bar">
                <div class="container">
                    <h2 class="J_proName">{{product.name}}</h2>
                    <div class="con">
                        <div class="right">
                            <router-link to="" class="cur">概述</router-link>
                            <span class="separator">|</span>
                            <router-link to="">用户评价</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="xm-buyBox clearfix">
            <div class="box clearfix">
                <div class="login-notic" :class="{'hide':!showLoginNotice}">
                    <div class="container">
                        为方便您购买，请提前登录
                        <router-link to="" class="login">立即登录</router-link>
                        <a href="javascript:void(0)" class="iconfont close" @click="closeLoginNotice"></a>
                    </div>
                </div>
                <div class="pro-choose-main container clearfix">
                    <div class="pro-view span10">
                        <!--左侧轮播图-->
                        <div class="img-con" @mouseenter.stop="stopPlay" @mouseleave.stop="autoPlay">
                            <div class="ui-wrapper">
                                <div class="ui-viewport">
                                    <img v-for="(item,index) in getPics(product.skuStocks)"
                                         :key="index" :src="item"
                                         :class="{'native':currentPic===index}"
                                         :style="{'transform': 'translate3d(' + -560 * index + 'px, 0px, 0px)'}"
                                    >
                                </div>
                                <div class="ui-controls ui-has-pager ui-has-controls-direction">
                                    <div class="ui-pager ui-default-pager">
                                        <div class="ui-pager-item">
                                            <a href="javascript:void(0)" class="ui-pager-link"
                                               v-for="(item,index) in getPics(product.skuStocks)" :key="index"
                                               :class="{'active':currentPic===currentChooseProduct}"
                                               @click="changeChoose(sku)"
                                            ></a>
                                        </div>
                                    </div>
                                    <div class="ui-controls-direction">
                                        <a href="javascript:void(0)" class="prev" @click="prev"></a>
                                        <a href="javascript:void(0)" class="next" @click="next"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pro-info span10">
                        <h1 class="pro-title J_proName">{{product.name}}</h1>
                        <p class="desc">{{product.description}}</p>
                        <div class="loading" v-if="loading">
                            <div class="loader">

                            </div>
                        </div>
                        <div class="main" v-if="!loading">
                            <div class="price">
                                ￥&nbsp;{{product.price}}
                            </div>
                            <div class="list-wrap">
                                <div class="pro-choose">
                                    <div class="step-title">
                                        选择版本
                                    </div>
                                    <ul class="step-list step-one clearfix">
                                        <li class="btn"
                                            :class="{'active':index===currentChooseProduct.index,'disable':sku.stock===0}"
                                            v-for="(sku,index) in product.skuStocks" :key="index"
                                            @click="changeChoose(index,sku)"
                                        >
                                            <a href="javascript:void(0)">
                                                <span class="name">
                                                    {{spData(sku.spData)}}
                                                </span>
                                                <span class="sku-price">{{sku.price}}元</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="pro-list">
                                    <ul>
                                        <li>
                                            {{currentChooseProduct.name}}
                                            <span style="float: right;">{{currentChooseProduct.price}}元</span>
                                        </li>
                                        <li class="totale-price"> 总计 ：{{currentChooseProduct.price}}元</li>
                                    </ul>
                                </div>
                                <!--购买按钮-->
                                <ul class="btn-wrap clearfix">
                                    <li>
                                        <a href="javascript:void(0);" class="btn btn-primary  btn-biglarge J_proBuyBtn"
                                           @click="addCartItem">加入购物车
                                        </a>
                                    </li>
                                    <li>
                                        <a href=""
                                           class="btn-gray btn-like btn-biglarge"> <i class="iconfont default"></i>喜欢
                                        </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pro-infomation"
                     v-if="!loading&&this.product.detailHtml!==''&&this.product.detailHtml!==null">
                    <div class="infor-con">
                        <div class="section-tab">
                            <li class="info-tab">
                                <a href="javascript:void (0)" :class="{'active':showDesc}" @click="showDesc=!showDesc">商品概述</a>
                            </li>
                            <li class="info-tab">
                                <a href="javascript:void (0)" :class="{'active':!showDesc}"
                                   @click="showDesc=false">商品参数</a>
                            </li>
                        </div>
                        <div class="section-box" :class="{'active':showDesc}">
                            <div class="section-info" v-html="product.detailHtml">
                                {{product.detailHtml}}
                            </div>
                        </div>
                        <div class="section-box"
                             :class="{'active':!showDesc}"
                        >
                            <div class="section-info" v-html="product.paramHtml">
                                {{product.paramHtml}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getProductDetail} from '@/api/product'
    import {addItem} from '@/api/cartItem'

    export default {
        name: "",
        data() {
            return {
                product: {
                    "id": null,
                    "name": null,
                    "subTitle": null,
                    "pic": null,
                    "price": null,
                    "promotionPrice": null,
                    "description": null,
                    "albumPics": null,
                    "detailHtml": null,
                    "paramHtml": null,
                    "skuStocks": null
                },
                currentPic: 0,
                timer: null,
                loading: false,
                showDesc: true,
                currentChooseProduct: {
                    index: 0,
                    name: '',
                    price: null,
                    sku: null
                },
                cartItem: {
                    "price": 0,
                    "productAttr": "string",
                    "productId": 0,
                    "productName": "string",
                    "productPic": "string",
                    "productSkuCode": "string",
                    "productSkuId": 0,
                    "productSn": "string",
                    "quantity": 1
                },
                showLoginNotice: true
            }
        },
        methods: {
            //关闭登录提示
            closeLoginNotice() {
                this.showLoginNotice = false
            },
            //切换当前图片
            changeChoose(index, sku) {
                this.currentPic = index
                this.currentChooseProduct.name = this.spData(sku.spData)
                this.currentChooseProduct.index = index
                this.currentChooseProduct.price = sku.price
                this.currentChooseProduct.sku = sku
            },
            prev() {
                this.currentPic--
                if (this.currentPic < 0) {
                    this.currentPic = this.product.skuStocks.length - 1
                }
            },
            next() {
                this.currentPic++
                if (this.currentPic > this.product.skuStocks.length - 1) {
                    this.currentPic = 0
                }
            },
            autoPlay() {
                this.timer = setInterval(() => {
                    this.next()
                }, 5000)
            },
            //停止播放
            stopPlay() {
                clearInterval(this.timer)
            },
            //获取商品详情
            getProductDetail(id) {
                this.loading = true
                getProductDetail(id).then((response) => {
                    this.loading = false
                    this.product = response.data
                    this.changeChoose(0, this.product.skuStocks[0])
                })
            },
            //取出sku对象的pic作为数组
            getPics(skuStocks) {
                if (skuStocks !== null) {
                    return skuStocks.map(sku => {
                        return sku.pic
                    })
                }
            },
            spData: function (value) {
                let values = JSON.parse(value)
                let result = ''
                for (let i = 0; i < values.length; i++) {
                    result += values[i].value + ' '
                }
                return result
            },
            //添加商品到购物车
            addCartItem() {
                let cartItem = {
                    "price": this.currentChooseProduct.price,
                    "productAttr": this.spData(this.currentChooseProduct.sku.spData),
                    "productId": this.product.id,
                    "productName": this.product.name,
                    "productPic": this.product.pic,
                    "productSkuCode": this.currentChooseProduct.sku.skuCode,
                    "productSkuId": this.currentChooseProduct.sku.id,
                    "productSn": this.product.productSn,
                    "quantity": 1
                }
                window.console.log(cartItem)
                addItem(cartItem).then((response) => {
                    if (response.data === 1) {
                        let data = {
                            name: cartItem.productName + ' ' + cartItem.productAttr,
                            id: cartItem.productId
                        }
                        this.$router.push({
                            path: '/buySuccess',
                            query: data
                        })
                    }
                })
            }
        },
        created() {
            this.autoPlay()
            this.getProductDetail(this.$route.query.id)
            if (this.$store.getters.token) {
                this.showLoginNotice = false
            }
        },
    }
</script>

<style lang="scss">
    .product-detail {
        .xm-product-box {
            position: relative;
            z-index: 4;
            background: #fff;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
            -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);

            .nav-bar {
                position: relative;
                height: 63px;
                width: 100%;
                margin-top: 0;
                color: #616161;

                .container {
                    width: 1224px;

                    .J_proName {
                        margin: 0;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 60px;
                        color: #212121;
                        float: left;
                    }

                    .con {
                        color: black;

                        .right {
                            float: right;
                            _display: inline;
                            margin: 17px 0 0 0;

                            .separator {
                                color: #e0e0e0;
                                margin: 0 .25em;
                            }
                        }
                    }
                }
            }
        }

        .xm-buyBox {
            padding-bottom: 50px;

            .box {
                .login-notic {
                    background: #f7f7f7;
                    width: 100%;
                    text-align: center;
                    height: 48px;
                    line-height: 48px;
                    color: #333;
                    transition: opacity .3s;

                    .container {
                        width: 1224px;

                        .login {
                            color: #ff6700;
                            margin-left: 25px;
                        }

                        .close {
                            color: #b5b5b5;
                            font-size: 18px;
                            vertical-align: middle;
                            margin-left: 10px;
                        }
                    }
                }

                .hide {
                    opacity: 0;
                }

                .pro-choose-main {
                    padding-top: 32px;
                    padding-bottom: 12px;
                    position: relative;
                    width: 1224px;

                    .pro-view {
                        position: relative;
                        float: left;
                        height: 600px;
                        margin-left: 0;

                        .img-con {
                            width: 560px;

                            .ui-wrapper {
                                position: relative;
                                margin: 0;
                                padding: 0;
                                *zoom: 1;
                                max-width: 100%;

                                .ui-viewport {
                                    width: 100%;
                                    overflow: hidden;
                                    position: relative;
                                    height: 560px;
                                    -webkit-transform: translatez(0);
                                    -ms-transform: translatez(0);
                                    transform: translatez(0);
                                    display: flex;

                                    img {
                                        list-style: none;
                                        width: 560px;
                                        height: 560px;
                                        opacity: 0;
                                        position: relative;
                                        transition-duration: 800ms;
                                        transition-property: opacity;
                                        transform: translate3d(0px, 0px, 0px);
                                        flex-shrink: 0;

                                    }

                                    .native {
                                        transition-duration: 800ms;
                                        opacity: 1;
                                        pointer-events: auto
                                    }

                                }

                                .ui-controls {
                                    .ui-pager {
                                        font-size: 12px;
                                        text-align: center;
                                        color: #666;
                                        bottom: 10px;
                                        position: absolute;
                                        left: 0;
                                        width: 100%;
                                        z-index: 1;

                                        .ui-pager-item {
                                            user-select: none;
                                            display: inline-block;

                                            .ui-pager-link {
                                                background: #ccc;
                                                width: 50px;
                                                border-radius: 0;
                                                border: 0;
                                                height: 1.5px;
                                                text-align: left;
                                                text-indent: -9999px;
                                                overflow: hidden;
                                                display: inline-block;
                                                margin: 0 5px;
                                                transition: all .2s;

                                                &:hover {
                                                    background-color: #a3a3a3;
                                                }
                                            }

                                            .active {
                                                background-color: #a3a3a3;
                                            }
                                        }
                                    }

                                    .ui-controls-direction {
                                        a {
                                            position: absolute;
                                            top: 50%;
                                            z-index: 999;
                                            width: 41px;
                                            height: 69px;
                                            margin-top: -35px;
                                            text-indent: -9999px;
                                            overflow: hidden;
                                            _zoom: 1;
                                            outline: 0;
                                        }

                                        .prev {
                                            left: 0;
                                            background: url('../../assets/images/icon-slides.png') no-repeat -84px 50%;

                                            &:hover {
                                                background-position: 0 50%;
                                            }
                                        }

                                        .next {
                                            right: 0;
                                            background: url('../../assets/images/icon-slides.png') no-repeat -125px 50%;

                                            &:hover {
                                                background-position: -42px 50%;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .pro-info {
                        float: right;
                        margin-left: 12px;

                        .pro-title {
                            line-height: 1;
                            margin: 0;
                            padding: 0;
                            font-size: 22px;
                            font-weight: normal;
                            color: #212121;
                        }

                        .desc {
                            color: #b0b0b0;
                            margin: 0;
                            padding: 0;
                            padding-top: 8px;
                        }

                        .loading {
                            padding: 100px 0;

                            .loader {
                            }

                        }

                        .main {
                            .price {
                                display: block;
                                font-size: 18px;
                                line-height: 1;
                                color: #ff6700;
                                border-bottom: 1px solid #e0e0e0;
                                padding: 12px 0 20px;

                            }

                            .list-wrap {
                                margin-top: 30px;

                                .pro-choose {
                                    margin-bottom: 30px;
                                    z-index: 1;
                                    position: relative;

                                    .step-title {
                                        line-height: 1;
                                        font-size: 18px
                                    }

                                    .step-list {
                                        margin-left: -6px;
                                        padding-top: 1px;

                                        .btn {
                                            margin-left: 6px;
                                            margin-top: 15px;
                                            line-height: 42px;
                                            height: 42px;
                                            position: relative;
                                            border: 1px solid #e0e0e0;
                                            list-style: none;
                                            cursor: pointer;
                                            transition: all .2s ease;
                                            float: left;
                                            width: 298px;
                                            -webkit-transition: all .2s ease;
                                            box-sizing: border-box;
                                            text-align: center;

                                            a {
                                                margin: 0 10px;
                                                height: 42px;
                                                display: inline-block;
                                                *zoom: 1;
                                                *display: inline;
                                                text-align: center;
                                                overflow: hidden;
                                                padding: 0 27px;

                                                .name {
                                                    width: 170px;
                                                    overflow: hidden;
                                                    _zoom: 1;
                                                    display: inline-block;
                                                    *zoom: 1;
                                                    *display: inline;
                                                }

                                                .sku-price {
                                                    color: #b0b0b0;
                                                    float: right;
                                                    text-align: center;
                                                }

                                                img {
                                                    width: 16px;
                                                    height: 16px;
                                                    border-radius: 50%;
                                                    margin-right: 10px;
                                                    vertical-align: middle;
                                                    margin-top: -2px;
                                                }
                                            }
                                        }

                                        .active {
                                            border-color: #ff6700;
                                            color: #ff6700 !important;
                                        }
                                    }
                                }

                                .pro-list {
                                    background: #f9f9fa;
                                    padding: 30px;
                                    margin-bottom: 30px;

                                    ul {
                                        padding: 0;
                                        margin: 0;

                                        li {
                                            list-style: none;
                                            line-height: 30px;
                                            color: #616161;
                                        }

                                        .totale-price {
                                            color: #ff6700;
                                            font-size: 24px;
                                            padding-top: 20px;
                                        }
                                    }
                                }

                                .btn-wrap {
                                    padding: 0;
                                    margin: 10px 0 20px 0;

                                    li {
                                        list-style: none;
                                        display: inline-block;
                                        *zoom: 1;
                                        *display: inline;
                                        margin-right: 10px;
                                        vertical-align: text-top;

                                        .btn {
                                            display: inline-block;
                                            *zoom: 1;
                                            *display: inline;
                                            width: 158px;
                                            height: 38px;
                                            padding: 0;
                                            margin: 0;
                                            border: 1px solid #b0b0b0;
                                            font-size: 14px;
                                            line-height: 38px;
                                            text-align: center;
                                            color: #b0b0b0;
                                            cursor: pointer;
                                            -webkit-transition: all .4s;
                                            transition: all .4s;
                                        }

                                        a {
                                            color: #757575;
                                            text-decoration: none;
                                        }

                                        .btn-primary {
                                            background: #ff6700;
                                            border-color: #ff6700;
                                            color: #fff;
                                        }

                                        .btn-biglarge {
                                            width: 298px;
                                            height: 52px;
                                            line-height: 52px;
                                            font-size: 16px;
                                        }

                                        .btn-like {
                                            display: inline-block;
                                            *zoom: 1;
                                            *display: inline;
                                            width: 140px;
                                            height: 52px;
                                            line-height: 52px;
                                            padding: 0;
                                            margin: 0;
                                            border: 1px solid #b0b0b0;
                                            text-align: center;
                                            cursor: pointer;
                                            -webkit-transition: all .4s;
                                            transition: all .4s;
                                            font-size: 16px;
                                            position: relative;

                                            &:hover {
                                                background-color: #757575;
                                            }

                                            i {
                                                font-size: 22px;
                                                line-height: 23px;
                                                vertical-align: -4px;
                                                margin-right: 5px;
                                            }
                                        }

                                        .btn-gray {
                                            background: #b0b0b0;
                                            border-color: #b0b0b0;
                                            color: #fff;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .pro-infomation {
                    .infor-con {
                        padding-bottom: 50px;
                        background: #f5f5f5;

                        .section-tab {
                            text-align: center;
                            padding: 10px 0;
                            background: #fff;
                            border-top: 1px solid #ddd;

                            .info-tab {
                                width: 168px;
                                height: 18px;
                                padding: 20px 0;
                                line-height: 18px;
                                text-align: center;
                                font-size: 18px;
                                color: #424242;
                                display: inline-block;
                                *zoom: 1;
                                *display: inline;

                                &:last-child a {
                                    border: none;
                                }

                                a {
                                    width: 170px;
                                    display: block;
                                    cursor: pointer;
                                    border-right: 1px solid #e0e0e0;


                                }

                                .active {
                                    color: #ff6700;
                                }
                            }


                        }

                        .section-box {
                            display: none;

                            .section-info {
                                .con {
                                    display: block;
                                    position: relative;
                                    width: 100%;
                                    overflow: hidden;
                                    _zoom: 1;
                                    margin: 0 auto;

                                    .pic {
                                        float: left;
                                        height: 100%;
                                        display: block;
                                        position: relative;
                                        top: 0;
                                        left: 50%;
                                        -webkit-transform: translate3d(-50%, 0, 0);
                                        transform: translate3d(-50%, 0, 0);
                                        width: 100%;
                                    }
                                }

                                p {
                                    img {
                                        width: auto;
                                        height: auto;
                                        max-height: 100%;
                                        max-width: 100%;
                                        margin: 0 auto;
                                        display: block;
                                    }
                                }
                            }
                        }

                        .active {
                            display: block;
                        }


                    }
                }
            }
        }
    }
</style>