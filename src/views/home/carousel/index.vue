<template>
    <div class="home-hero-container container">
        <div class="home-hero">
            <div class="swiper-container home-hero-swiper" @mouseenter.stop="stopPlay" @mouseleave="autoPlay">
                <div class="swiper-wrapper">
                    <div class="swiper-slide swiper-slide-duplicate" v-for="(item,index) in carousels" :key="index"
                         :class="{'native':index === currentImgIndex}"
                         :style="{'transform': 'translate3d(' + -1226 * index + 'px, 0px, 0px)'}"
                    >
                        <a :href="item.url" target="_blank">
                            <img :src="item.pic" alt="" class="swiper-lazy swiper-lazy-loaded">
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
                    <a href="javascript:void(0)" class="swiper-pagination-bullet"
                       @click="gotoPage(index)"
                       v-for="(item,index) in carousels" :key="index"
                       :class="{'native': index===currentImgIndex }"
                    ></a>
                </div>
                <div class="swiper-button-prev"
                     @click="swiperButtonPrev"
                >

                </div>
                <div class="swiper-button-next"
                     @click="swiperButtonNext"
                >

                </div>
            </div>
            <div class="home-hero-sub row">
                <div class="span4">
                    <ul class="home-channel-list clearfix">
                        <li>
                            <a href="javascript:void (0)">
                                <img src="../../../assets/images/flash-sale.png" alt="秒杀区">
                                秒杀区
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)">
                                <img src="../../../assets/images/group-buy.png" alt="企业团购">
                                企业团购
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)">
                                <img src="../../../assets/images/fcode.png" alt="兑换通道">
                                兑换通道
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void (0)">
                                <img src="../../../assets/images/sim-card.png" alt="流量卡">
                                流量卡
                            </a>>
                        </li>
                        <li>
                            <a href="javascript:void (0)">
                                <img src="../../../assets/images/yijiuhuanxin.png" alt="以旧换新">
                                以旧换新
                            </a>>
                        </li>
                        <li>
                            <a href="javascript:void (0)">
                                <img src="../../../assets/images/huafeichongzhi.png" alt="话费充值">
                                话费充值
                            </a>>
                        </li>
                    </ul>
                </div>
                <div class="span16">
                    <ul class="home-promo-list clearfix">
                        <li v-for="(item,index) in promos" :key="index" :class="{'first': index===0}">
                            <a :href="item.url" target="_blank">
                                <img :src="item.pic" alt="">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: "index",
        props: {
            carousels: {
                type: Array,
                default: () => {
                    return ['https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/718043ed2dacdb7d19c52f8f2f413f12.jpg?w=2452&h=920',
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b830faf6f15af779b581cd6182a07bc3.jpg?thumb=1&w=1226&h=460&f=webp&q=90',
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e30d39a87aa69e66fc8b5d5f7eabe5c3.jpg?thumb=1&w=1226&h=460&f=webp&q=90',
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e52c3e98602b90f198ec316dce253cba.jpg?thumb=1&w=1226&h=460&f=webp&q=90',
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/755aca9487082e7698e16f17cfb70839.jpg?thumb=1&w=1226&h=460&f=webp&q=90'
                    ]
                }


            },
            promos: {
                type: [Object, Array],
                default: () => {
                    return [
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7bc54a61b927dd8c54ddd39a0acf0254.jpg?w=632&h=340',
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/94c74e01afe50a86c3a87ff030b85781.jpg?w=632&h=340',
                        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7bc54a61b927dd8c54ddd39a0acf0254.jpg?w=632&h=340'

                    ]
                }
            }
        },
        data() {
            return {
                currentImgIndex: 0,//当前显示图片
                timer: null,//定时器
            }
        },
        methods: {
            //轮播图右下角按钮点击事件
            gotoPage(index) {
                window.console.log(index)
            },
            //轮播左边按钮点击事件
            swiperButtonPrev() {
                if (this.currentImgIndex === 0) {
                    this.currentImgIndex = this.carousels.length - 1
                } else {
                    this.currentImgIndex--
                }
            },
            //轮播图右边按钮点击事件
            swiperButtonNext() {
                if (this.currentImgIndex === this.carousels.length - 1) {
                    this.currentImgIndex = 0
                } else {
                    this.currentImgIndex++
                }

            },
            autoPlay() {
                this.timer = setInterval(() => {
                    this.swiperButtonNext()
                }, 3000)
            },
            //停止播放
            stopPlay() {
                clearInterval(this.timer)
            }
        },
        components: {},
        created() {
            this.autoPlay()
        }
    }
</script>

<style lang="scss">
    .home-hero-container {
        position: relative;
        z-index: 10;

        .home-hero {
            position: relative;
            margin-bottom: 26px;

            .home-hero-swiper {
                position: relative;
                height: 460px;
                overflow: hidden;

                .swiper-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    transition-property: transform;
                    box-sizing: content-box;
                    transform: translateZ(0);

                    .swiper-slide {
                        height: 460px;
                        text-align: right;
                        pointer-events: none;
                        transition-property: opacity;
                        flex-shrink: 0;
                        position: relative;
                        width: 1226px;
                        transform: translate3d(0px, 0px, 0px);
                        opacity: 0;
                        transition-duration: 800ms;

                        a {
                            display: block;
                            background: url(//i1.mifile.cn/f/i/2014/cn/placeholder-220.png) no-repeat 620px;

                            .swiper-lazy {
                                display: block;
                                width: 1226px;
                                height: 460px;
                            }
                        }
                    }

                    .native {
                        transition-duration: 800ms;
                        opacity: 1;
                        pointer-events: auto
                    }
                }

                .swiper-pagination {
                    width: 400px;
                    left: auto;
                    right: 30px;
                    bottom: 20px;
                    text-align: right;
                    position: absolute;
                    z-index: 10;
                    transform: translateZ(0);
                    transition: opacity .3s;

                    .swiper-pagination-bullet {
                        display: inline-block;
                        margin: 0 4px;
                        width: 6px;
                        height: 6px;
                        border: 2px solid #fff;
                        border-color: hsla(0, 0%, 100%, .3);
                        border-radius: 10px;
                        overflow: hidden;
                        background: rgba(0, 0, 0, .4);
                        opacity: 1;
                        cursor: pointer;
                    }

                    .native {
                        background: hsla(0, 0%, 100%, .4);
                        border-color: rgba(0, 0, 0, .4);
                    }
                }

                .swiper-button-prev {
                    position: absolute;
                    top: 50%;
                    width: 41px;
                    height: 69px;
                    margin-top: -35px;
                    z-index: 10;
                    cursor: pointer;
                    outline: none;
                    background: url(../../../assets/images/icon-slides.png) no-repeat -84px 50%;
                    right: auto;
                    left: 234px;

                    &:hover {
                        background-position: 0 -50%;
                    }
                }

                .swiper-button-next {
                    background: url(../../../assets/images/icon-slides.png) no-repeat -125px 50%;
                    right: 0;
                    left: auto;
                    position: absolute;
                    top: 50%;
                    width: 41px;
                    height: 69px;
                    margin-top: -35px;
                    z-index: 10;
                    cursor: pointer;
                    outline: none;

                    &:hover {
                        background-position: -42px 50%;
                    }
                }
            }

            .home-hero-sub {
                margin-top: 14px;

                .span4 {
                    width: 234px;

                    .home-channel-list {
                        margin: 0;
                        padding: 3px;
                        list-style-type: none;
                        font-size: 12px;
                        text-align: center;
                        background: #5f5750;
                        height: 170px;
                        box-sizing: border-box;

                        li {
                            position: relative;
                            float: left;
                            width: 70px;
                            height: 82px;
                            padding: 0 3px;
                            display: list-item;
                            text-align: match-parent;

                            a {
                                display: block;
                                padding-top: 18px;
                                text-overflow: ellipsis;
                                color: #fff;
                                opacity: .7;
                                -webkit-transition: opacity .2s;
                                transition: opacity .2s;

                                img {
                                    display: block;
                                    width: 24px;
                                    height: 24px;
                                    margin: 0 auto 4px;
                                }
                            }

                            &:after {
                                top: 6px;
                                left: 0;
                                width: 1px;
                                height: 70px;
                            }

                            &:after, &:before {
                                position: absolute;
                                content: "";
                                background: #665e57;

                            }

                            &:before {
                                top: -1px;
                                left: 6px;
                                width: 64px;
                                height: 1px;
                            }
                        }
                    }
                }

                .span16 {
                    width: 978px;

                    .home-promo-list {
                        margin: 0;
                        padding: 0;
                        list-style-type: none;

                        li {
                            float: left;
                            width: 316px;
                            height: 170px;
                            margin-left: 15px;
                            transition: -webkit-box-shadow .2s linear;
                            transition: box-shadow .2s linear;

                            a {
                                display: block;
                                height: 170px;
                                background: url(//i1.mifile.cn/f/i/2014/cn/placeholder-80.png) no-repeat 50%;

                                img {
                                    display: block;
                                    width: 316px;
                                    height: 170px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>