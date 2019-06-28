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
</style>