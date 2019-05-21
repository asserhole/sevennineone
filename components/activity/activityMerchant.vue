<template>
    <div class="a-content-merchant clearfix">
        <ul class="clearfix">
            <li @click="" class="a-content-item clearfix" v-for="(r,i) in merchantList" :key="i">
                <span class="a-content-item_category">{{r.categoryName}}</span>
                <div class="a-content-item_img">
                    <img :src="r.logo" />
                </div>
                <p class="a-content-item_name">{{r.name}}</p>
                <p class="a-content-item_express">联盟卡可体验次数：<span style="color:#fc6b79">{{r.experienceNum}}</span>次</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "activityMerchant",
        props:{
            merchantList:{
                default:[]
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    .a-content-item{
        display: inline-block;
        float:left;
        width:47%;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left:2%;
        position: relative;
        padding: 10px;
        margin-bottom: 2%;
    }
    .a-content-item_img{
        padding-top:5px;
        padding-bottom:5px;
    }
    .a-content-item p{
        padding-left:10px;
    }
    .a-content-item_img img{
        margin:0 auto;
    }
    .a-content-item_category{
        position: absolute;
        top:3px;
        background-color: rgba(252, 107, 121, 0.51);
        color:white;
        padding:3px 10px;
        border-radius: 10px;
        right:3px;
    }
    .a-content-item_name{
        font-weight:600;
    }
    .a-content-item_express{
        color:#999;
    }
</style>