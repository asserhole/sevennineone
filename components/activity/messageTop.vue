<template>
    <van-popup v-model="show" position="top" :overlay="true" :overlay-class="overlay_msg_top">
        {{msg}}
    </van-popup>
</template>

<script>
    export default {
        name: "messageTop",
        props:{
            msg:{
                default:''
            },
            show:{
                default:false
            }
        },
        data(){
            return {
                overlay_msg_top:'overlay_msg_top'
            }
        }
    }
</script>

<style scoped>
    #popup-message-top p{
        text-align: center;
        line-height: 40px;
    }
    .overlay_msg_top{
        height:40px;
        background-color: #fc6b79;
        color:white;
        z-index:2;
        position: absolute;
        top:0;
        width:100%;
    }
</style>