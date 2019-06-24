<template>

    <div class="a_leaderboard">
        <div class="a_lb_list_head a_lb_list_grap">
            <div>排名</div>
            <div>商家</div>
            <div>热度</div>
        </div>
        <div @click="goMerchantPage(index)" :class="{'a_lb_list_grap':index%2!==0}" v-for="(item,index) in boardList" class="a_lb_list">
            <div>{{index+1}}</div>
            <div class="a_lb_list_img" :style="'background-image:url('+item.logo+');'"></div>
            <div>{{item.name}}</div>
            <div class="a_lb_list_hot">{{item.hotNum}}</div>
        </div>


        <ActivityTabbar :page="1" :aid="$route.params.aid" />
    </div>

</template>

<script>
    import {listLeaderBorder} from "~/assets/services/activity";
    import ActivityTabbar from '~/components/activity/activityTabbar'

    export default {
        name: "index",
        data(){
            return {
                aid:this.$route.params.aid,
            }
        },
        async asyncData({params}){
            let res = await listLeaderBorder({
                aid:params.aid
            })
            return {
                boardList:res.data
            }
        },
        methods:{
            goMerchantPage(index){
                this.$router.push({name:'activity-aid-merchant-mid',params:{aid:this.aid,mid:this.boardList[index].id}})
            }
        },
        mounted() {
            console.log(this.boardList)
        },
        components:{
            ActivityTabbar
        }

    }
</script>

<style scoped>
    .a_leaderboard{
        width: 100%;
        position: fixed;
        background: white;
        height: 100%;
        overflow: scroll;
        padding-bottom:55px;
    }
    .a_lb_list{
        display: flex;
        align-items: center;
        padding:4px 15px;

    }
    .a_lb_list_img{
        height:50px;
        width:50px;
        background-size: cover;
        background-repeat: no-repeat;
        margin:0 15px;
    }
    .a_lb_list_hot{
        margin-left: auto;
        margin-right:20px;
        font-size:14px;
        font-weight:600;
        color:#fc6b79;
    }
    .a_lb_list_grap{
        background-color: #eee;
    }
    .a_lb_list_head{
        height:35px;
        display: flex;
        justify-content: space-between;
        padding:0 35px 0 15px;
        line-height: 35px;
    }
</style>