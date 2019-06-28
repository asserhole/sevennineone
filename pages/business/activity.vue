<template>
    <!--我的活动页-->
    <div class="my-activity">
        <topback />
        <van-cell title="我发布活动" style="margin-bottom:10px;" />
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >

        </van-list>


    </div>

</template>

<script>
    import Topback from "../../components/topback";
    export default {
        name: "activity",
        data(){
            return {
                loading:false,
                activityList:[],
                current:1,
                total:0,
                rowCount:10,

            }
        },
        methods:{
            async listMyActivity(){

            },
            onLoad(){

            }
        },
        computed:{
            finished(){
                return this.activityList.length === this.total && !this.loading
            }
        },
        components: {Topback}
    }
</script>

<style scoped>

</style>