<template>
    <!-- 搜索页面 -->
    <div class="activity_search">
        <topback />

        <van-search
                v-model="word"
                placeholder="请输入商家或学生"
                show-action
                @search="onSearch"
        >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>

        <div>

        </div>
    </div>


</template>

<script>
    import Topback from "../../../../components/topback";
    export default {
        name: "index",
        data(){
            return {
                word:this.$route.query.word
            }
        },
        methods:{
            onSearch(){
                console.log(this.word)
            }
        },
        components: {Topback}
    }
</script>

<style scoped>

</style>