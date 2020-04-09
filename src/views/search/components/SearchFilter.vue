<template>
    <div class="search-filter">
        <div class="filter-wrap">
            <div class="filter-list">
                <ul class="item choose-item" v-if="chooseItem.length!==0">
                    <span class="label">
                         已选：
                    </span>
                    <li class="selected-item" v-for="(item,index) in chooseItem" :key="index">
                        <a href="javascript:void(0)">
                            {{item}}
                            <i class="icon" @click="cancelChoose(index)">×</i>
                        </a>
                    </li>
                </ul>
                <ul class="item" :class="{'show-less':showLess}"
                    v-if="related.productCategoryNames.length!==0">
                    <span class="label">
                        分类:
                    </span>
                    <li v-for="(item,index) in related.productCategoryNames" :key="index">
                        <router-link to="">
                            {{item}}
                        </router-link>
                    </li>
                    <span class="more-btn" v-show="related.productCategoryNames.length>7"
                          @click="showLess=!showLess">
                        更多
                    </span>
                </ul>
                <ul class="item" v-for="(attr,index) in related.productAttrs" :key="index"
                    :class="{'show-less':attr.showLess}"
                    v-if="related.productAttrs.length!==0">
                    <span class="label">
                        {{attr.attrName}}:
                    </span>
                    <li v-for="(val,index) in attr.attrValues" :key="index"
                        @click="chooseAttribute(attr.attrName,val)">
                        <router-link to="">
                            {{val}}
                        </router-link>
                    </li>
                    <span class="more-btn" v-show="attr.attrValues.length>7"
                          @click="attr.showLess=!attr.showLess">
                        更多
                    </span>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "",
        data() {
            return {
                categories: {
                    'showLess': true,
                    values: ['手机', '耳机', '保护膜', '保护壳', '数据线', '服务', '电脑', '键盘', '键盘']
                },
                showLess: true,
                chooseItem: [],
            }
        },
        props: {
            related: {
                type: Object,
                default: () => {
                    return {
                        "productCategoryNames": [],
                        "productAttrs": []
                    }
                }
            }
        },
        methods: {
            //选择筛选属性
            chooseAttribute(attributeName, val) {
                this.chooseItem.push(attributeName + '：' + val)
            },
            //取消选择筛选属性
            cancelChoose(index) {
                this.chooseItem.splice(index, 1)
            }
        }
    }
</script>

<style lang="scss">
    .search-filter {
        background: #fff;

        .filter-wrap {
            margin: auto;
            width: 1226px;
            padding: 18px 0;

            .filter-list {
                position: relative;

                .item {
                    position: relative;
                    overflow: hidden;
                    _zoom: 1;
                    border-top: 1px solid #ededed;
                    padding: 0 60px 0 124px;
                    margin: 0;
                    list-style: none;
                    font-size: 0;

                    &:first-child {
                        border-top: none;
                    }

                    .label {
                        position: absolute;
                        height: 20px;
                        line-height: 20px;
                        padding: 14px 0;
                        font-size: 14px;
                        top: 0;
                        left: 0;
                        color: #b0b0b0;
                    }

                    li {
                        display: inline-block;
                        *zoom: 1;
                        *display: inline;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        _zoom: 1;
                        color: #424242;
                        font-size: 14px;
                        width: 148px;
                        padding: 14px 0;
                        height: 20px;
                        line-height: 20px;

                        a {
                            color: #424242;

                            &:hover {
                                color: #ff6700;
                            }
                        }
                    }

                    .more-btn {
                        position: absolute;
                        height: 20px;
                        line-height: 20px;
                        padding: 14px 0;
                        font-size: 14px;
                        cursor: pointer;
                        color: #757575;
                        right: 0;
                        top: 0;
                        user-select: none;
                    }
                }

                .choose-item {
                    padding-bottom: 14px;

                    .selected-item {
                        height: auto;
                        width: auto;
                        margin: 6px 14px 6px 0;
                        padding: 0;
                        display: inline-block;
                        *zoom: 1;
                        *display: inline;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        _zoom: 1;
                        color: #424242;
                        font-size: 14px;
                        line-height: 20px;

                        a {
                            position: relative;
                            border: 1px solid #b0b0b0;
                            display: inline-block;
                            *zoom: 1;
                            *display: inline;
                            padding: 5px 58px 5px 20px;

                            &:hover {
                                color: #e53935;
                                border: 1px solid #e53935;
                            }

                            &:hover > .icon {
                                background-color: #e53935;
                            }

                            .icon {
                                position: absolute;
                                right: 0;
                                top: 0;
                                width: 32px;
                                height: 32px;
                                font-size: 24px;
                                line-height: 32px;
                                text-align: center;
                                background-color: #b0b0b0;
                                color: #fff;

                            }
                        }
                    }
                }

                .show-less {
                    height: 48px;
                }
            }
        }
    }
</style>