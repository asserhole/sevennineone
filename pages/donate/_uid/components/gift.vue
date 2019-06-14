<template>
    <div>
        <van-popup v-model="$store.state.giftBarShow" position="bottom" :overlay="false" class="gift-overlay">
            <p class="clearfix">
                <span class="pull-left">送给Ta</span>
                <i @click.stop="hideBar" class="pull-right fa fa-angle-double-down" aria-hidden="true"></i>
            </p>
            <van-swipe indicator-color="white">
                <van-swipe-item v-for="(item,index) in sliceGiftArr" :key="index">
                    <div @click="clickGift(i,index)" class="gift_item" v-for="(r,i) in item" :key="i">
                        <div :style="{backgroundImage: 'url(' + r.img + ')' }"></div>
                        <p>{{r.name}}</p>
                        <p>价值：￥{{r.worth/100}}</p>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </van-popup>
    </div>

</template>

<script>
    export default {
        name: "gift",
        props:{
            giftList:{
                default:[]
            }
        },
        data(){
            return {

            }
        },
        methods:{
            hideBar(){
                this.$store.commit('setGiftBarShowStatus',false)
            },
            clickGift(i,index){  // 点击礼物
                this.$store.commit('setSkuShowStatus',true)
                this.$emit('giftSend',this.sliceGiftArr[index][i])
            }
        },
        watch:{
        },
        computed:{
            sliceGiftArr(){ //分隔礼物列表
                let result = [];
                for(let i=0,len=this.giftList.length;i<len;i+=4){
                    result.push(this.giftList.slice(i,i+4));
                }
                return result
            }
        }
    }
</script>

<style scoped>
    .gift-overlay{
        position: fixed;
        bottom:0;
        background-color: rgba(51, 51, 51, 0.86);
        transition: all 0.3s linear;
        width: 100%;
        z-index: 1;
    }
    .gift-overlay>p{
        padding:5px 20px;
        color:white;
        border-bottom: 1px solid #ddd;
    }
    .gift_item{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .gift_item p{
        color:white;
        padding:3px;
    }
    .gift_item>div:first-child{
        height: 40px;
        width: 40px;
        background-repeat: no-repeat;
        background-size: 100%;
        display: inline-block;
    }
    .van-swipe-item{
        display: flex;
        flex-wrap: wrap;
    }
    .van-swipe-item>div{
        width: 25%;
        padding:2%;
        margin-bottom: 10px;
    }

</style>