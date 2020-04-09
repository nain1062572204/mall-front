<template>
    <div>
        <div class="site-footer">
            <div class="container">
                <div class="footer-service">
                    <ul class="list-service clearfix">
                        <li style="border-left: 0">
                            <router-link to="">
                                <svg-icon icon-class="weixiu" class="icon"></svg-icon>
                                预约维修服务
                            </router-link>
                        </li>

                        <li>
                            <router-link to="">
                                <svg-icon icon-class="7-tian" class="icon"></svg-icon>
                                7天无理由退货
                            </router-link>
                        </li>
                        <li>
                            <router-link to="" >
                                <svg-icon icon-class="15-tian" class="icon" ></svg-icon>
                                15五天免费换货
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <svg-icon icon-class="baoyou" class="icon"></svg-icon>
                                满99包邮
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <svg-icon icon-class="location" class="icon"></svg-icon>
                                520余家售后网点
                            </router-link>
                        </li>

                    </ul>
                </div>
                <div class="footer-links clearfix">
                    <dl class="col-links" v-for="(item,index) in links" :key="index">
                        <dt>
                            {{item.title}}
                        </dt>
                        <dd v-for="(link,index) in item.link" :key="index">
                            <router-link to="">{{link}}</router-link>
                        </dd>
                    </dl>
                    <div class="col-contact">
                        <p class="phone">xxx-xxx-xxxx</p>
                        <p>
                            周一至周日 8:00-18:00<br>
                            （仅收市话费）
                        </p>
                        <router-link to="">
                            <svg-icon icon-class="xiaoxi"></svg-icon>
                            人工客服
                        </router-link>
                    </div>
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
                links:[
                    {
                        'title':'帮助中心',
                        'link':['账号管理','购物指南','订单操作']
                    },
                    {
                        'title':'服务支持',
                        'link':['售后政策','相关下载','自助服务']
                    },
                    {
                        'title':'线下门店',
                        'link':['小鱼之家','服务网点','授权体验店']
                    },
                    {
                        'title':'关于我们',
                        'link':['了解我们','加入我们','投资者关系']
                    },
                    {
                        'title':'关注我们',
                        'link':['新浪微博','官方微信','联系我们']
                    },
                    {
                        'title':'特色服务',
                        'link':['防伪查询','礼物码','兑换']
                    }
                ]
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style lang="scss">
    .site-footer {
        .footer-service {
            padding: 27px 0;
            border-bottom: 1px solid #e0e0e0;

            .list-service {
                margin: 0;
                padding: 0;
                list-style-type: none;

                li {
                    float: left;
                    width: 19.8%;
                    height: 25px;
                    border-left: 1px solid #e0e0e0;
                    font-size: 16px;
                    line-height: 25px;
                    text-align: center;

                    a {
                        display: block;
                        height: 50px;
                        color: #616161;
                        -webkit-transition: color .2s;
                        transition: color .2s;
                        &:hover {
                            color: #FF6700;
                        }

                        .icon {
                            margin-right: 6px;
                            font-size: 24px;
                            line-height: 24px;
                            vertical-align: -8px
                        }
                    }
                }
            }
        }
        .footer-links{
            padding: 40px 0;
            .col-links{
                float: left;
                width: 160px;
                height: 112px;
                margin: 0;
                dt{
                    margin: -1px 0 26px;
                    font-size: 14px;
                    line-height: 1.25;
                    color: #424242;
                }
                dd{
                    margin: 10px 0 0;
                    font-size: 12px;
                    a{
                        color: #757575;
                        &:hover{
                            color: #FF6700;
                        }
                    }
                }
            }
            .col-contact{
                float: right;
                width: 251px;
                height: 112px;
                border-left: 1px solid #e0e0e0;
                text-align: center;
                color: #616161;
                .phone{
                    margin: 0 0 5px;
                    font-size: 22px;
                    line-height: 1;
                    color: #ff6700;
                }
                p{
                    margin: 0 0 16px;
                    font-size: 12px;
                }
                a{
                    border: 1px solid #ff6700;
                    background: #fff;
                    color: #ff6700;
                    width: 118px;
                    height: 28px;
                    font-size: 12px;
                    line-height: 28px;
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                    text-align: center;
                    cursor: pointer;
                    -webkit-transition: all .4s;
                    transition: all .4s;
                    &:hover{
                        background-color: #FF6700;
                        color: #FFF;
                    }
                }
            }
        }
    }

</style>