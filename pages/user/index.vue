<template>
    <div id="user">
        <div class="uc-head">
            <img :src="userinfo.avatar" />
            <h2>{{userinfo.nickname}}</h2>
        </div>
        <div class="user-func clearfix">
            <ul>
                <li @click="goBindPhonePage" class="user-func-li">
                    <div class="user-func_menu_svg">
                        <img src="http://gaif.oss-cn-hangzhou.aliyuncs.com/avatar/mine/shouji.png">
                    </div>
                    <div>
                        <span>手机号绑定</span>
                    </div>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </li>
                <li class="user-func-li" @click="merchantPage">
                    <div class="user-func_menu_svg1">
                        <img src="http://gaif.oss-cn-hangzhou.aliyuncs.com/avatar/mine/ruzhu.png">
                    </div>
                    <div>
                        <span>{{merchantText}}</span>
                    </div>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </li>
                <li class="user-func-li" @click="addActivity">
                    <div class="user-func_menu_svg1">
                        <svg t="1561647654507" class="icon" viewBox="0 0 1037 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1973" width="64" height="64"><path d="M146.526774 102.974561a30.723356 30.723356 0 0 1 13.842392 3.376192l742.762451 373.744561a29.372879 29.372879 0 0 1 0 53.00623l-742.762451 373.74456a30.723356 30.723356 0 0 1-13.842392 3.376193 30.048117 30.048117 0 0 1-30.385736-29.710498l61.784331-370.030748L116.478657 132.685059a30.048117 30.048117 0 0 1 30.385737-29.710498m0-101.285789a135.047718 135.047718 0 0 0-135.047719 132.684383 101.285789 101.285789 0 0 0 0 16.205726l59.083377 361.252647L12.491914 863.293215a101.285789 101.285789 0 0 0 0 16.543346 135.047718 135.047718 0 0 0 135.047718 132.684383 138.423911 138.423911 0 0 0 61.784332-14.855249l742.762451-373.744561a131.333906 131.333906 0 0 0 0-236.333507L208.648725 14.518305a138.423911 138.423911 0 0 0-62.121951-14.51763z" fill="#fc6b79" p-id="1974"></path><path d="M886.250652 548.969651H342.008347a50.642894 50.642894 0 1 1 0-101.285789h544.242305a50.642894 50.642894 0 0 1 0 101.285789z" fill="#fc6b79" p-id="1975"></path></svg>
                    </div>
                    <div>
                        <span>发布活动</span>
                    </div>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </li>
            </ul>
        </div>
        <div class="user-adv"></div>
        <Tabbar page="2" />
    </div>
</template>

<script>
    import Tabbar from '~/components/tabbar';
    import config from '~/config/config.js';
    import {accessToken, token} from "~/assets/services/user";
    import { wechat_authorize_userinfo } from "~/assets/utils/wechat";
    import {getCookie, setCookie} from "~/assets/utils/util";

    export default {
        name: "user",
        components:{
            Tabbar,
        },
        data(){
            return {
                userinfo:{
                },

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
            // 商家入驻
            merchantPage(){
                if(this.userinfo.merchant === 0){
                    this.$router.push({name:'shop-join'})
                }
                if(this.userinfo.merchant === 1){
                    this.$router.push({name:'business'})
                }
            },
            // 绑定手机号页面
            goBindPhonePage(){
                this.$router.push({name:'user-bindphone'})
            },
            // 发布活动
            addActivity(){
                this.$router.push({name:'activity-add'})
            }
        },
        mounted() {
            this.pageInit()
        },
        computed:{
            merchantText(){
                return this.userinfo.merchant === 1?"商家中心":"商家入驻"
            }
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
    .user-func_menu_svg{
        margin-right:12px;
    }
    .user-func_menu_svg1 {
        margin-left: -3px;
        margin-right: 10px;
    }
    .user-func_menu_svg img{
        width:.32rem;
        height: .42rem;
    }
    .user-func_menu_svg1 img{
        width:.42rem;
        height: .34rem;
    }
    .user-func-li{
        display: flex;
        align-items: center;
        background-color: white;
        padding:15px 20px;
        font-size: .28rem;
        border-bottom:1px dotted #eee;
    }
    .user-func-li i{
        margin-left: auto;
    }
    .user-func_menu_svg1>svg{
        width: .42rem;
        height: .34rem;
    }
</style>