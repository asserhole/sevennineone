<template>
    <div class="a-content-merchant clearfix">
        <ul class="clearfix">
            <li @click="$router.push({name:'activity-aid-merchant-mid',params:{mid:r.id,aid:aid}})" class="a-content-item clearfix" v-for="(r,i) in merchantList" :key="i">
                <span class="a-content-item_category">{{r.categoryName}}</span>
                <div class="a-content-item_img" :style="'background-image:url('+r.logo+');'">
                </div>
                <div class="a-content-merchant-info">
                    <p class="a-content-item_name">{{r.name}}</p>
                    <p class="a-content-item_express">联盟卡可体验次数：<span style="color:#fc6b79">{{r.experienceNum}}</span>次</p>
                </div>
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
            },
            aid:{
                default:''
            }
        }
    }
</script>

<style scoped>
    .a-content-item{
        background-color: white;
        position: relative;
        display: flex;
        padding:8px 0px;
        height:90px;
    }
    .a-content-item:after{
        content:'';
        height:1px;
        left:64px;
        width: 11rem;
        background-color:#eee;
        position: absolute;
        bottom:0px;
    }
    .a-content-item_img{
        padding-top:5px;
        padding-bottom:5px;
        width: 64px;
        height: 64px;
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
    .a-content-merchant-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>