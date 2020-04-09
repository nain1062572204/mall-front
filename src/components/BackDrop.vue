<template>
    <div class="backdrop" v-show="hide">

    </div>
</template>

<script>
    export default {
        name: "BackDrop",
        props: {
            hide: false
        }
    }
</script>

<style lang="scss">
    .backdrop {
        position: fixed !important;
        _position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
        width: 100%;
        height: 100%;
        transition: opacity .4s linear, top .4s ease-out;
        opacity: 0.5;
    }
</style>