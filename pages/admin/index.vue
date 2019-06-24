<template>
    <!-- 后台管理页面 -->
    <div class="admin">

        <van-cell style="margin-bottom:8px;" title="后台管理" />

        <van-cell @click="$router.push({name:'admin-merchant'})" title="商家入驻审核" is-link />
        <van-cell @click="$router.push({name:'admin-activity'})" title="活动审核" is-link />

    </div>
</template>

<script>


    export default {
        name: "index",

        data(){
            return {

            }
        },

    }
</script>

<style scoped>

</style>
<style>
    .van-cell{
        font-size:12px;
    }
</style>