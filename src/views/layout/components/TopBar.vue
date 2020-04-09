<template>
    <div class="header">
        <div id="J_topbarBannerWrapper"></div>
        <div class="site-topbar">
            <div class="container">
                <div class="topber-nav">
                    <router-link to="/home">小鱼商城</router-link>
                    <span class="sep">|</span>
                    <a href="#">云服务</a>
                    <span class="sep">|</span>
                    <a href="#">金融</a>
                    <span class="sep">|</span>
                    <a href="#">开放平台</a>
                    <span class="sep">|</span>
                    <a href="#">企业团购</a>
                    <span class="sep">|</span>
                    <a href="#">资质证照</a>
                    <span class="sep">|</span>
                    <a href="#">协议规则</a>
                    <span class="sep">|</span>
                    <a href="#">下载app</a>
                </div>
                <div class="topbar-cart">
                    <router-link to="/cartItem" class="cart-mini" @mouseenter.native="showCartMenu"
                                 @mouseleave.native="hideCartMenu"
                                 :style="{color : !cartButtonHover ? '#b0b0b0' : '#FF6700' }"
                                 target="_blank"
                    >
                        <svg-icon icon-class="cart" class="icon"></svg-icon>
                        购物车
                        <span class="cart-mini-num J_cartNum">({{memberInfo.total}})</span>
                        <div class="cart-menu" ref="cartMenu">
                            <div class="menu-content">
                                <div class="loading" v-if="loading">
                                    <div class="loader"></div>
                                </div>
                                <ul class="cart-list" v-if="!loading">
                                    <li v-for="(item,index) in cartItem" :key="index">
                                        <div class="cart-item clearfix" :class="{'first':index===0}">
                                            <a href="javascript:void (0)" class="thumb">
                                                <img :src="item.productPic" alt="">
                                            </a>
                                            <a href="javascript:void(0)" class="name">
                                                {{item.productName}}
                                            </a>
                                            <span class="price">
                                                    {{item.price}} × {{item.quantity}}
                                                </span>
                                            <a href="javascript:void(0)" class="btn-del">
                                                ×
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="cart-total clearfix" v-show="cartItem.length!==0">
                                    <span class="total">
                                        共
                                        <em>{{this.cartItem.length}}</em>
                                        件商品
                                        <span class="price">
                                            {{total}}元
                                        </span>
                                    </span>
                                    <router-link to="/cartItem" target="_blank">去购物车结算</router-link>
                                </div>
                                <div class="msg-empty" v-if="cartItem.length===0">
                                    购物车中还没有商品赶快去添加吧
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div id="J_siteUserInfo" class="topbar-info" v-if="memberInfo.memberName === '' ">
                    <router-link to="/login">登录</router-link>
                    <span class="sep">|</span>
                    <router-link to="/register">注册</router-link>
                    <span class="sep">|</span>
                    <router-link to="">消息通知</router-link>
                </div>
                <div class="topbar-info" v-if="memberInfo.memberName !== '' ">
                    <span class="user">
                        <router-link to="" class="user-name">
                            <span class="name">{{memberInfo.memberName}}</span>
                            <i class="iconfont"></i>
                            <div class="user-menu-wapper">
                                <ul class="user-menu">
                                    <li>
                                        <router-link to="">个人中心</router-link>
                                    </li>
                                    <li>
                                        <router-link to="">评价晒单</router-link>
                                    </li>
                                    <li>
                                        <router-link to="">我的喜欢</router-link>
                                    </li>
                                    <li>
                                        <router-link to="">小鱼账户</router-link>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" @click="logout">退出登录</a>>
                                    </li>
                                </ul>
                            </div>
                        </router-link>
                    </span>
                    <span class="sep">|</span>
                    <router-link to="">消息通知</router-link>
                    <span class="sep">|</span>
                    <router-link to="/user">我的订单</router-link>
                </div>
            </div>
        </div>
        <div class="site-header">
            <div class="container">
                <div class="header-logo">
                    <router-link to="/home" title="小鱼商城">
                        <svg-icon icon-class="github" class="icon"></svg-icon>
                    </router-link>
                </div>
                <div class="header-nav">
                    <ul class="nav-list J_navMainList clearfix">
                        <li id="J_navCategory" class="nav-category">
                            <a href="" class="link-category">
                                <span class="text" style="display: none">全部商品分类</span>
                            </a>
                            <div class="site-category" v-if="showCategory">
                                <ul id="J_categoryList" class="site-category-list clearfix site-category-list-custom">
                                    <li class="category-item" v-for="(category,index) in content.categories"
                                        :key="index">
                                        <router-link to="" href="" class="title">
                                            {{category.name}}
                                            <svg-icon icon-class="more" class="icon"></svg-icon>
                                        </router-link>
                                        <div class="children clearfix">
                                            <ul class="children-list">
                                                <li v-for="(product,index) in category.pmsProducts" :key="index">
                                                    <router-link to="" class="link clearfix">
                                                        <img :src="product.pic"
                                                             alt="" class="thumb">
                                                        <span class="text">{{product.name}}</span>
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li data-index="0" class="nav-item" v-for="(item,index) in content.navProductCategories"
                            :key="index">
                            <a href="#" class="link">
                                <span class="text">{{item.name}}</span>
                            </a>
                        </li>
                        <li data-index="0" class="nav-item">
                            <a href="#" class="link">
                                <span class="text">服务</span>
                            </a>
                        </li>
                        <li data-index="0" class="nav-item">
                            <a href="#" class="link">
                                <span class="text">社区</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="header-search">
                    <form id="J_searchForm" class="search-form clearfix">
                        <input id="search" typeof="text" class="search-text" autocomplete="off"
                               v-model="keyword"
                               @focus="search_form_focus=!search_form_focus"
                               @blur="search_form_focus=!search_form_focus"
                               :class="{'search-form-focus':search_form_focus}"/>
                        <a class="search-button" :class="{'search-form-focus':search_form_focus}"
                           @click="simpleSearch"
                           href="javascript:void(0)"
                        >
                            <svg-icon icon-class="search" class="icon"></svg-icon>
                        </a>
                        <div class="search-hot-words"
                             :class="{'search-hot-words-hide':search_form_focus || this.keyword!==''}">
                            <router-link to="">{{content.advertises[0].name}}</router-link>
                            <router-link to="">{{content.advertises[1].name}}</router-link>
                        </div>
                        <div class="keyword-list" v-show="search_form_focus">
                            <ul class="result-list">
                                <li v-for="(item,index) in content.advertises" :key="index">
                                    <router-link :to="item.url">
                                        {{item.name}}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {topBarContent} from '@/api/home'
    import {getInfo} from "@/api/member";
    import {list} from "@/api/cartItem"
    import {removeToken} from '@/utils/auth'

    const defaultContent = {
        "advertises": [
            {
                id: '',
                name: '',
                url: '',
            },
            {
                id: '',
                name: '',
                url: '',
            }],
        "categories": [],
        "navProductCategories": []
    }
    export default {
        name: "",
        data() {
            return {
                cartButtonHover: false,
                content: Object.assign({}, defaultContent),
                search_form_focus: false,
                keyword: '',
                memberInfo: {
                    memberName: '',
                    total: 0
                },
                loading: true,
                cartItem: [],
            }
        },
        methods: {
            //显示购物车下拉菜单
            showCartMenu() {
                this.$refs.cartMenu.style.height = 'auto'
                this.cartButtonHover = true
                //获取数据
                if (this.$store.getters.token) {
                    list().then((response) => {
                        this.loading = false
                        this.cartItem = response.data
                        this.memberInfo.total = this.cartItem.length
                    })
                } else {
                    this.loading = false
                }

            },
            hideCartMenu() {
                this.$refs.cartMenu.style.height = 0
                this.cartButtonHover = false
                this.loading = true
            },
            getTopBarContent() {
                topBarContent().then(response => {
                    this.content = response.data
                })
            },
            //简单搜索
            simpleSearch() {
                if (this.keyword.trim() !== '') {
                    //跳转路由
                    this.$router.push({
                        path: '/search',
                        query: {
                            keyword: this.keyword
                        }
                    })
                }
            },
            //获取用户登录状态
            checkMemberLoginStatus() {
                if (this.$store.getters.token) {
                    getInfo().then((response) => {
                        this.memberInfo = response.data
                    })
                }
            },
            logout() {
                this.$confirm('确定退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeToken()
                    location.reload()
                })
            }

        },
        created() {
            this.getTopBarContent()
            this.checkMemberLoginStatus()
        },
        computed: {
            showCategory() {
                return this.$route.path === '/home'
            },
            total() {
                let total = 0;
                this.cartItem.forEach((val) => {
                    total += val.price * val.quantity
                })
                return total
            }
        }
    }
</script>

<style lang="scss">
    .header {
        .site-topbar {
            position: relative;
            z-index: 30;
            height: 40px;
            font-size: 12px;
            color: #b0b0b0;
            background: #333;

            .container {
                width: 1226px;
                margin-right: auto;
                margin-left: auto;

                &::before {
                    content: " ";
                    display: table;
                }

                .topber-nav {
                    float: left;
                    height: 40px;
                    line-height: 40px;

                    a {
                        color: #b0b0b0;
                        line-height: 40px;
                        display: inline-block;
                        text-decoration: none;

                        &:hover {
                            color: #ffffff;
                        }
                    }
                }

                .topbar-cart {
                    position: relative;
                    float: right;
                    width: 120px;
                    height: 40px;
                    margin-left: 15px;
                    -webkit-transition: all .2s;
                    transition: all .2s;
                    font-size: 12px;
                    line-height: 40px;

                    .cart-mini {
                        position: relative;
                        z-index: 32;
                        display: block;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        color: #b0b0b0;
                        background: #424242;
                        text-decoration: none;

                        .icon {
                            margin-right: 4px;
                            font-size: 20px;

                        }
                    }

                    .cart-menu {
                        position: absolute;
                        right: 0;
                        top: 40px;
                        z-index: 31;
                        width: 316px;
                        max-height: 533px;
                        height: 0;
                        color: #424242;
                        background: #fff;
                        -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
                        box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
                        overflow: hidden;
                        -webkit-transition: height .3s;
                        transition: height .3s;

                        .menu-content {
                            padding: 20px 0 0;

                            .loading {
                                margin: 0 20px 20px;
                                text-align: center;
                                padding: 20px 0;
                            }

                            .cart-list {
                                margin: 0;
                                padding: 0;
                                list-style-type: none;
                                height: auto;

                                li {
                                    position: relative;
                                    height: 80px;
                                    padding: 0 20px;

                                    .cart-item {
                                        position: relative;
                                        height: 60px;
                                        padding: 10px 0;
                                        border-top: 1px solid #e0e0e0;
                                        line-height: 20px;

                                        &:hover > .btn-del {
                                            opacity: 1 !important;
                                        }

                                        .thumb {
                                            color: #b0b0b0;
                                            line-height: 40px;
                                            display: inline-block;
                                            margin-right: 10px;
                                            float: left;

                                            img {
                                                width: 60px;
                                                height: 60px;
                                            }
                                        }

                                        .name {
                                            float: left;
                                            width: 95px;
                                            height: 40px;
                                            line-height: 20px;
                                            margin: 10px 0;
                                            color: #424242;
                                            overflow: hidden;
                                            display: inline-block;

                                            &:hover {
                                                color: #ff6700;
                                            }
                                        }

                                        .price {
                                            float: right;
                                            margin: 20px 20px 0 5px;
                                            line-height: 20px;
                                            font-size: 10px;
                                        }

                                        .btn-del {
                                            position: absolute;
                                            z-index: 9999;
                                            top: 20px;
                                            right: 0;
                                            font-size: 16px;
                                            opacity: 0;
                                            -webkit-transition: all .2s;
                                            transition: all .2s;
                                        }
                                    }

                                    .first {
                                        border-top: 0;
                                    }

                                }
                            }

                            .cart-total {
                                padding: 15px 20px;
                                background: #fafafa;

                                .total {
                                    float: left;
                                    width: 135px;
                                    color: #757575;
                                    line-height: 20px;

                                    em {
                                        font-style: normal;
                                    }

                                    .price {
                                        display: block;
                                        font-weight: 400;
                                        color: #ff6700;
                                        font-size: 12px;
                                    }
                                }

                                a {
                                    float: right;
                                    width: 130px;
                                    padding: 0;
                                    font-size: 14px;
                                    line-height: 40px;
                                    text-align: center;
                                    color: #f5f5f5;
                                    background: #ff6700;
                                    display: inline-block;
                                    height: 38px;
                                    border-color: #ff6700;
                                }
                            }

                            .msg-empty {
                                padding: 20px 0 20px;
                                text-align: center;
                            }
                        }
                    }

                    .show {
                        height: auto;
                    }
                }

                .topbar-info {
                    position: relative;
                    float: right;
                    height: 40px;
                    line-height: 40px;

                    a {
                        color: #b0b0b0;
                        line-height: 40px;
                        display: inline-block;
                        padding: 0 5px;
                        text-decoration: none;
                        float: left;

                        &:hover {
                            color: #fff;
                        }
                    }

                    .user {
                        position: relative;
                        width: 110px;
                        padding: 0;
                        white-space: nowrap;
                        float: left;
                        line-height: 40px;
                        text-align: center;

                        .user-name {
                            position: relative;
                            z-index: 5;
                            display: block;
                            width: 110px;
                            height: 40px;
                            text-align: center;
                            line-height: 40px;
                            box-sizing: border-box;

                            &:hover {
                                color: #ff6700;
                                background-color: #fff;
                            }

                            &:hover .user-menu-wapper {
                                height: 164px;
                            }

                            .name {
                                display: inline-block;
                                line-height: 40px;
                                width: 75px;
                                max-width: 75px;
                                text-overflow: ellipsis;
                                vertical-align: text-bottom;
                                overflow: hidden;
                                text-align: center;

                            }

                            i {
                                font-size: 24px;
                                line-height: 24px;
                                vertical-align: -5px;

                                &:before {
                                    content: "\E61C";
                                }
                            }

                            .user-menu-wapper {
                                position: absolute;
                                left: 0;
                                top: 40px;
                                z-index: 3;
                                height: 0;
                                overflow: hidden;
                                -webkit-transition: height .3s;
                                transition: height .3s;
                                background: #fff;
                                -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
                                box-shadow: 0 2px 10px rgba(0, 0, 0, .15);

                                .user-menu {
                                    width: 110px;
                                    margin: 0;
                                    padding: 7px 0;
                                    list-style-type: none;

                                    li {
                                        display: list-item;
                                        text-align: -webkit-match-parent;

                                        a {
                                            display: block;
                                            padding: 3px 30px;
                                            line-height: 2;

                                            &:hover {
                                                color: #ff6700;
                                                background-color: rgba(0, 0, 0, .1);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }


                    .show-user-menu {
                        height: 164px;
                    }

                    span {
                        float: left;
                    }
                }
            }
        }

        .site-header {
            position: relative;
            z-index: 20;
            height: 100px;

            .container {
                position: relative;
                width: 1226px;
                margin-right: auto;
                margin-left: auto;

                &::before {
                    content: " ";
                    display: table;
                }

                .header-logo {
                    float: left;
                    width: 62px;
                    margin-top: 22px;

                    a {
                        position: relative;
                        display: block;
                        width: 55px;
                        height: 55px;
                        overflow: hidden;

                        .icon {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 30px;
                        }
                    }
                }

                .header-nav {
                    float: left;
                    width: 850px;

                    .nav-list {
                        position: relative;
                        z-index: 10;
                        float: left;
                        width: 1100px;
                        height: 88px;
                        margin: 0;
                        padding: 12px 0 0 30px;
                        list-style-type: none;
                        font-size: 16px;
                        display: block;

                        &::before {
                            content: " ";
                            display: table;
                        }

                        .nav-category {
                            position: relative;
                            float: left;
                            width: 127px;
                            padding-right: 15px;

                            .link-category {
                                display: block;
                                padding: 26px 0 38px;
                                text-align: right;
                                color: #333;
                                /*visibility: hidden;*/
                                text-decoration: none;
                            }

                            .site-category {
                                display: block;
                                position: absolute;
                                top: 88px;
                                left: -92px;
                                z-index: 21;
                                width: 234px;
                                height: 460px;
                                font-size: 15px;

                                .site-category-list {
                                    height: 420px;
                                    border: 0;
                                    color: #fff;
                                    background: rgba(105, 101, 101, .6);
                                    margin: 0;
                                    padding: 20px 0;
                                    list-style-type: none;

                                    &::before {
                                        content: " ";
                                        display: table;
                                    }

                                    .category-item {
                                        font-size: 14px;

                                        .title {
                                            position: relative;
                                            display: block;
                                            padding-left: 30px;
                                            height: 42px;
                                            line-height: 42px;
                                            color: #fff;

                                            .icon {
                                                position: absolute;
                                                top: 12px;
                                                right: 20px;
                                                font-size: 16px;
                                                line-height: 16px;
                                                color: #e0e0e0;
                                            }
                                        }

                                        &:hover {
                                            background-color: #FF6700;
                                        }

                                        &:hover > .children {
                                            display: block;
                                        }

                                        .children {
                                            width: 992px;
                                            display: none;
                                            position: absolute;
                                            left: 234px;
                                            top: 0;
                                            z-index: 24;
                                            height: 458px;
                                            border: 1px solid #e0e0e0;
                                            border-left: 0;
                                            background: #fff;
                                            -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, .18);
                                            box-shadow: 0 8px 16px rgba(0, 0, 0, .18);
                                            font-size: 12px;

                                            .children-list {
                                                width: 992px;
                                                box-sizing: border-box;
                                                height: 458px;
                                                float: left;
                                                margin: 0;
                                                padding: 2px 0;
                                                list-style-type: none;

                                                li {
                                                    box-sizing: border-box;
                                                    position: relative;
                                                    float: left;
                                                    width: 248px;
                                                    height: 76px;
                                                    display: list-item;
                                                    text-align: match-parent;

                                                    .link {
                                                        box-sizing: border-box;
                                                        display: block;
                                                        padding: 18px 20px;
                                                        line-height: 40px;
                                                        color: #333;
                                                        -webkit-transition: color .2s;
                                                        transition: color .2s;

                                                        .thumb {
                                                            float: left;
                                                            margin-right: 12px;
                                                            vertical-align: middle;
                                                            width: 40px;
                                                            height: 40px;
                                                            border: 0;

                                                            .text {
                                                                loat: left;
                                                                width: 172px;
                                                                line-height: 40px;
                                                                white-space: nowrap;
                                                                text-overflow: ellipsis;
                                                                overflow: hidden;
                                                            }
                                                        }

                                                        &:hover {
                                                            color: #FF6700;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .nav-item {
                            display: list-item;
                            text-align: -webkit-match-parent;
                            float: left;

                            .link {
                                display: block;
                                padding: 26px 10px 38px;
                                color: #333;
                                transition: color .2s;

                                &:hover {
                                    color: #FF6700;
                                }

                            }
                        }
                    }
                }

                .header-search {
                    float: right;
                    width: 296px;
                    margin-top: 25px;

                    .search-form {
                        position: relative;
                        width: 296px;
                        height: 50px;
                        z-index: 20;
                        display: block;
                        margin-top: 0;

                        &:before {
                            content: " ";
                            display: table;
                        }

                        .search-text {
                            position: absolute;
                            top: 0;
                            border: 1px solid #e0e0e0;
                            outline: 0;
                            -webkit-transition: all .2s;
                            transition: all .2s;
                            right: 51px;
                            z-index: 1;
                            width: 223px;
                            height: 48px;
                            padding: 0 10px;
                            font-size: 14px;
                            line-height: 48px;
                            box-sizing: content-box;
                        }

                        .search-button {
                            display: inline-block;
                            box-sizing: border-box;
                            cursor: pointer;
                            position: absolute;
                            top: 0;
                            border: 1px solid #e0e0e0;
                            outline: 0;
                            transition: all .2s;
                            right: 0;
                            z-index: 2;
                            width: 52px;
                            height: 49.5px;
                            font-size: 24px;
                            line-height: 50px;
                            background: #fff;
                            color: #616161;
                            text-align: center;

                            &:hover {
                                background-color: #FF6700;
                            }

                            &:hover > .icon {
                                color: #fff;
                            }
                        }

                        .search-hot-words {
                            position: absolute;
                            top: 14px;
                            right: 62px;
                            z-index: 2;
                            text-align: right;
                            transition: opacity .2s;

                            a {
                                display: inline-block;
                                margin-left: 5px;
                                padding: 0 5px;
                                font-size: 12px;
                                background: #eee;
                                color: #757575;
                                -webkit-transition: all .2s;
                                transition: all .2s;

                                &:hover {
                                    background-color: #FF6700;
                                    color: #fff;
                                }
                            }
                        }

                        .keyword-list {
                            position: absolute;
                            left: 0;
                            top: 49.5px;
                            _top: 51px;
                            z-index: 20;
                            width: 243px;
                            border: 1px solid #ff6700;
                            border-top: 0;
                            background: #fff;

                            .result-list {
                                margin: 0;
                                padding: 0;
                                list-style-type: none;

                                li {
                                    display: list-item;
                                    text-align: -webkit-match-parent;

                                    &:hover {
                                        background-color: rgba(0, 0, 0, .03)
                                    }

                                    a {
                                        position: relative;
                                        display: block;
                                        padding: 6px 15px;
                                        font-size: 12px;
                                        color: #424242;
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