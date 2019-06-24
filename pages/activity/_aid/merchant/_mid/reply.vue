<template>
    <div class="reply">
        <topback :step="step"/>
        <div class="reply_choose_subject_top">
            <p class="reply_choose_subject_title">选择课程</p>
            <van-radio-group v-model="replySubId">
                <van-radio checked-color="#fc6b79" :disabled="r.real_students>=r.max_students" :name="r.id" v-for="(r,i) in subjectList" class="">
                    <div class="reply_choose_subject_input">
                        <div class="reply_choose_subject_input_img" :style="'background-image:url('+r.adv_img+');'"></div>
                        <div class="reply_choose_subject_input_info">
                            <span class="bold">{{r.name}}</span>
                            <span class="pink">{{r.price/100}}元/学期</span>
                            <span class="gray">{{r.start_time.substring(0,5)}}~{{r.end_time.substring(0,5)}}</span>
                            <span class="gray">招生：{{r.real_students}}/{{r.max_students}}人&nbsp;{{r.real_students>=r.max_students?'已满人':''}}</span>
                        </div>
                    </div>
                </van-radio>
            </van-radio-group>
        </div>

        <div class="reply_choose_subject reply_fill">
            <p class="reply_choose_subject_title">填写报名信息</p>
            <van-field
                    v-model="childName"
                    clearable
                    label="学生姓名"
                    placeholder="请输入学生姓名"
            />
            <van-radio-group v-model="childSex" style="display:flex;height:44px;line-height:24px;padding:10px 15px;">
                <span style="width:90px;">
                    性别
                </span>
                    <van-radio style="margin-right:20px;" checked-color="#fc6b79" name="1">男</van-radio>
                    <van-radio checked-color="#fc6b79" name="2">女</van-radio>
            </van-radio-group>
            <van-field
                    v-model="childAge"
                    clearable
                    label="年龄"
                    placeholder="请输入学生年龄"
            >
                <van-button style="border:none;height:24px;" disabled slot="button" size="small" >岁</van-button>
            </van-field>
            <p style="display: flex;height:44px;line-height:24px;padding:10px 15px;">
                <span class="reply_input_title">入学情况</span>
                <button class="reply_school_btn" @click="sheetVisible=true">{{schoolInfoText}}</button>
                <mt-actionsheet
                        :actions="actions"
                        v-model="sheetVisible"
                        cancelText=''
                >
                </mt-actionsheet>
            </p>
            <div class="reply_input_img">
                <div class="reply_input_title">生活照</div>
                <div class="reply_input_img_item">
                    <button @click="uploadLifeImg">点击上传</button>
                    <!--<img src="https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/d2806dc1384b70c9bdd57d054eba99ec.png" />-->
                    <img :src="childImgPreUrl" />
                </div>
            </div>
            <van-field
                    v-model="userinfo.mobile"
                    clearable
                    label="手机号码"
                    placeholder="请输入手机号码"
            >
                <van-button @click="sendReplySms" slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field
                    v-model="code"
                    clearable
                    label="验证码"
                    placeholder="请输入手机验证码"
            />
            <button :class="{'disable_btn':canSubmit}" :disabled="canSubmit" @click="saveReplyLocal" class="submit_btn">我要报名</button>
        </div>

    </div>
</template>

<script>
    import {listSubject} from "~/assets/services/shopping";
    import Topback from "~/components/topback";
    import {wechat_authorize_userinfo} from "~/assets/utils/wechat";
    import {accessToken, token} from "~/assets/services/user";
    import {getCookie, setCookie} from "~/assets/utils/util";
    import {Toast} from "mint-ui";
    import {saveReply} from "~/assets/services/reply";
    import {Indicator} from "mint-ui";
    import MessageTop from "~/components/activity/messageTop"
    import {wxJssdkInit} from "../../../../../assets/utils/wechat";
    import {sendReplySms} from "../../../../../assets/services/user";

    export default {
        name: "reply",
        components: {Topback,MessageTop},
        data(){
            return {
                step:-1, // 后退步数
                replySubId:null, // 报名的id
                childName:'', //学生姓名
                childSex:'',
                childAge:'',
                schoolInfo:'',
                schoolInfoText:'请选择',
                childImgPreUrl:'', //图片预览地址
                actions: [
                    {
                        'name': '未入学', method: () => {
                            this.schoolInfoText = '未入学'
                            this.schoolInfo = 0
                            this.sheetVisible = false
                        }
                    }, {
                        'name': '幼儿园', method: () => {
                            this.schoolInfoText = '幼儿园'
                            this.schoolInfo = 1
                            this.sheetVisible = false
                        }
                    },
                    {
                        'name': '小学', method: () => {
                            this.schoolInfoText = '小学'
                            this.schoolInfo = 2
                            this.sheetVisible = false
                        }
                    },
                    {
                        'name': '初中', method: () => {
                            this.schoolInfoText = '初中'
                            this.schoolInfo = 3
                            this.sheetVisible = false
                        }
                    },
                    {
                        'name': '高中', method: () => {
                            this.schoolInfoText = '高中'
                            this.schoolInfo = 4
                            this.sheetVisible = false
                        }
                    }
                ],
                sheetVisible:false, //actionsheet 是否显示
                canSubmit:false, //按钮能否点击
                popupVisible:false, //保存成功提示
                successMsg:'报名成功',
                lifePhoto:null, // 生活照地址
                userinfo:{},
                code:null, // 短信验证码
                smsId:null, //短信验证码id
            }
        },
        methods:{
            async page_init(){
                let openid = getCookie("token")
                if(openid===''){
                    await this.wechat_userinfo()
                }else{
                    let res = await token()
                    if (res.data === null) {
                        await this.wechat_userinfo()
                    }else{
                        this.userinfo = JSON.parse(res.data)
                    }
                }
            },
            async wechat_userinfo(){
                let code = this.$route.query.code
                let state = this.$route.query.state
                if (!code) {
                    wechat_authorize_userinfo(window.location.href)
                } else {
                    let resUser = await accessToken({
                        code:code,
                        state:state
                    })
                    if(resUser.data.openid){
                        setCookie('token', resUser.data.openid, 7)
                        this.$store.commit('setOpenid',resUser.data.openid)
                        this.userinfo = resUser.data
                    }
                    this.step = -3
                }
            },
            async saveReplyLocal(){
                if(this.replySubId===null){
                    Toast({message:'您选择您要报名的课程--',position:'bottom',duration:3000});return
                }
                if(this.childName.length===0 || this.childName.length>16){
                    Toast({message:'您的小孩名字填写有误--',position:'bottom',duration:3000});return
                }
                if(this.childName.childSex===''){
                    Toast({message:"请选择性别--",position:'bottom',duration:3000});return;
                }
                if(this.childAge==='' || parseInt(this.childAge)>100){
                    Toast({message:"请填写年龄--",position:'bottom',duration:3000});return;
                }
                if(this.schoolInfo===''){
                    Toast({message:"请选择入学情况--",position:'bottom',duration:3000});return;
                }
                if (!this.userinfo.mobile) {
                    Toast({message: "请填写手机号码", position: 'bottom', duration: 3000});
                    return;
                }
                if (!this.code) {
                    Toast({message: "请填写验证码", position: 'bottom', duration: 3000});
                    return;
                }
                let obj = {
                    childName:this.childName,
                    childAge:this.childAge,
                    childSex: this.childSex,
                    schoolInfo:this.schoolInfo,
                    subjectId:this.replySubId,
                    activityId:this.$route.params.aid,
                    merchantId:this.$route.params.mid,
                    lifePhoto:this.lifePhoto,
                    mobile:this.userinfo.mobile,
                    code:this.code,
                    smsId:this.smsId
                }
                Indicator.open({
                    text: '保存中...',
                    spinnerType: 'fading-circle'
                })
                var that = this
                let res = await saveReply(obj)
                Indicator.close()
                if (res.code !== 0) {
                    Toast('保存失败，请稍后再试:'+res.message)
                }else{
                    let replyId = res.data
                    that.canSubmit = true
                    that.$notify({
                        message: '报名成功',
                        duration: 2000,
                        background: '#fc6b79'
                    })
                    setTimeout(()=>{
                        that.$router.push({name:'donate-uid',params:{uid:replyId}})
                    },2000)
                }
            },
            // 点击上传Logo
            uploadLifeImg(){
                var that = this
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        that.childImgPreUrl = localIds[0] // 预览

                        // 上传图片
                        wx.uploadImage({
                            localId: that.childImgPreUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                that.lifePhoto = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
            // 发送验证码
            async sendReplySms(){
                //手机号正则
                let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                //电话
                if (!phoneReg.test(this.userinfo.mobile)) {
                    this.$toast({
                        message: '请输入正确的手机号',
                        duration: 1500
                    })
                    return
                }else{
                    let res = await sendReplySms({
                        mobile:this.userinfo.mobile
                    })
                    if(res.data > 0){
                        this.$notify({
                            message: '发送成功',
                            background: '#fc6b79'
                        })
                        this.smsId = res.data
                    }else{
                        this.$toast.fail({
                            message: '发送短信失败',
                            duration: 2000
                        })
                    }
                }

            }
        },
        async asyncData({params}){
            var res = await listSubject({
                merchantId:params.mid
            })
            return {
                subjectList:res.data
            }
        },
        mounted() {
            this.page_init()
            // 微信jssdk
            wxJssdkInit(window.location.href,
                [
                    'chooseImage', // 从手机中或拍照选择图片
                    'previewImage', // 预览图片接口
                    'uploadImage',
                    'downloadImage',
                    'getLocalImgData',
                    'getLocation', //获取地理位置
                    'openLocation',
                    'hideOptionMenu'
                ],
                wx => {
                    wx.hideOptionMenu();
                }
            )
        }
    }
</script>

<style scoped>
    .reply_choose_subject_top{
        background-color: white;
        padding: 15px;
    }
    .reply_choose_subject{
        margin: 8px 0;
        background-color: white;
        padding: 15px;
    }
    .reply_choose_subject_title{
        padding-left:15px;
        position: relative;
        margin-bottom:5px;

    }
    .reply_choose_subject_title:before{
        content:'';
        position: absolute;
        background-color: #fc6b79;
        width:3px;
        height:100%;
        top:0;
        left:0;
    }
    .reply_choose_subject_input{
        display: flex;
        flex-direction: row;
        align-items:center;
    }
    .reply_choose_subject_input_img{
        height:64px;
        width:64px;
    }
    .reply_choose_subject_input_info{
        display: flex;
        flex-direction: column;
        padding-top: 5px;
    }
    .reply_input_title{
        width: 90px;
        display: inline-block;
        text-align: justify;
    }
    .reply_fill input{
        border:none;
        border-bottom:1px solid #999;
    }
    .reply_school_btn{
        border:none;
        background-color: #fc6b79;
        color:white;
        padding:0 5px;
    }
    .submit_btn{
        border:1px solid #fc6b79;
        background-color: white;
        color:#fc6b79;
        padding:5px 8px;
        border-radius: 5px;
        margin-left: 15px;
    }
    .disable_btn{
        background-color: #999;
        border:1px solid #999;
        color:white;
    }
    .reply_input_img{
        display: flex;
        padding:10px 15px;
        line-height: 24px;
    }
    .reply_input_title{
        width:90px;
    }
    .reply_input_img_item{
        display: flex;
        flex-direction: column;
        max-width:200px;
    }
    .reply_input_img_item button{
        border:1px solid #fc6b79;
        background-color: #fc6b79;
        color:white;
        padding:0 5px;
        width: 70px;

    }
    .gray{
        color:#999;
    }
    .pink{
        color:#fc6b79;
    }
    .bold{
        font-weight: 600;
    }
</style>
<style>
    .reply .van-cell{
        font-size:12px;
    }
    .reply .van-cell:not(:last-child)::after{
        display: none;
    }
</style>