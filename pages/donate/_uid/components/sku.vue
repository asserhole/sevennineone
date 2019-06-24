<template>
    <!-- 送礼付款页面 -->
    <van-popup v-model="$store.state.skuShow" position="bottom" :overlay="true" class="sku-overlay">
        <div class="sku-head clearfix">
            <div class="sku-background"></div>
            <span class="sku-head-img">
                <img class="" :src="gift.img" />
            </span>
            <div class="sku-head-info">
                <p>{{gift.name}}</p>
                <p><i class="fa fa-jpy" aria-hidden="true"></i>{{gift.worth/100}}</p>
            </div>
            <i @click="hideSku" class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="sku_num">
            <span>数量</span>
            <van-stepper v-model="skuNum" />
        </div>
        <button @click="pay" class="pay_button">{{'需支付'+skuNum * gift.worth/100+'元'}}</button>
    </van-popup>


</template>

<script>
    export default {
        name: "sku",
        props:{
            gift:{
                default:null
            }
        },
        data(){
            return {
                skuNum:1
            }
        },
        methods:{
            hideSku(){
                this.$store.commit('setSkuShowStatus',false)
            },
            pay(){ //支付方法
                this.$emit('payConfirm',{
                    giftId:this.gift.id,
                    giftNum:this.skuNum,
                    totalFee:this.gift.worth * this.skuNum
                })

            }
        }
    }
</script>

<style scoped>
    .sku-head{
        height:80px;
        padding-bottom:20px;
        border-bottom:1px solid #eee;
    }
    .sku-background{
        height:12px;
        background-color: rgba(0, 0, 0, 0.7);
    }
    .sku-head-img{
        width:64px;
        height:64px;
        position: absolute;
        left:20px;
        top:0;
        background-color: #eee;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    .sku-head-info{
        display: inline-block;
        position: absolute;
        left: 100px;
        margin-top:10px;
    }
    .sku-head-info p:last-child{
        color:#fc6b79;
        margin-top:5px;
    }
    .sku-overlay{
        padding:0!important;
    }
    .pay_button{
        border:none;
        color:white;
        background-color: #fc6b79;
        display: block;
        width:100%;
        height:40px;
    }
    .sku-head .fa-times{
        color:#999;
        font-size: 20px;
        position: absolute;
        right:20px;
        margin-top:10px;
    }
    .sku_num{
        display: flex;
        justify-content: space-between;
        padding:5px 20px;
        align-items: center;
    }
</style>