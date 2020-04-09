<template>
    <div>
        <top-bar></top-bar>
        <app-main></app-main>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import {AppMain, TopBar, BottomBar} from './components'

    export default {
        name: "",
        components: {AppMain, TopBar, BottomBar},
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },

    }
</script>

<style>


</style>