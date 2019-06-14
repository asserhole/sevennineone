<template>
    <div id="user">
        <div class="user-head">
            <div>
                <img class="img-circle" :src="userinfo.avatar" />
                <h2>{{userinfo.nickname}}</h2>
            </div>
        </div>
        <div class="user-func clearfix">
            <ul>
                <li @click="goBindPhonePage" class="user-func-li">
                    <div class="user-func_menu_svg">
                        <svg t="1559627553441" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4257" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><defs><style type="text/css"></style></defs><path d="M739.84 56.32H284.16c-40.96 0-76.8 35.84-76.8 76.8v755.2c0 43.52 33.28 76.8 76.8 76.8h455.68c40.96 0 76.8-35.84 76.8-76.8V135.68c0-20.48-7.68-40.96-23.04-53.76-15.36-15.36-33.28-25.6-53.76-25.6z m-227.84 716.8c-15.36 0-30.72 5.12-40.96 17.92-10.24 10.24-15.36 25.6-15.36 40.96 0 30.72 25.6 58.88 56.32 58.88 15.36 0 30.72-7.68 40.96-17.92 10.24-10.24 15.36-25.6 15.36-40.96 0-15.36-5.12-30.72-15.36-40.96-10.24-12.8-25.6-17.92-40.96-17.92z m64-606.72c12.8 0 20.48 10.24 20.48 23.04s-10.24 23.04-20.48 23.04h-130.56c-12.8 0-20.48-10.24-20.48-23.04s10.24-23.04 20.48-23.04h130.56zM299.52 117.76h422.4c20.48 0 35.84 15.36 35.84 35.84v532.48H266.24V153.6c0-20.48 15.36-35.84 33.28-35.84zM724.48 921.6H299.52c-20.48 0-35.84-15.36-35.84-35.84V742.4h494.08v143.36c0 20.48-15.36 35.84-33.28 35.84z m0 0" fill="#fc6b79" p-id="4258" data-spm-anchor-id="a313x.7781069.0.i14" class="selected"></path></svg>
                    </div>
                    <div>
                        <span>手机号绑定</span>
                    </div>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </li>
                <li class="user-func-li" @click="merchantPage">
                    <div class="user-func_menu_svg">
                        <svg t="1559627428679" class="icon" style="" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2786" xmlns:xlink="http://www.w3.org/1999/xlink" width="69.8125" height="64"><defs><style type="text/css"></style></defs><path d="M158.647887 98.631531h790.913222a49.315766 49.315766 0 0 0 0-98.631531h-790.913222a49.315766 49.315766 0 0 0 0 98.631531z m118.636984 323.343935a139.572921 139.572921 0 1 0 279.145842 0 139.572921 139.572921 0 1 0 275.423899 0 139.572921 139.572921 0 1 0 279.145842 0l-97.701045-257.744662H94.909587l-93.048615 257.744662a139.572921 139.572921 0 1 0 279.145843 0z m673.671967 360.56338v-171.674693h-67.460246v171.674693h-165.626533v69.786461h165.626533V1024h67.460246v-171.674693H1116.583371v-69.786461zM174.466152 935.603816v-328.461608h-79.091322v347.071331a72.112676 72.112676 0 0 0 60.016356 65.599273h544.334393V935.603816H174.000909z" p-id="2787" data-spm-anchor-id="a313x.7781069.0.i9" class="selected" fill="#fc6b79"></path></svg>
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
    .user-head{
        width:100%;
        background-color:#fc6b79;
        height:270px;
        padding-top:50px;
    }
    .user-func{

    }
    .user-head>div{
        text-align: center;
    }
    .user-head>div img{
        margin:0 auto;
        border-radius:50%;
        width:90px;
    }
    .user-head>div h2{
        font-weight: 800;
        font-size:20px;
    }
    .user-func_menu_svg{
        margin-right:10px;
    }
    .user-func_menu_svg svg{
        width:35px;
        height:35px;
    }
    .user-func-li{
        display: flex;
        align-items: center;
        background-color: white;
        padding:3px 20px;
        border-bottom:1px dotted #eee;
    }
    .user-func-li i{
        margin-left: auto;
    }
</style>