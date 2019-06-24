<template>
    <div class="business_reply">
        <van-cell style="margin-bottom:8px;" title="报名管理" />

        <van-cell>
            <div class="br-head">
                <span>报名人数：{{total}}</span>
                <span>报名总收入：{{totalMoney}}</span>
            </div>
        </van-cell>


        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="br-item-wrap clearfix">
                <div @click="$router.push({name:'donate-uid',params:{uid:item.id}})" class="br-item" v-for="(item,index) in replyList">
                    <span class="br-item-img" :style="{backgroundImage: 'url(' + item.imageList[0] + ')' }"></span>
                    <div class="br-item-info">
                        <p>
                            {{item.childName}}
                        </p>
                        <mt-progress :value="Math.round((item.paidFee/item.totalFee)*100)">
                            <div slot="start">￥{{item.paidFee/100}}</div>
                            <div slot="end">￥{{item.totalFee/100}}</div>
                        </mt-progress>
                        <p>{{formatDate(item.createTime)}}</p>
                        <p>联系方式：{{item.mobile}}</p>
                    </div>
                </div>
            </div>
        </van-list>


    </div>
</template>

<script>
    import {listMerchantReply} from "../../assets/services/reply";

    export default {
        name: "reply",
        data(){
            return {
                current:1,
                rowCount:10,
                total:0,
                totalMoney:0,
                replyList:[],
                loading:false
            }
        },
        methods:{
            async listMerchantReply(){
                let res = await listMerchantReply({
                    current:this.current,
                    rowCount:this.rowCount
                })
                this.total = res.data.total
                this.totalMoney = res.data.totalMoney?res.data.totalMoney:0
                this.replyList = res.data.list
            },
            onLoad(){ // 滚动加载
                if(!this.finished){
                    this.current +=1
                    this.listMerchantReply()
                }
            },
            formatDate (val) {
                var padDate=function(va){
                    va=va<10?'0'+va:va;
                    return va
                }
                var value=new Date(val);
                var year=value.getFullYear();
                var month=padDate(value.getMonth()+1);
                var day=padDate(value.getDate());
                var hour=padDate(value.getHours());
                var minutes=padDate(value.getMinutes());
                var seconds=padDate(value.getSeconds());
                return year+'-'+month+'-'+day+' '+hour+':'+minutes;
                //+':'+seconds
            }
        },
        mounted() {
            this.listMerchantReply()
        },
        computed:{
            finished(){
                return this.replyList.length === this.total && !this.loading
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
    .br-head{
        display: flex;
        justify-content: space-around;
    }
    .br-item{
        padding:10px 15px;
        border-bottom:1px solid #eee;
        display: flex;
    }
    .br-item-img{
        display: inline-block;
        width:90px;
        height:120px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .br-item-wrap{
        background-color: white;
    }
    .br-item-info{
        width:150px;
        margin-left:20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>