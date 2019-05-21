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
                <li>
                    <div>
                        <img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/c72c11e0584226c7f8b8fa3bdb37a1fb.png" />
                    </div>
                    <div>
                        <span>手机号绑定</span>
                        <span>></span>
                    </div>
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
    import {accessToken, token} from "../assets/services/user";
    import { wechat_authorize_userinfo } from "../assets/utils/wechat";
    import {getCookie, setCookie} from "../assets/utils/util";

    export default {
        name: "user",
        components:{
            Tabbar,
        },
        data(){
            return {
                userinfo:{
                }
            }
        },
        methods:{
            // 通过code获取access_token
            async getAccessTokenByCode(){
                let code = this.$route.query.code
                let state = this.$route.query.state
                let res = await accessToken({
                    code:code,
                    state:state
                });
                // res: {
                //     "access_token": "21_-IDDLo_HnDM2btvePmzXvWotY3sqbL-TmtYeF3qzUtZZvVF0bJUzcqAGI1qw89IaTAla5xVMvQeFoR8LsLyUhA",
                //     "expires_in": 7200,
                //     "refresh_token": "21_qXxK7b7nuXeT3LlFU2tb8OJ5oIoizs1RlGozTG_rAys_oKqtNJ9zYj1VL4dO00Kdw6kC550rDYEasRrZTYR2qA",
                //     "openid": "oO5nq1WAm_X8dJpVhZakgDrnEDz0",
                //     "scope": "snsapi_base"
                //      }
                return res
            },
            // 进入页面时的方法loginApi
            async login(){
                let code = this.$route.query.code
                let state = this.$route.query.state
                if (!code) {
                    wechat_authorize_userinfo(config.REDIRECT_URL)
                } else {
                    let res = await this.getAccessTokenByCode()
                    this.userinfo = JSON.parse(res.data.user)
                    setCookie('token', this.userinfo.id, 7)
                }
            },
            async getUserInfo(){
                let res = await token()
                this.userinfo = res.data
            }
        },
        mounted() {
            if (getCookie("token")!=="") {
                this.getUserInfo()
            } else {
                this.login()
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
        padding:20px;
    }
    .user-func ul li div{
        display: inline-block;
        float:left;
    }
    .user-func ul li div:first-child img{
        height:40px;
    }
    .user-func ul li div:last-child{
        line-height: 40px;
        font-weight: 600;
        font-size: 14px;
        margin-left:10px;
        width:80%;
        border-bottom:1px solid #dcdcdc;
    }
    .user-func ul li div:last-child span:last-child{
        float:right;
        color:#999;
        font-weight:400;
    }
    .user-head>div{
        text-align: center;
    }
    .user-head>div img{
        margin:0 auto;
        border-radius:50%;
    }
    .user-head>div h2{
        font-weight: 800;
        font-size:20px;
    }
</style>