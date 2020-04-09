<template>
    <div>
        <div class="h_panel">
            <div class="logo">
                <a href=""></a>
            </div>
        </div>
        <div class="login_banner_panel">
            <a href=""></a>
        </div>
        <div class="wap">
            <div class="layout_panel">
                <div class="layout">
                    <div class="main-content">
                        <div class="main-box">
                            <div class="nav_tabs_panel">
                                <div class="nav-tabs">
                                    <a href="" style="color: #ff6700;">账号登录</a>
                                    <span class="line"></span>
                                    <a href="">扫码登录</a>
                                </div>
                            </div>
                            <div class="login_area">
                                <div class="loginbox">
                                    <div class="lgn_inputbg">
                                        <label class="labelbox">
                                            <input type="text" class="err_bg" placeholder="E-mail/手机号码"
                                                   v-model="member.username">
                                        </label>
                                        <label class="labelbox">
                                            <input type="password" class="err_bg" placeholder="密码"
                                                   v-model="member.password">
                                        </label>
                                    </div>
                                    <div class="err-tip">
                                        <em></em>
                                        <span>请输入用户名</span>
                                    </div>
                                    <div class="btns_bg">
                                        <a href="javascript:void (0)" @click="login">登录</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {setCookie, getCookie} from "@/utils/suppport";

    export default {
        name: "",
        data() {
            return {
                member: {
                    username: null,
                    password: null
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('Login', this.member).then(() => {
                    setCookie('memberName', this.member.username)
                    setCookie('memberPassword', this.member.password)
                })
            }
        },
        created() {
            this.member.username = getCookie('memberName')
            this.member.password = getCookie('memberPassword')
            if (this.member.username === undefined || this.member.username == null || this.member.username === '') {
                this.member.username = 'rose';
            }
            if (this.member.password === undefined || this.member.password == null) {
                this.member.password = '';
            }
        }
    }
</script>

<style lang="scss">
    .h_panel {
        width: 1130px;
        margin: 0 auto;

        .logo {
            width: 200px;
            height: 98px;
            background: url(../../assets/images/mistore_logo.png) no-repeat;

            a {
                display: block;
                height: 98px;
                text-indent: -9999em;
            }
        }
    }

    .login_banner_panel {
        width: 100%;
        height: 588px;
        position: absolute;
        left: 0;
        top: 98px;
        background-repeat: no-repeat;
        background-position: top center;
        background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7f25f8c94bac0a8bfb3c6a3e30e5b7dd.jpg);

        a {
            display: block;
            height: 588px;
            text-indent: -9999em;
        }
    }

    .wap {
        padding-bottom: 0;
        position: relative;

        .layout_panel {
            width: 1130px;
            margin: 0 auto;
            padding-top: 30px;

            .layout {
                margin: 0 auto 20px;
                position: relative;
                background-color: #fff;
                width: 410px;
                min-height: 556px;
                margin-bottom: 0;
                margin-right: 0;
                font-size: 14px;
                z-index: 4;

                .main-box {
                    padding-bottom: 0;

                    .nav_tabs_panel {
                        .nav-tabs {
                            padding: 27px 0 24px;
                            text-align: center;
                            font-size: 24px;
                            color: #666;

                            .line {
                                width: 1px;
                                height: 24px;
                                margin: 0 35px 0 42px;
                                border: 1px solid #e0e0e0;
                            }
                        }
                    }

                    .login_area {
                        width: 348px;
                        padding-bottom: 0;
                        margin: 0 auto;

                        .loginbox {
                            position: relative;

                            .lgn_inputbg {
                                position: relative;

                                .labelbox {
                                    margin-bottom: 14px;
                                    outline: 0 none;
                                    display: -webkit-box;

                                    input {
                                        height: 22px;
                                        line-height: 22px;
                                        padding: 13px 16px 13px 14px;
                                        display: block;
                                        width: 360px;
                                        outline: 0 none;
                                    }

                                    .err_bg {
                                        border: 1px solid #f56600 !important;
                                    }
                                }

                            }

                            .err-tip {
                                margin-bottom: 5px;
                                line-height: 20px;
                                color: #f56600;

                                em {
                                    width: 14px;
                                    height: 14px;
                                    margin: -1px 5px 0 0;
                                    overflow: hidden;
                                    display: inline-block;
                                    vertical-align: middle;
                                    background: url(https://account.xiaomi.com/static/res/f234829/account-static/respassport/acc-2014/img/sprite_login.gif) no-repeat;
                                    background-position: 0 -69px;
                                }

                                span {
                                    vertical-align: middle;
                                }
                            }

                            .btns_bg {
                                padding-top: 20px;

                                a {
                                    background-color: #ff6700;
                                    width: 100%;
                                    height: 50px;
                                    line-height: 50px;
                                    display: block;
                                    margin-bottom: 14px;
                                    text-align: center;
                                    font-size: 14px;
                                    color: #fff;
                                    cursor: pointer;
                                }
                            }

                            &:after, &:before {
                                content: "";
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>