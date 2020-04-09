<template>
    <div class="wapper ">
        <div class="wap">
            <div class="layout">
                <div class="n-frame device-frame reg_frame">
                    <div class="logo-area">
                        <a href="">
                            <svg-icon icon-class="github"></svg-icon>
                        </a>
                    </div>
                    <div class="title">
                        <h4>注册账号</h4>
                    </div>
                    <div>
                        <div class="regbox">
                            <div class="phone_step1">
                                <h4>国家/地区</h4>
                            </div>
                        </div>
                    </div>
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
    .wapper {
        background: #f9f9f9;
        width: 100%;
        min-height: 100%;
        height: auto;
        display: -webkit-box;
        display: box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -o-box;
        -webkit-box-align: center;
        -moz-box-align: center;
        -o-box-align: center;
        -ms-box-align: center;
        box-align: center;
        -ms-flex-align: center;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -o-box-pack: center;
        box-pack: center;
        -ms-flex-pack: center;
        .wap {
            padding-bottom: 80px;


            .layout {
                width: 854px;
                margin: 0 auto;
                padding-bottom: 10px;

                .n-frame {
                    background: #fff;
                    padding: 34px 34px 0;
                    border: none;
                    min-height: 400px;
                    border-radius: 0;
                    padding-top: 0;

                    .logo-area {
                        padding-bottom: 40px;
                        display: block;

                        a {
                            width: 49px;
                            height: 48px;
                            margin: 0 auto;
                            display: block;
                            cursor: default;
                            text-align: center;
                            line-height: 48px;
                            font-size: 30px;
                        }
                    }

                    .title {
                        border-bottom: none;
                        padding-bottom: 0;
                        margin-bottom: 0;
                        clear: both;
                        text-align: center;

                        h4 {
                            font-size: 30px;
                            font-weight: normal;
                            line-height: 1.5;
                            color: #333;
                        }
                    }
                    .regbox{
                        width: 332px;
                        padding: 30px 0;
                        line-height: 20px;
                        margin: 0 auto;
                        .phone_step1{
                            line-height: 20px;
                            h4{
                                padding-bottom: 5px;
                                color: #333;
                                font-weight: normal;
                                font-size: 14px ;
                            }
                        }
                    }
                }
            }
        }
    }

</style>