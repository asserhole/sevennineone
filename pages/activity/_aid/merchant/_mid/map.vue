<template>
    <div class="a-m-map">
        <TopBack />
        <BaiduMapCom />
    </div>
</template>

<script>
    import BaiduMapCom from '~/components/baidumap'
    import TopBack from '~/components/topback'
    export default {
        name: "map",
        components:{
            BaiduMapCom,TopBack
        }
    }
</script>

<style scoped>

</style>