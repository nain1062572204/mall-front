<template>
    <div class="search">
        <search-filter :related="searchResult.productRelatedInfo"></search-filter>
        <SearchResult :search-result="searchResult.products" :keyword="$route.query.keyword"></SearchResult>
    </div>
</template>

<script>
    import SearchFilter from './components/SearchFilter'
    import SearchResult from './components/SearchResult'
    import {simpleSearch} from "@/api/search"
    import {getRelate} from "@/api/search";

    const defaultSearchResult = {
        "products": {
            "pageNum": 0,
            "pageSize": 5,
            "totalPage": 1,
            "total": 1,
            "list": []
        },
        "productRelatedInfo": {
            "productCategoryNames": [],
            "productAttrs": []
        }
    }
    export default {
        name: "",
        data() {
            return {
                searchResult: Object.assign({}, defaultSearchResult)
            }
        },
        methods: {
            loadData(keyword) {

                let param = {
                    'keyword': keyword,
                    'pageNum': 1,
                    'pageSize': 20
                }
                //简单搜索
                simpleSearch(param).then((response) => {
                    this.searchResult = response.data
                })

            }
        },
        components: {
            SearchFilter, SearchResult
        },
        created() {
            this.loadData(this.$route.query.keyword)
        },
        /*watch: {
            '$route': function (to, from) {
                this.loadData(to.query.keyword)
            }
        }*/
    }
</script>

<style scoped>

</style>