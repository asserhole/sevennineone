<template>
    <div id="activityIndex">
        <div class="a-head">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/b43fcc39412c17ff7c1a837df0a2962b.png" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/b43fcc39412c17ff7c1a837df0a2962b.png" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/b43fcc39412c17ff7c1a837df0a2962b.png" />
                </mt-swipe-item>
            </mt-swipe>

        </div>
        <div class="a-content-bg clearfix">
            <div class="a-content-warp clearfix">
                <div class="a-title">
                    <p>{{activityPO.name}}</p>
                </div>
                <div class="a-time">
                    <div class="clearfix">
                        <svg t="1558171781655" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="5479" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="64" height="64">
                            <defs>
                                <style type="text/css"></style>
                            </defs>
                            <path d="M449.59694 552.460488c-2.589471 0-5.210911-0.319688-7.800382-0.959063C313.729623 519.308862 224.280976 404.668816 224.280976 272.733659L224.280976 160.842927c0-17.646767 14.322014-31.96878 31.96878-31.96878s31.96878 14.322014 31.96878 31.96878l0 111.890732c0 102.587817 69.564066 191.716777 169.114849 216.748332 17.134267 4.315785 27.52512 21.674833 23.241303 38.778131C476.930248 542.805916 463.886985 552.460488 449.59694 552.460488L449.59694 552.460488zM574.40306 552.460488c-14.290045 0-27.301339-9.654572-30.977748-24.168398-4.315785-17.134267 6.074068-34.493315 23.208336-38.777132C666.217397 464.450435 735.781463 375.321475 735.781463 272.733659L735.781463 160.842927c0-17.646767 14.290045-31.96878 31.96878-31.96878s31.96878 14.322014 31.96878 31.96878l0 111.890732c0 131.935157-89.448648 246.575204-217.483614 278.767766C579.613971 552.1408 576.992531 552.460488 574.40306 552.460488zM767.750244 896.124878c-17.678736 0-31.96878-14.322014-31.96878-31.96878l0-95.906341c0-102.619785-69.564066-191.748745-169.114849-216.748332-17.134267-4.283817-27.52512-21.674833-23.241303-38.778131 4.347754-17.134267 21.930583-27.397245 38.777132-23.208336C710.270377 521.642583 799.719024 636.28263 799.719024 768.249756l0 95.906341C799.719024 881.802864 785.42898 896.124878 767.750244 896.124878zM256.249756 896.124878c-17.646767 0-31.96878-14.322014-31.96878-31.96878l0-95.906341c0-131.967126 89.448648-246.607173 217.516581-278.767766 17.167235-4.18791 34.461346 6.074068 38.777132 23.209335 4.315785 17.134267-6.074068 34.493315-23.241303 38.777132C357.750634 576.501011 288.218537 665.629971 288.218537 768.249756l0 95.906341C288.218537 881.802864 273.896523 896.124878 256.249756 896.124878zM863.656585 192.811707 160.343415 192.811707c-17.646767 0-31.96878-14.322014-31.96878-31.96878L128.374634 32.967805c0-17.646767 14.322014-31.96878 31.96878-31.96878l703.313171 0c17.678736 0 31.96878 14.322014 31.96878 31.96878l0 127.875122C895.625366 178.489694 881.335321 192.811707 863.656585 192.811707zM192.312195 128.874146l639.37561 0L831.687805 64.936585 192.312195 64.936585 192.312195 128.874146zM863.656585 1024 160.343415 1024c-17.646767 0-31.96878-14.322014-31.96878-31.96878L128.374634 864.156098c0-17.646767 14.322014-31.96878 31.96878-31.96878l703.313171 0c17.678736 0 31.96878 14.322014 31.96878 31.96878l0 127.875122C895.625366 1009.677986 881.335321 1024 863.656585 1024zM192.312195 960.062439l639.37561 0 0-63.937561L192.312195 896.124878 192.312195 960.062439z"
                                  p-id="5480" fill="#fc6b79"></path>
                        </svg>
                        <TimeDown :time-end="timeEndHandler" :endTime="activityPO.endDate" />
                    </div>
                </div>
                <div class="a-content">
                    <div class="a-desc">
                        <p>此活动由<span style="color:#fc6b79">hxy</span>发起:</p>
                        <p style="text-indent:20px;">{{activityPO.poster}}</p>
                    </div>
                    <p class="shoplist-title">—— 活动商家 ——</p>
                    <ActivityMerchant :merchantList="activityPO.merchantList "/>
                </div>
            </div>
        </div>

        <ActivityTabbar :page="0" :aid="aid"/>
    </div>
</template>

<script>
    import ActivityTabbar from '~/components/activity/activityTabbar'
    import ActivityMerchant from '~/components/activity/activityMerchant'
    import TimeDown from '~/components/activity/timeDown'
    import { getActivityById } from '~/assets/services/activity'

    export default {
        name: "index",
        data(){
            return {
                aid:null,
            }
        },
        async asyncData({query}){
            const res = await getActivityById({
                id:query.aid
            })
            return {
                activityPO:res.data
            }
        },
        methods:{
            timeEndHandler(){ // 倒计时结束事件

            }
        },
        components:{
            ActivityTabbar,TimeDown,ActivityMerchant
        },
        mounted() {
            this.aid = this.$route.query.aid
            console.log(this.activityPO)
        }
    }
</script>

<style scoped>
    .a-head{
        width:100%;
        height:150px;
        overflow: hidden;
    }
    .a-head img{
        width:100%;
        height:150px;
    }
    .a-content-bg{
        width:100%;
        background-image: url("https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/dbd1966fb2504c91744be1e1c18fdfe4.png?x-oss-process=image/sharpen,100/blur,r_4,s_3/bright,50");
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;
        box-sizing:border-box;
        padding-bottom:55px;
        /* 作为默认  background: linear-gradient(to bottom, pink, white);*/
    }
    .a-title{
        width:100%;
        padding-top:20px;
        padding-left:20px;

    }
    .a-title>p{
        text-align: left;
        display: inline-block;
        z-index:12;
        background-color: #08080808;
        font-size:20px;
        color:white;
    }
    .a-time{
        width:100%;
        padding:20px;
        top:60px;
    }
    .a-time>div{
        background-color: white;
        border-radius: 20px;
        font-size:20px;
    }
    .a-time>div svg{
        width:24px;
        margin-left:20px;
        float:left;
    }
    .a-time>div span{
        float:left;
        line-height: 64px;
        margin-left:15px;
    }
    .a-content-warp{
        left: 0;
        top: 0;
        width: 100%;
        /*background-image: linear-gradient(to bottom , rgba(255, 255, 255, 0), rgb(251, 251, 251));*/
    }
    .a-content{
        background-color: white;
        border-radius: 5px;
        margin:5px 5px;
    }
    .a-desc{
        z-index:13;
        color:black;
        background-color: white;
        padding:5px 20px;
        font-size:14px;
        line-height: 20px;
    }
    .shoplist-title{
        text-align: center;
        font-size:14px;
        margin:15px 0;
    }

</style>