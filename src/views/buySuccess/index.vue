<template>
    <div class="page-main">
        <div class="container">
            <div class="buy-succ-box clearfix">
                <div class="goods-content">
                    <div class="good-img">
                        <img src="../../assets/images/success.png" title="购买成功">
                    </div>
                    <div class="good-info">
                        <h3>已成功加入购物车!</h3>
                        <span class="name">{{name}}</span>
                    </div>
                </div>
                <div class="actions">
                    <a href="javascript:void (0)" class="btn btn-line-gray" @click="backToPreviousLevel">返回上一级</a>
                    <a href="javascript:void (0)" class="btn btn-primary">去购物车结算</a>
                </div>
            </div>
            <div class="recommend-wrap container">
                <h2 class="xm-recommend-title">
                    <span>买购物车中商品的人还买了</span>
                </h2>
                <div class="xm-carousel-wrapper">
                    <ul class="recommend-list">
                        <li class="span4" v-for="(product,index) in recommendProducts" :key="index">
                            <dl>
                                <dt>
                                    <a href="">
                                        <img :src="product.pic" alt="">
                                    </a>
                                </dt>
                                <dd class="xm-recommend-name">
                                    <a href="javascript:void(0)">
                                        {{product.name}}
                                    </a>
                                </dd>
                                <dd class="xm-recommend-price">{{product.price}}元</dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:void(0)" class="btn">
                                        加入购物车
                                    </a>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getRecommendProduct as fetchList} from '@/api/search'

    export default {
        name: "",
        data() {
            return {
                name: '',
                recommendProducts: []
            }
        },
        methods: {
            getRecommendProduct(id) {
                let data = {
                    pageNum: 0,
                    pageSize: 9999

                }
                fetchList(id, data).then((response) => {
                    this.recommendProducts = response.data.list
                    window.console.log(this.recommendProducts)
                })
            },
            //返回上一级
            backToPreviousLevel() {
                this.$router.go(-1)
            }
        },
        created() {
            this.name = this.$route.query.name
            this.getRecommendProduct(this.$route.query.id)
        }
    }
</script>

<style lang="scss">
    .page-main {
        padding: 38px 0;
        background-color: #f5f5f5;

        .container {
            width: 1226px;
            *zoom: 1;
            margin-right: auto;
            margin-left: auto;

            .buy-succ-box {
                margin-bottom: 26px;
                padding: 0 0 28px 0;
                height: 68px;
                border-bottom: 1px solid #e0e0e0;

                .goods-content {
                    float: left;

                    .good-img {
                        float: left;
                        width: 64px;
                        height: 64px;

                        img {
                            width: 64px;
                            height: 64px;
                        }
                    }

                    .good-info {
                        float: left;
                        margin-left: 20px;

                        h3 {
                            margin: 0;
                            color: #424242;
                            font-size: 24px;
                            font-weight: normal;
                            margin-top: 3px;
                        }

                        .name {
                            margin-right: 15px;
                            font-size: 14px;
                            color: #757575;
                        }
                    }
                }

                .actions {
                    float: right;

                    .btn {
                        width: 180px;
                        margin-left: 12px;
                        margin-top: 5px;
                        display: inline-block;
                        *zoom: 1;
                        *display: inline;
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

                    .btn-line-gray {
                        border-color: #b0b0b0;
                        background: none;
                        color: #757575;

                        &:hover {
                            background-color: #fff;
                        }
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
                }
            }

            .recommend-wrap {
                .xm-recommend-title {
                    position: relative;
                    margin: 0;
                    font-size: 30px;
                    font-weight: 400;
                    color: #757575;
                    border-top: 1px solid #e0e0e0;
                    -webkit-font-smoothing: antialiased;
                    border-top: none;
                    height: auto;

                    span {
                        position: static;
                        margin-bottom: 20px;
                        width: 100%;
                        height: auto;
                        top: -20px;
                        left: 372px;
                        line-height: 40px;
                        text-align: center;
                        display: block;
                        background-color: #f5f5f5;
                    }
                }

                .xm-carousel-wrapper {
                    height: 627px;
                    overflow: hidden;

                    .recommend-list {
                        margin-left: -14px;
                        padding: 0;
                        list-style: none;

                        li {
                            margin-bottom: 14px;
                            height: 300px;
                            background-color: #fff;
                            text-align: center;
                            position: relative;
                            cursor: pointer;

                            &:hover .btn {
                                display: block !important;
                            }

                            dl {
                                padding: 0 20px;
                                margin-bottom: 0;

                                dt {
                                    padding: 40px 0 15px;
                                    height: 145px;

                                    a {
                                        img {
                                            width: 140px;
                                            height: 140px;
                                        }
                                    }

                                }

                                dd {
                                    padding: 0;
                                    margin-top: 0;
                                    list-style: none;
                                }

                                .xm-recommend-name {
                                    margin-bottom: 10px;
                                    height: 18px;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    margin-left: 0;

                                    a {
                                        color: #333;
                                    }
                                }

                                .xm-recommend-price {
                                    margin-bottom: 10px;
                                    color: #ff6700;
                                }

                                .xm-recommend-tips {
                                    position: relative;
                                    color: #757575;

                                    .btn {
                                        position: absolute;
                                        left: 37px;
                                        top: 0;
                                        width: 120px;
                                        /*display: none;*/
                                        background: #fff;
                                        color: #ff6700;
                                        height: 28px;
                                        font-size: 12px;
                                        line-height: 28px;
                                        padding: 0;
                                        margin: 0;
                                        border: 1px solid #ff6700;
                                        cursor: pointer;
                                        -webkit-transition: all .4s;
                                        transition: all .4s;
                                        display: none;
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