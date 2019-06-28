<template>
    <!-- 用户个人中心首页 -->
    <div class="user-center">
        <div class="uc-head">
            <img :src="userinfo.avatar" />
            <h2>{{userinfo.nickname}}</h2>
        </div>
        <div class="uc-center">
            <ul class="uc-center-ul">
                <li @click="goPage('reply')">
                    <img :src="imgs[0]">
                    <span>我的报名</span>
                </li>
                <li @click="goPage('myappointment')">
                    <img :src="imgs[1]">
                    <span>预约试课</span>
                </li>
                <li @click="goPage('donate')">
                    <img :src="imgs[2]">
                    <span>助学记录</span>
                </li>
            </ul>
        </div>

        <van-cell style="margin-top:8px;" @click="merchantPage" title="商家中心" is-link />
        <van-cell @click="wxToast=true" title="微信咨询" is-link />
        <van-cell @click="phoneCall()" title="电话咨询" is-link />

        <ActivityTabbar :page="3" :aid="$route.params.aid"/>

        <!-- 微信咨询 -->
        <div class="wx_toast" v-if="wxToast">
            <div class="qr_code"><img src="http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/gift/qrcode.png" ></div>
            <p>请长按上方二维码加客服咨询</p>
            <div @click="wxToast=false" class="close_btn"></div>
        </div>
    </div>

</template>

<script>
    import {getCookie, setCookie} from "~/assets/utils/util";
    import {wechat_authorize_userinfo} from "~/assets/utils/wechat";
    import {accessToken, token} from "~/assets/services/user";
    import ActivityTabbar from '~/components/activity/activityTabbar'

    export default {
        name: "users",
        data(){
            return {
                aid:this.$route.params.aid,
                userinfo:{},
                wxToast: false,
                imgs: [
                    'http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/tu/baoming.png',
                    'http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/tu/yuyue.png',
                    'http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/tu/jilu.png'
                ]
            }
        },
        methods:{
            // 页面初始化，请求用户授权或拉取数据
            async pageInit(){
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
            },
            // 页面转跳
            goPage(name){
                this.$router.push({name:"activity-aid-users-"+name})
            },
            // 商家入驻
            merchantPage(){
                // 商家入驻
                if (this.userinfo.merchant === 0) {
                    this.$router.push({name: 'shop-join'})
                } else if (this.userinfo.merchant === 1) {
                    this.$router.push({name: 'business'})
                }
            },
            phoneCall() {
                window.location.href = 'tel://18682360850';
            }
        },
        mounted() {
            this.pageInit()
            console.log(this.$route.params.aid)
        },
        components:{
            ActivityTabbar
        }
    }
</script>

<style scoped>
    .uc-head{
        height:3.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top:.4rem;
        background:linear-gradient(135deg,rgba(47,181,228,1) 0%,rgba(123,96,239,1) 100%);
    }
    .uc-head img{
        height:1.16rem;
        width:1.16rem;
        border-radius:50%;
        border:.03rem solid rgba(255,255,255,.2);
    }
    .uc-head h2{
        font-weight: 100;
        font-size: .32rem;
        color: #fff;
        line-height: .42rem;
        margin-top: .2rem;
    }
    .uc-center-ul{
        display: flex;
        flex-wrap: wrap;
        width:100%;
        background-color: white;
        justify-content: space-around;
        padding: 10px;
    }
    .uc-center-ul li{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .uc-center-ul li img{
        height:.68rem;
        display: block;
        margin-bottom: .13rem;
    }
    .uc-center-ul li span {
        color: #333;
        font-size: .28rem;
        line-height: .37rem;
    }

    .wx_toast {
        background: #f5f5f5;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
    }

    .qr_code {
        width: 4.4rem;
        height: 5.86rem;
        border: 1px solid #0a0a0a;
        margin: 1.5rem auto 0;
        box-shadow: 1px 0 3px 1px  #c7c7c7;
    }

    .qr_code>img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .wx_toast>p {
        color: #171717;
        font-size: .26rem;
        text-align: center;
        line-height: 1.2rem;
    }

    .close_btn {
        width: .6rem;
        height: .6rem;
        border: .04rem solid #c3c3c3;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
    }

    .close_btn:before {
        content: '';
        width: .04rem;
        height: .3rem;
        background: #c3c3c3;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: .02rem;
        transform: rotate(45deg);
        transform-origin: center center;
    }

    .close_btn:after {
        content: '';
        width: .04rem;
        height: .3rem;
        background: #c3c3c3;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: .02rem;
        transform: rotate(-45deg);
        transform-origin: center center;
    }
</style>
<style>
    .van-cell{
        font-size: 12px;
    }
</style>