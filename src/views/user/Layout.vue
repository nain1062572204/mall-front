<template>
    <div class="user-main">
        <div class="container">
            <div class="row">
                <div class="span4">
                    <div class="uc-box uc-sub-box">
                        <div class="uc-nav-box">
                            <div class="box-hd">
                                <h3 class="title">订单中心</h3>
                            </div>
                            <div class="box-bd">
                                <ul class="uc-nav-list J_navList">
                                    <li class="active">
                                        <a>我的订单</a>
                                    </li>
                                    <li><a>团购订单</a>
                                    </li>
                                    <li><a>评价晒单</a>
                                    </li>
                                    <li><a>话费充值订单</a>
                                    </li>
                                    <li><a>以旧换新订单</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="uc-nav-box">
                            <div class="box-hd">
                                <h3 class="title">个人中心</h3>
                            </div>
                            <div class="box-bd">
                                <ul id="J_orderNavList" class="uc-nav-list">
                                    <li><a>我的个人中心</a>
                                    </li>
                                    <li><a>消息通知<i></i></a></li>
                                    <li><a>购买资格
                                        <i class="J_miInviteTotal"></i></a></li>
                                    <li><a>现金账户</a>
                                    </li>
                                    <li><a>现金券</a>
                                    </li>
                                    <li><a>喜欢的商品</a>
                                    </li>
                                    <li><a>优惠券</a>
                                    </li>
                                    <li><a>收货地址</a>
                                    </li>
                                    <li><a>红包</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="uc-nav-box">
                            <div class="box-hd">
                                <h3 class="title">售后服务</h3>
                            </div>
                            <div class="box-bd">
                                <ul class="uc-nav-list">
                                    <li><a>服务记录</a>
                                    </li>
                                    <li><a>申请服务</a>
                                    </li>
                                    <li><a>领取快递报销</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="uc-nav-box">
                            <div class="box-hd">
                                <h3 class="title">帐户管理</h3>
                            </div>
                            <div class="box-bd">
                                <ul class="uc-nav-list">
                                    <li><a>个人信息</a>
                                    </li>
                                    <li><a>修改密码</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span16">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style lang="scss">
    .user-main {
        padding-bottom: 40px;
        background-color: #f5f5f5;
        padding-top: 15px;

        .row {
            .uc-box {
                padding: 36px 0;
                background-color: #FFF;

                .uc-nav-box {
                    margin-bottom: 12px;

                    .box-hd {
                        height: 52px;

                        .title {
                            margin: 0 48px 2px;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 52px;
                            color: #333;
                        }
                    }

                    .box-bd {
                        .uc-nav-list {
                            margin: 0;
                            padding: 0;
                            list-style-type: none;

                            li {
                                padding: 6px 48px;

                                &.active > a {
                                    color: #ff6700;
                                }
                            }

                        }
                    }
                }
            }
        }
    }
</style>