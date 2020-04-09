<template>
    <div class="home-banner-box" >
        <a :href="banner.url" target="_blank">
            <img :src="banner.pic"
                 alt="">
        </a>
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
        props: {
            banner: {
                type: Object,
                default: () => {
                    return {
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
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .home-banner-box {
        display: block;
        height: 120px;
        width: 1226px;
        margin: 22px 0;
        overflow: hidden;

        a {
            img {
                width: 1226px;
                height: 120px;
            }
        }
    }
</style>