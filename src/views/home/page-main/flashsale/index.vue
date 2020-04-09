<template>
    <div class="home-flashsale">
        <div class="box-hd">
            <h2 class="title">闪购</h2>
        </div>
        <div class="box-hd clearfix">
            <div class="row">
                <div class="flashsale-countdown rainbow-item-4 span4">
                    <div class="round">
                        {{flash.name}}
                    </div>
                    <img src="../../../../assets/images/flash-sale-lightning.png" alt="">
                    <div class="desc">
                        距离结束还有
                    </div>
                    <div class="countdown clearfix">
                        <span>00</span>
                        <i>:</i>
                        <span>30</span>
                        <i>:</i>
                        <span>23</span>
                    </div>
                </div>
                <div class="span16 flashsale-list swiper-container swiper-no-swiping swiper-container-initialized swiper-container-horizontal">
                    <ul class="swiper-wrapper"
                        style="transition-duration: 1000ms;"
                        :style="{'transform':'translate3d('+swiperWapperTranslate3d+'px, 0px, 0px)'}"
                    >
                        <li class="swiper-slide"
                            v-for="(item,index) in flash.products" :key="index"
                            :class="'rainbow-item-'+ [(index+1) %4===0?1:(index+1) %4]"
                        >
                            <router-link to="">
                                <div class="content">
                                    <div class="thumb">
                                        <img :src="item.product.pic" :alt="item.product.name">
                                    </div>
                                    <h3 class="title">{{item.product.name}}</h3>
                                    <p class="desc">{{item.product.description}}</p>
                                    <p class="price">
                                        <span>{{item.flashPromotionPrice}}</span>
                                        <del>{{item.product.price}}</del>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="swiper-controls">
                    <span class="swiper-flashsale-prev"
                          @click="flashSalePrev"
                          :class="{'swiper-button-disabled':currentFlashSaleIndex===0}"
                    >
                        <svg-icon icon-class="prev"></svg-icon>
                    </span>
                    <span class="swiper-flashsale-next"
                          @click="flashSaleNext"
                          :class="{'swiper-button-disabled':currentFlashSaleIndex>=Math.floor(this.flash.products.length/4)-1}"
                    >
                        <svg-icon icon-class="next"></svg-icon>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                flashSales: [
                    {
                        'title': '高品质多功能头戴耳机',
                        'desc': '我的私人KTV',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1548146838.9951210.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '高品质多功能头戴耳机',
                        'desc': '我的私人KTV',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1548146838.9951210.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '高品质多功能头戴耳机',
                        'desc': '我的私人KTV',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1548146838.9951210.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    }, {
                        'title': 'MIJOY 抽纸青春版 24包/箱 ',
                        'desc': '精选原生竹浆，健康环保',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1571038766.41824452.jpg?thumb=1&w=200&h=200'
                    },
                    {
                        'title': '小米路由器4C 白色',
                        'desc': '300M单频，高增益4天线',
                        'originPrice': 9999,
                        'price': 0.1,
                        'thumb': '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1552376822.09637089.jpg?thumb=1&w=200&h=200'
                    },


                ],
                swiperWapperTranslate3d: 0,
                currentFlashSaleIndex: 0,

            }
        },
        props: {
            flash: {
                type: Object,
                default: {
                    "id": 1,
                    "startTime": "2020-02-14 00:00:00",
                    "endTime": "2020-02-29 23:00:00",
                    "status": 1,
                    "createTime": "2020-02-14 17:09:02",
                    "name": "18:00 场",
                    "products": [{
                        "id": 2,
                        "flashPromotionSessionId": 1,
                        "productId": 8,
                        "flashPromotionPrice": 3499,
                        "flashPromotionCount": 5,
                        "flashPromotionLimit": 1,
                        "sort": 0,
                        "product": {
                            "id": 8,
                            "productAttributeCategoryId": "",
                            "productCategoryId": "",
                            "name": "粗粮10",
                            "pic": "",
                            "productSn": "d251",
                            "deleteStatus": "",
                            "publishStatus": "",
                            "newStatus": "",
                            "recommandStatus": "",
                            "verifyStatus": "",
                            "sort": "",
                            "sale": "",
                            "price": 3999,
                            "promotionPrice": "",
                            "description": "",
                            "orginalPrice": "",
                            "stock": 50,
                            "unit": "",
                            "weight": "",
                            "servicesIds": "",
                            "keywords": "",
                            "albumPics": "",
                            "productCategoryName": "",
                            "detailHtml": ""
                        }
                    }]
                }
            }
        },
        methods: {
            flashSalePrev() {
                this.currentFlashSaleIndex--
                this.swiperWapperTranslate3d = this.currentFlashSaleIndex * -992
            },
            flashSaleNext() {
                this.currentFlashSaleIndex++
                this.swiperWapperTranslate3d = this.currentFlashSaleIndex * -992
            }
        },
        created() {


        }
    }
</script>

<style lang="scss">
    .home-flashsale {
        margin-bottom: 22px;
        position: relative;

        &:after {
            content: ".";
            display: block;
            clear: both;
            height: 0;
            font-size: 0;
            visibility: hidden;
        }

        .box-hd {
            position: relative;
            height: 58px;
            -webkit-font-smoothing: antialiased;

            .title {
                margin: 0;
                font-size: 22px;
                font-weight: 200;
                line-height: 58px;
                color: #333;
            }

            .row {
                .flashsale-countdown {
                    height: 300px;
                    padding-top: 39px;
                    border-top-width: 1px;
                    border-top-style: solid;
                    background: #f1eded;
                    text-align: center;

                    .round {
                        font-size: 21px;
                        color: #ef3a3b;
                        padding-top: 15px;
                    }

                    img {
                        margin: 25px auto;
                    }

                    .desc {
                        color: rgba(0, 0, 0, .54);
                        font-size: 15px;
                    }

                    .countdown {
                        width: 168px;
                        margin: 28px auto 0;

                        span {
                            width: 46px;
                            height: 46px;
                            background: #605751;
                            color: #fff;
                            font-size: 24px;
                            line-height: 46px;
                            float: left;
                        }

                        i {
                            width: 15px;
                            float: left;
                            height: 46px;
                            line-height: 46px;
                            color: #605751;
                            font-size: 28px;
                            font-style: normal;
                        }
                    }
                }

                .flashsale-list {
                    float: left;

                    .swiper-wrapper {
                        margin: 0;
                        padding: 0;
                        height: 340px;
                        position: relative;
                        width: 100%;
                        box-sizing: content-box;
                        z-index: 1;
                        display: flex;

                        li {
                            width: 234px;
                            margin-right: 14px;
                            border-top-width: 1px;
                            border-top-style: solid;
                            text-align: center;
                            background: #fff;
                            -webkit-transition: all .6s;
                            transition: all .6s;
                            position: relative;
                            list-style: none;
                            display: list-item;

                            a {
                                display: block;
                                height: 300px;
                                padding-top: 39px;
                                position: relative;
                                color: #757575;

                                .content {
                                    .thumb {
                                        display: block;
                                        width: 160px;
                                        margin: 0 auto 22px;

                                        img {
                                            width: 160px;
                                            height: 160px;
                                        }
                                    }

                                    .title {
                                        margin: 0 20px 3px;
                                        font-size: 14px;
                                        font-weight: 400;
                                        text-overflow: ellipsis;
                                        color: #212121;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        line-height: 21px;
                                    }

                                    .desc {
                                        height: 18px;
                                        margin: 0 20px 12px;
                                        font-size: 12px;
                                        text-overflow: ellipsis;
                                        color: #b0b0b0;
                                        overflow: hidden;
                                        white-space: nowrap;
                                    }

                                    .price {
                                        margin: 0;
                                        color: #ff6709;

                                        del {
                                            color: #b0b0b0;
                                            text-decoration: line-through;
                                        }
                                    }
                                }
                            }
                        }

                        .swiper-slide {
                            flex-shrink: 0;
                            height: 100%;
                        }
                    }
                }

                .swiper-controls {
                    user-select: none;
                    position: absolute;
                    right: 0;
                    top: -35px;

                    .swiper-flashsale-prev {
                        display: inline-block;
                        width: 24px;
                        height: 16px;
                        padding: 3px 5px;
                        margin-left: -1px;
                        border: 1px solid #e0e0e0;
                        font-size: 16px;
                        line-height: 16px;
                        -webkit-transition: color .5s;
                        transition: color .5s;
                        color: #b0b0b0;
                        text-align: center;
                        cursor: pointer;
                        user-select: none;

                        &:hover {
                            color: #FF6700;
                        }
                    }

                    .swiper-flashsale-next {
                        display: inline-block;
                        width: 24px;
                        height: 16px;
                        padding: 3px 5px;
                        margin-left: -1px;
                        border: 1px solid #e0e0e0;
                        font-size: 16px;
                        line-height: 16px;
                        -webkit-transition: color .5s;
                        transition: color .5s;
                        color: #b0b0b0;
                        text-align: center;
                        cursor: pointer;
                        user-select: none;

                        &:hover {
                            color: #FF6700;
                        }
                    }

                    .swiper-button-disabled {
                        color: #e0e0e0;
                        cursor: default;
                        pointer-events: none;
                    }
                }
            }
        }


    }
</style>