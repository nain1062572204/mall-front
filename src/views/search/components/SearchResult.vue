<template>
    <div class="search-result">
        <div class="result-order" v-if="this.searchResult.total!==0">
            <div class="order-list-box clearfix">
                <ul class="order-list">
                    <li v-for="(item,index) in sortList" :key="index">
                        <a href="javascript:void(0)" :class="{'active':index===sortParam}"
                           @click="sortParamChange(index)"
                        >
                            {{item}}
                            <!--<i class="iconfont" v-if="index===3" ref="priceIcon">↑</i>-->
                        </a>
                    </li>
                </ul>
            </div>
            <div class="goods-list-box">
                <div class="goods-list clearfix">
                    <div class="goods-item" v-for="(product,index) in searchResult.list" :key="index">
                        <div class="figure figure-img">
                            <router-link :to="{path:'/product',query:{'id':product.id}}" target="_blank">
                                <img :src="product.pic" alt="">
                            </router-link>
                        </div>
                        <h2 class="title">
                            <router-link to="">
                                {{product.name}}
                            </router-link>
                        </h2>
                        <p class="price">{{product.price}}</p>
                        <div class="thumbs">
                            <ul class="thumb-list">
                                <li v-for="(sku,index) in product.skuStockList" :key="index">
                                    <router-link to="">
                                        <img :src="sku.pic" :title="sku.sp1 +' '+ sku.sp2 +' '+sku.sp3">
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="good-list-pages" v-show="this.total>20">
                    <div class="xm-pagenavi">
                        <a class="numbers first" href="javascript:void(0)">
                            <span class="iconfont">
                                
                            </span>
                        </a>
                        <a class="numbers current" href=" javascript:void(0)">1</a>
                        <a class="numbers" href=" javascript:void(0)">2</a>
                        <a class="numbers" href=" javascript:void(0)">3</a>
                        <a class="numbers last" href="javascript:void(0)">
                            <span class="iconfont">
                                
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-bd clearfix" v-show="this.searchResult.total===0">
            <p class="empty">
                很抱歉没有找到关与&nbsp;“{{this.keyword}}”&nbsp;关的商品
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "",
        data() {
            return {
                sortList: ['综合', '新品', '销量', '价格升序', '价格降序'],
                //排序字段:0->按相关度；1->按新品；2->按销量；3->价格从低到高；4->价格从高到低
                sortParam: 0,
                pageNum: 1
            }
        },
        props: {
            searchResult: {
                type: Object,
                default: () => {
                    return {
                        'total': 0,
                        'skuStockList': []
                    }
                }
            },
            keyword: null,
        },

        methods: {
            sortParamChange(index) {
                this.sortParam = index
            }
        },
        created() {
            document.title = '【' + this.keyword + '】 相关产品'
        }
    }
</script>

<style lang="scss">
    .search-result {
        padding: 20px 0 100px;
        background: #f5f5f5;

        .result-order {
            width: 1226px;
            position: relative;
            margin: 0 auto;

            .order-list-box {
                height: 30px;
                margin: 20px 0;
                overflow: hidden;
                position: relative;
                zoom: 1;

                .order-list {
                    float: left;
                    height: 30px;
                    line-height: 30px;
                    margin: 0;
                    padding: 0;
                    list-style-type: none;

                    li {
                        float: left;
                        padding: 0 30px;
                        border-left: 1px solid #e0e0e0;
                        line-height: 20px;

                        a {
                            color: #424242;
                            -webkit-transition: color .2s;
                            transition: color .2s;

                            &:hover {
                                color: #ff6700;
                            }

                            .iconfont {
                                font-style: normal;
                                -webkit-font-smoothing: antialiased;
                                -webkit-text-stroke-width: 0.2px;
                                font-size: 15px;
                                line-height: 15px;
                                vertical-align: 2px;
                            }
                        }

                        &:first-child {
                            border-left: none;
                        }

                        .active {
                            color: #ff6700;
                        }
                    }


                }
            }

            .goods-list-box {
                width: 1226px;

                .goods-list {
                    width: 1240px;
                    margin: 0;
                    list-style-type: none;

                    .goods-item {
                        position: relative;
                        float: left;
                        width: 296px;
                        height: 383px;
                        padding-top: 47px;
                        margin-right: 14px;
                        margin-bottom: 14px;
                        text-align: center;
                        background: #fff;
                        -webkit-transition: -webkit-box-shadow .5s linear;
                        transition: box-shadow .5s linear;

                        &:hover {
                            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                        }

                        .figure-img {
                            width: 200px;
                            height: 200px;
                            margin: 0 auto 16px;

                            a {
                                display: block;

                                img {
                                    width: 200px;
                                    height: 200px;
                                }
                            }
                        }

                        .title {
                            margin: 0 auto;
                            width: 230px;
                            font-size: 14px;
                            font-weight: 400;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;

                            a {
                                color: #424242;
                            }
                        }

                        .price {
                            margin: 0 0 15px;
                            color: #ff6700;
                        }

                        .thumbs {
                            width: 100%;
                            height: 36px;
                            overflow: hidden;

                            .thumb-list {
                                margin: 0;
                                padding: 0;
                                list-style-type: none;
                                font-size: 0;

                                li {
                                    display: inline-block;
                                    *zoom: 1;
                                    *display: inline;
                                    width: 34px;
                                    height: 34px;
                                    margin: 0 4px;
                                    border: 1px solid #e0e0e0;
                                    cursor: pointer;
                                    -webkit-transition: border-color .2s linear;
                                    transition: border-color .2s linear;

                                    &:hover {
                                        border-color: #ff6700;
                                    }

                                    a {
                                        img {
                                            width: 34px;
                                            height: 34px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .good-list-pages {
                    .xm-pagenavi {
                        height: 30px;
                        padding: 15px 0;
                        text-align: center;

                        .numbers {
                            display: inline-block;
                            *zoom: 1;
                            *display: inline;
                            width: 48px;
                            height: 24px;
                            padding: 3px 0;
                            margin: 0 7px;
                            font-size: 18px;
                            font-weight: 200;
                            line-height: 24px;
                            color: #b0b0b0;
                            cursor: pointer;

                            &:hover {
                                background: #b0b0b0;
                                color: #fff;
                            }

                            span {
                                font-size: 24px;
                                vertical-align: bottom;
                            }
                        }

                        .current {
                            background-color: #757575;
                            color: #fff;
                        }
                    }
                }
            }
        }

        .box-bd {
            .empty {
                display: block;
                margin: 0 auto;
                width: 1226px;
            }
        }
    }
</style>