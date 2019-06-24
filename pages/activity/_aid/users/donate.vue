<template>
    <div class="uc-donate">
        <topback />
        <van-cell title="我的报名" />
        <van-dropdown-menu>
            <van-dropdown-item @change="optionChange" v-model="timeOption" :options="timeOptionArr" />
            <van-dropdown-item @change="optionChange" v-model="orderOption" :options="orderOptionArr" />
        </van-dropdown-menu>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="uc-reply_item" @click="detail(index)" v-for="(item,index) in donateList">
                <div class="uc-reply_item_info">
                    <div class="uc-donate-img" :style="'background-image:url('+item.giftImg+');'"></div>
                    <div class="uc-donate-info">
                        <p class="gray">{{item.createTime}}</p>
                        <p>您为<span class="pink">{{item.childName}}</span>送出了<span class="pink">{{item.giftNum}}</span>个<span class="pink">{{item.giftName}}</span> </p>
                        <p>本次支付：<i class="fa fa-jpy" aria-hidden="true"></i>{{item.totalFee / 100}}</p>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import topback from "~/components/topback"
    import {listDonateListByUser} from "~/assets/services/reply";

    export default {
        name: "donate",
        data(){
            return {
                current:1,
                total:0,
                rowCount:10,
                donateList:[],
                loading:false,
                timeOption:0,  // 时间查看
                orderOption:0, // 排序查看
                timeOptionArr: [
                    { text: '全部', value: 0 },
                    { text: '7天内', value: 1 },
                    { text: '30天内', value: 2 },
                    { text: '今年', value: 3 }
                ],
                orderOptionArr: [
                    { text: '按时间（默认）', value: 0 },
                    { text: '按价值', value: 1 }
                ]
            }
        },
        methods:{
            async list(){
                let res = await listDonateListByUser(
                    {
                        current:this.current,
                        rowCount:this.rowCount,
                        timeOption:this.timeOption,
                        orderOption:this.orderOption
                    }
                );
                this.loading = false
                this.donateList = this.donateList.concat(res.data.list)
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
                this.$router.push({name:'donate-uid',params:{uid:this.donateList[index].replyId}})
            },
            optionChange(){
                this.donateList = []
                this.total = 0
                this.list()
            }
        },
        mounted(){
            this.list()
        },
        computed:{
            finished(){
                return this.donateList.length === this.total && !this.loading
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
    .uc-reply_item_info{
        display: flex;
        padding-left:10px;
    }
    .uc-donate-img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border:1px solid #fc6b79;
    }
    .uc-donate-info{
        display: flex;
        flex-direction: column;
        margin-left:15px;
        justify-content: space-around;
    }
</style>
<style>
    .uc-donate .uc-reply_item{
        display: flex;
        padding:10px;
        margin:8px 20px;
        background-color: white;
    }
    .uc-donate .van-dropdown-menu__title{
        font-size:12px;
    }
    .uc-donate .van-dropdown-menu{
        height:43px;
    }
    .uc-donate .van-cell{
        font-size:12px;
    }
    .uc-donate .van-cell:not(:last-child)::after{
        border-bottom:none
    }
</style>