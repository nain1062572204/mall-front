<template>
    <div class="home-brick-box home-brick-row-2-box xm-plain-box">
        <div class="box-hd">
            <h2 class="title">{{recommendCategory.name}}</h2>
            <div class="more">
                <router-link to="/product">
                    查看全部
                    <svg-icon icon-class="more"></svg-icon>
                </router-link>
            </div>
        </div>
        <div class="box-hd clearfix">
            <div class="row">
                <div class="span16">
                    <ul class="brick-list clearfix">
                        <li class="brick-item" v-for="(product,index) in recommendCategory.pmsProducts" :key="index">
                            <router-link :to="{path:'/product',query:{id:product.id}}" target="_blank">
                                <div class="figure figure-img">
                                    <img :src="product.pic" alt="">
                                </div>
                                <h3 class="title">
                                    {{product.name}}
                                </h3>
                                <p class="desc">{{product.subTitle}}</p>
                                <p class="price">
                                    <span class="num">{{product.price}}元起</span>
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "",
        props: {
            recommendCategory: {
                type: Object,
                default: () => {
                    return {
                        "id": 2,
                        "parentId": 1,
                        "name": "手机",
                        "level": 1,
                        "productCount": 0,
                        "navStatus": 1,
                        "showStatus": 1,
                        "sort": 0,
                        "icon": "",
                        "keywords": "",
                        "description": "",
                        "recommandStatus": 1,
                        "pmsProducts": [{
                            "id": 1,
                            "productAttributeCategoryId": 1,
                            "productCategoryId": 2,
                            "name": "一加7Pro",
                            "pic": "https://wang-mall-oss.oss-cn-beijing.aliyuncs.com/mall/images/20191013/109951162828871716.jpg",
                            "productSn": "C001",
                            "deleteStatus": 0,
                            "publishStatus": 1,
                            "newStatus": 1,
                            "recommandStatus": 1,
                            "verifyStatus": 1,
                            "sort": 0,
                            "sale": 0,
                            "price": 3999,
                            "promotionPrice": 0,
                            "description": "前置指纹后置屏幕的一加",
                            "orginalPrice": 0,
                            "stock": 500,
                            "unit": "部",
                            "weight": 300,
                            "servicesIds": "1,2,3",
                            "keywords": "一加 ONEPLUS",
                            "albumPics": "图片",
                            "productCategoryName": "手机",
                            "detailHtml": ""
                        }]
                    }
                }
            }

        },
        data() {
            return {}
        },
        methods: {
            //跳转到详情页面
            goDetail(product) {
                let routeData =
                    this.$router.resolve({
                        name: 'product',
                        params: product
                    })
                window.open(routeData.href, '_blank')
            }
        }
    }
</script>

<style lang="scss">
    .home-brick-box {
        margin-bottom: 8px;
        height: 686px;

        .box-hd {
            .title {
                margin: 0;
                font-size: 22px;
                font-weight: 200;
                line-height: 58px;
                color: #333;
            }

            .more {
                position: absolute;
                top: 0;
                right: 0;

                a {
                    font-size: 16px;
                    line-height: 58px;
                    color: #424242;
                    -webkit-transition: all .4s;
                    transition: all .4s;

                    &:hover {
                        color: #FF6700;
                    }
                }
            }

            .row {
                .span16 {
                    width: 1226px;

                    .brick-list {
                        margin: 0 0 -14px -14px;
                        height: 614px;
                        list-style: none;

                        .brick-item {
                            position: relative;
                            z-index: 1;
                            float: left;
                            width: 234px;
                            height: 260px;
                            padding: 20px 0;
                            margin-left: 14px;
                            margin-bottom: 14px;
                            background: #fff;
                            -webkit-transition: all .2s linear;
                            transition: all .2s linear;
                            display: list-item;
                            text-align: -webkit-match-parent;
                            cursor: pointer;

                            &:hover {
                                z-index: 2;
                                box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
                                transform: translate3d(0, -2px, 0);
                            }

                            a {
                                .figure {
                                    width: 150px;
                                    height: 150px;
                                    margin: 0 auto 18px;
                                }

                                .figure-img {
                                    width: 160px;
                                    height: 160px;

                                    img {
                                        width: 160px;
                                        height: 160px;
                                    }
                                }

                                .title {
                                    text-align: center;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    margin: 0 10px 2px;
                                    font-size: 14px;
                                    font-weight: 400;
                                    color: #333;
                                    line-height: 21px;
                                }

                                .desc {
                                    margin: 0 10px 10px;
                                    height: 18px;
                                    font-size: 12px;
                                    color: #b0b0b0;
                                    text-align: center;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                }

                                .price {
                                    margin: 0 10px 14px;
                                    text-align: center;
                                    color: #FF6700;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>