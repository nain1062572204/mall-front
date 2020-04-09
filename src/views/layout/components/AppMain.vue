<template>
    <section class="app-main">
        <router-view :key="$route.fullPath"/>
    </section>
</template>

<script>
    export default {
        name: "AppMain",
    }
</script>

<style scoped lang="scss">

</style>