<template>
    <div id="activityIndex">
        <div class="a-head">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/4f80a793ca9719f2446fa2d34dbe1a9a.jpg" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/df8169bccda1cb448bc65b782e52627e.png" />
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/da08764a8a4175aa3ff36d49f7f65dc2.png" />
                </mt-swipe-item>
            </mt-swipe>

        </div>
        <div class="a-content-bg clearfix">
            <div class="a-content-warp clearfix">
                <div class="a-title">
                    <p>{{activityPO.name}}</p>
                    <div class="a-desc">
                        <p class="a-desc-origin">
                            <span>此活动由<span style="color:#fc6b79">hxy</span>发起:</span>
                            <span @click="addActivity" class="add-activity">发起活动</span>
                        </p>
                        <p  style="text-indent:20px;">{{activityPO.poster}}</p>
                    </div>
                </div>
                <div class="a-content">
                    <p class="shoplist-title">活动介绍</p>
                    <div>
                        {{activityPO.description}}
                        <br />
                    </div>
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
                    <p class="shoplist-title">活动商家</p>
                    <ActivityMerchant :merchantList="activityPO.merchantList" :aid="$route.params.aid"/>
                    <span @click="merchantJoin" class="a-content-join">我是商家，我想出现在这里</span>
                </div>
            </div>
        </div>

        <ActivityTabbar :page="0" :aid="$route.params.aid"/>
    </div>
</template>

<script>
    import ActivityTabbar from '~/components/activity/activityTabbar'
    import ActivityMerchant from '~/components/activity/activityMerchant'
    import TimeDown from '~/components/activity/timeDown'
    import { getActivityById } from '~/assets/services/activity'
    import {wechat_authorize_userinfo, wxJssdkInit} from "../../../assets/utils/wechat";
    import {getCookie, setCookie} from "../../../assets/utils/util";
    import {accessToken, token} from "../../../assets/services/user";
    import {getMerchantJoinInfo} from "../../../assets/services/shopping";
    import {getExistsByAidAndMid} from "../../../assets/services/activity";

    export default {
        name: "index",
        data(){
            return {
                userinfo:{},
                aid:this.$route.params.aid
            }
        },
        async asyncData({params}){
            const res = await getActivityById({
                id:params.aid
            })
            return {
                activityPO:res.data
            }
        },
        methods:{
            timeEndHandler(){ // 倒计时结束事件

            },
            // 商家加入活动
            async merchantJoin(){
                let localToken = getCookie("token")
                let code = this.$route.query.code
                let state = this.$route.query.state
                if(!localToken){
                    if (!code) {
                        wechat_authorize_userinfo(window.location.href)
                    }
                    if (code) {
                        let res = await accessToken({
                            code: code,
                            state: state
                        });
                        this.userinfo = JSON.parse(res.data.user)
                        if(res.data.openid){
                            setCookie('token', res.data.openid, 7)
                            this.$store.commit('setOpenid',res.data.openid)
                        }
                    }
                }else{
                    let res = await token()
                    this.userinfo = JSON.parse(res.data)
                }

                let merchantRes = await getMerchantJoinInfo()
                if(merchantRes.data){
                    let exists = await getExistsByAidAndMid({
                        aid:this.aid
                    })
                    if(exists.data){
                        this.$toast({
                            message: '您已加入活动',
                            duration: 1500
                        })
                    }else{
                        if(merchantRes.data.auditStatus === 2){ // 已经是商家了，直接填写数据加入活动
                            this.$router.push({name:'activity-aid-join',params:{aid:this.aid,status:1}})
                        }else if(merchantRes.data.auditStatus === 1){ // 正在审核中的商家
                            this.$dialog.confirm({
                                title: '请确认',
                                message: '您提交的商家入驻数据正在审核中，若加入活动需等待审核通过才能生效~'
                            }).then(() => {
                                this.$router.push({name:'activity-aid-join',params:{aid:this.aid,status:0}})
                            })
                        }else if(merchantRes.data.auditStatus === 0){ // 未入驻的商家
                            this.$dialog.confirm({
                                title: '请确认',
                                message: '您还没有成为商家，现在就去成为商家吧~'
                            }).then(() => {
                                this.$router.push({name:'shop-join'})
                            })
                        }
                    }
                }else{
                    this.$dialog.confirm({
                        title: '请确认',
                        message: '您还没有成为商家，现在就去成为商家吧~'
                    }).then(() => {
                        this.$router.push({name:'shop-join'})
                    })
                }

            },
            // 发起活动
            addActivity(){
                this.$router.push({name:'activity-add'})
            }
        },
        components:{
            ActivityTabbar,TimeDown,ActivityMerchant
        },
        mounted() {
            var that = this
            wxJssdkInit(window.location.href,
                [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                ],
                wx => {
                    wx.onMenuShareTimeline({
                        title: that.activityPO.name, // 分享标题
                        link: 'window.location.href', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/c31514038096dc04c14d51d87aed06ee.png', // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    })
                    wx.onMenuShareAppMessage({
                        title: that.activityPO.name, // 分享标题
                        desc: '99元享抵扣学费、体验活动所有商家课程好礼', // 分享描述
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/c31514038096dc04c14d51d87aed06ee.png', // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        }
                    });
                })
        }
    }
</script>

<style scoped>
    .a-head{
        width:100%;
        height:180px;
        overflow: hidden;
    }
    .a-head img{
        width:100%;
        height:190px;
    }
    .a-content-bg{
        width:100%;
        background-size: 100%;
        position: relative;
        box-sizing:border-box;
        padding-bottom:55px;
        background: linear-gradient(to bottom, pink, white);
    }
    .a-content-warp>div{
        margin:5px 20px;
        background-color: white;
    }
    .a-title{
        padding:15px;
    }

    .a-title>p{
        text-align: left;
        display: inline-block;
        z-index:12;
        font-size:20px;
    }
    .a-time{

    }
    .a-time>div{
        font-size:20px;
    }
    .a-time>div svg{
        width:24px;
        margin-left:15px;
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
        padding:15px;
    }
    .a-content p{
        position: relative;
        padding-left:15px;
        margin-bottom:10px;
    }
    .a-content p:before{
        content:'';
        position: absolute;
        width:3px;
        height:100%;
        left:0;
        top:0;
        background-color: #999;
    }
    .a-desc{
        z-index:13;
        color:black;
        background-color: white;
        line-height: 20px;
    }
    .shoplist-title{
        text-align: left;
    }
    .a-content-join{
        color:#999;
        text-decoration: underline;
        margin-top:15px;
        display: block;
        text-align: right;
    }
    .a-desc-origin{
        display: flex;
        justify-content: space-between;
    }
    .add-activity{
        color:#999;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        padding:0 5px;
    }
</style>
<style>
    .van-dialog__confirm, .van-dialog__confirm:active{
        color:#fc6b79;
    }
</style>