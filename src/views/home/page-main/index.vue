<template>
    <div class="page-main home-main">
        <div class="container">
            <flash-sale :flash="flash"></flash-sale>
            <banner-box :banner="banners[0]"></banner-box>
            <div v-for="(item,index) in recommendProducts" :key="index">
                <brick-box :recommend-category="item"></brick-box>
                <banner-box :banner="banners[++index]"></banner-box>
            </div>
            <!--<brick-box></brick-box>
            <banner-box :banner="banners[2]"></banner-box>
            <brick-box></brick-box>
            <banner-box :banner="banners[3]"></banner-box>
            <brick-box></brick-box>-->

        </div>
    </div>
</template>

<script>
    import FlashSale from './flashsale/index'
    import BannerBox from './banner-box/index'
    import BrickBox from './brick-box/index'

    export default {
        name: "",
        data() {
            return {}
        },
        props: {
            banners: {
                type: Array,
                default: () => {
                    return [
                        {
                            "id": 10,
                            "name": "米家联网空调",
                            "type": 2,
                            "pic": "http://wang-mall-oss.oss-cn-beijing.aliyuncs.com/mall/images/2020-02-21/89c2a209b742fce9b10d9d196149d634.jpg",
                            "startTime": "2020-02-21 18:36:11",
                            "endTime": "2020-02-29 00:00:00",
                            "status": 1,
                            "url": "#",
                            "note": "米家空调",
                            "sort": 1
                        },
                        {
                            "id": 11,
                            "name": "横向广告3",
                            "type": 2,
                            "pic": "http://wang-mall-oss.oss-cn-beijing.aliyuncs.com/mall/images/2020-02-21/10fb0086cb21120c53248a3d8cc56dc5.webp",
                            "startTime": "2020-02-21 18:36:58",
                            "endTime": "2020-02-29 00:00:00",
                            "status": 1,
                            "url": "#",
                            "note": "电话手表",
                            "sort": 3
                        }
                    ]
                }
            },
            flash: {
                type: Object,
                default: {
                    "id": 1,
                    "startTime": "2020-02-14 00:00:00",
                    "endTime": "2020-02-29 23:00:00",
                    "status": 1,
                    "createTime": "2020-02-14 17:09:02",
                    "name": "18:00 场",
                    "products": [{
                        "id": 2,
                        "flashPromotionSessionId": 1,
                        "productId": 8,
                        "flashPromotionPrice": 3499,
                        "flashPromotionCount": 5,
                        "flashPromotionLimit": 1,
                        "sort": 0,
                        "product": {
                            "id": 8,
                            "productAttributeCategoryId": "",
                            "productCategoryId": "",
                            "name": "粗粮10",
                            "pic": "",
                            "productSn": "d251",
                            "deleteStatus": "",
                            "publishStatus": "",
                            "newStatus": "",
                            "recommandStatus": "",
                            "verifyStatus": "",
                            "sort": "",
                            "sale": "",
                            "price": 3999,
                            "promotionPrice": "",
                            "description": "",
                            "orginalPrice": "",
                            "stock": 50,
                            "unit": "",
                            "weight": "",
                            "servicesIds": "",
                            "keywords": "",
                            "albumPics": "",
                            "productCategoryName": "",
                            "detailHtml": ""
                        }
                    }]
                }
            },
            recommendProducts: {
                type: Array,
                default: () => {
                    return [
                        {
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
                        },
                        {
                            "id": 3,
                            "parentId": 1,
                            "name": "数码",
                            "level": 1,
                            "productCount": 0,
                            "navStatus": 1,
                            "showStatus": 1,
                            "sort": 0,
                            "icon": "",
                            "keywords": "",
                            "description": "",
                            "recommandStatus": 1,
                            "pmsProducts": []
                        }
                    ]
                }
            }
        },
        components: {
            FlashSale, BannerBox, BrickBox
        }
    }
</script>

<style lang="scss">
    .home-main {
        padding-top: 4px;
        padding-bottom: 12px;

        .container {

        }
    }
</style>