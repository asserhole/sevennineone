<template>
    <baidu-map class="baidu-map" center="北京" ak="QPzy1CEBekWlV0ud7PW5gR4XOcrHuuzI"></baidu-map>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    export default {
        name: "baidumap",
        components:{
            BaiduMap
        }
    }
</script>

<style scoped>
    .baidu-map{
        width:100%;
        height:300px;
    }
</style>