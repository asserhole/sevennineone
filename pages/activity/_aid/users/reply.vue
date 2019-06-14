<template>
    <div class="uc-reply">
        <topback />
        <van-cell title="我的报名" />
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="uc-reply_item" @click="detail(index)" v-for="(item,index) in replyList">
                <img :src="item.imageList[0]" />
                <div class="uc-reply_item_info">
                    <mt-badge size="small" color="#fc6b79">{{item.childName}}</mt-badge>
                    <p><span class="gray">报名时间&nbsp;:&nbsp;</span>{{item.createTime | formatDate}}</p>
                    <mt-progress :value="Math.round((item.paidFee/item.totalFee)*100)">
                        <div slot="start">￥{{item.paidFee/100}}</div>
                        <div slot="end">￥{{item.totalFee/100}}</div>
                    </mt-progress>
                    <p class="gray">机构&nbsp;:&nbsp;{{item.merchantName}}</p>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import topback from "~/components/topback"
    import {listReplyByUser} from "~/assets/services/reply";

    export default {
        name: "reply",
        data(){
            return {
                current:1,
                total:0,
                rowCount:10,
                replyList:[],
                loading:false,
            }
        },
        methods:{
            async list(){
                let res = await listReplyByUser(
                    {
                        current:this.current,
                        rowCount:this.rowCount
                    }
                );
                this.loading = false
                this.replyList = this.replyList.concat(res.data.list)
                this.total = res.data.total
            },
            onLoad(){ // 滚动加载
                if(!this.finished){
                    this.current +=1
                    this.list()
                }

            },
            // 点击报名查看详情
            detail(index){
                this.$router.push({name:'donate-uid',params:{uid:this.replyList[index].id}})
            }
        },
        mounted(){
            this.list()
        },
        computed:{
            finished(){
                return this.replyList.length === this.total && !this.loading
            }
        },
        components:{
            topback
        }
    }
</script>

<style scoped>

    .uc-reply_item img{
        width:90px;
        height:120px;
        border-radius: 10px;
    }
    .uc_reply_head{
        margin:15px 20px;
        position: relative;
        padding-left:20px;
    }
    .uc_reply_head:before{
        content:'';
        position: absolute;
        width:3px;
        height:100%;
        background-color: #2cbe4e;
        left:5px;
    }
    .gray{
        color:#999;
    }
    .pink{
        color:#fc6b79;
    }
    .bold{
        font-weight: 600;
    }
    .uc-reply_item_info .mt-progress div:first-child{
        margin-right:5px;
        color:#999;
    }
    .uc-reply_item_info .mt-progress div:last-child{
        margin-left:5px;
        color:#999;
    }
</style>
<style>
    .uc-reply .uc-reply_item{
        display: flex;
        padding:10px;
        margin:8px 20px;
        background-color: white;
    }
    .uc-reply .uc-reply_item_info{
        padding-left:10px;
    }
    .uc-reply .uc-reply_item_info p{
        margin: 10px 0 3px 0;
    }
    .uc-reply .van-cell{
        font-size:12px;
    }
</style>