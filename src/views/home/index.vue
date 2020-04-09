<template>
    <div>
        <carousel :carousels="homeContent.advertises.carousel" :promos="homeContent.advertises.promo"></carousel>
        <page-main
                :flash="homeContent.flashPromotion"
                :banners="homeContent.advertises.banner"
                :recommend-products="homeContent.recommendProducts"
        ></page-main>
    </div>
</template>

<script>
    import Carousel from './carousel/index'
    import PageMain from './page-main/index'
    import {content} from '@/api/home'

    const defaultHomeContent = {
        "advertises": {
            "carousel": [
                {
                    "id": null,
                    "name": null,
                    "type": null,
                    "pic": null,
                    "startTime": null,
                    "endTime": null,
                    "status": null,
                    "url": null,
                    "note": null,
                    "sort": null,
                }
            ],
            "promo": [
                {
                    "id": null,
                    "name": null,
                    "type": null,
                    "pic": null,
                    "startTime": null,
                    "endTime": null,
                    "status": null,
                    "url": null,
                    "note": null,
                    "sort": null
                }
            ],
            "banner": [
                {
                    "id": null,
                    "name": null,
                    "type": null,
                    "pic": null,
                    "startTime": null,
                    "endTime": null,
                    "status": null,
                    "url": null,
                    "note": null,
                    "sort": null,
                }
            ]
        },
        "recommendProducts": [
            {
                "id": null,
                "parentId": null,
                "name": null,
                "level": null,
                "productCount": null,
                "navStatus": null,
                "showStatus": null,
                "sort": null,
                "icon": null,
                "keywords": null,
                "description": null,
                "recommandStatus": null,
                "pmsProducts": [{
                    "id": null,
                    "productAttributeCategoryId": null,
                    "productCategoryId": null,
                    "name": null,
                    "pic": null,
                    "productSn": null,
                    "deleteStatus": null,
                    "publishStatus": null,
                    "newStatus": null,
                    "recommandStatus": null,
                    "verifyStatus": null,
                    "sort": null,
                    "sale": null,
                    "price": null,
                    "promotionPrice": null,
                    "description": null,
                    "orginalPrice": null,
                    "stock": null,
                    "unit": null,
                    "weight": null,
                    "servicesIds": null,
                    "keywords": null,
                    "albumPics": null,
                    "productCategoryName": null,
                    "detailHtml": null,
                }]
            }
        ],
        "flashPromotion": {
            "id": null,
            "startTime": null,
            "endTime": null,
            "status": null,
            "createTime": null,
            "name": null,
            "products": [{
                "id": null,
                "flashPromotionSessionId": null,
                "productId": null,
                "flashPromotionPrice": null,
                "flashPromotionCount": null,
                "flashPromotionLimit": null,
                "sort": null,
                "product": {
                    "id": null,
                    "productAttributeCategoryId": null,
                    "productCategoryId": null,
                    "name": null,
                    "pic": null,
                    "productSn": null,
                    "deleteStatus": null,
                    "publishStatus": null,
                    "newStatus": null,
                    "recommandStatus": null,
                    "verifyStatus": null,
                    "sort": null,
                    "sale": null,
                    "price": null,
                    "promotionPrice": null,
                    "description": null,
                    "orginalPrice": null,
                    "stock": null,
                    "unit": null,
                    "weight": null,
                    "servicesIds": null,
                    "keywords": null,
                    "albumPics": null,
                    "productCategoryName": null,
                    "detailHtml": null,
                }
            }]
        }
    }
    export default {
        name: "",
        data() {
            return {
                homeContent: Object.assign({}, defaultHomeContent),
            }
        },
        components: {
            Carousel, PageMain
        },
        methods: {
            getContent() {
                content().then(response => {
                    this.homeContent = response.data;
                })
            }
        },
        created() {
            document.title = "小鱼商城"
            this.getContent();
        }

    }
</script>

<style scoped>

</style>