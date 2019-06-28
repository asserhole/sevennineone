<template>
    <!-- 发起活动页 -->

    <div class="activity-add">

        <van-cell title="编辑活动" />

        <div class="activity-add-form clearfix">
            <div class="js-form-area">
                <span>选择地区</span>
                <van-button @click="areaShow=true" type="primary">{{activity.province?activity.province+'&nbsp;'+activity.city:'点击选择'}}</van-button>
            </div>
            <van-cell-group>
                <van-field
                        v-model="activity.area"
                        clearable
                        label="区省（可选）"
                        placeholder="请输入区省"
                />
                <van-field
                        v-model="activity.name"
                        required
                        clearable
                        label="活动名称"
                        placeholder="请输入活动名称"
                />
                <van-field
                        v-model="activity.poster"
                        required
                        clearable
                        label="活动标语"
                        placeholder="请输入活动标语"
                />
            </van-cell-group>
            <div class="js-form-area">
                <span>活动开始时间</span>
                <van-button @click="startDateShow=true" type="primary">{{activity.startDate?dateFormat(activity.startDate,'YYYY-MM-DD'):'点击选择'}}</van-button>
            </div>
            <div class="js-form-area">
                <span>活动结束时间</span>
                <van-button @click="endDateShow=true" type="primary">{{activity.endDate?dateFormat(activity.endDate,'YYYY-MM-DD'):'点击选择'}}</van-button>
            </div>
            <van-field
                    v-model="activity.description"
                    label="简介"
                    required
                    type="textarea"
                    placeholder="请输入活动简介"
                    rows="1"
                    autosize
            />
            <div class="js-form-area">
                <span>上传活动图片</span>
                <div class="js-form-logo">
                    <van-button @click="chooseLogoImg" type="primary">点击上传</van-button>
                    <img :src="logoUrl" />
                </div>
            </div>
            <div class="jf-next-btn">
                <van-button @click="submit" plain type="primary">提交</van-button>
            </div>
        </div>


        <!-- 城市选择器 -->
        <van-popup v-model="areaShow" position="bottom" :overlay="true">
            <van-area @cancel="cancel" @confirm="confirm" :columns-num="2" :area-list="areaList" value="430000" />
        </van-popup>

        <!-- 开始日期 -->
        <van-popup v-model="startDateShow" position="bottom" :overlay="true">
            <van-datetime-picker
                    @cancel="startDateShow=false"
                    @confirm="startDateShow=false"
                    v-model="activity.startDate"
                    type="date"
                    :min-date="minDate"
            />
        </van-popup>
        <!-- 结束日期 -->
        <van-popup v-model="endDateShow" position="bottom" :overlay="true">
            <van-datetime-picker
                    @cancel="endDateShow=false"
                    @confirm="endDateShow=false"
                    v-model="activity.endDate"
                    type="date"
                    :min-date="minDate"
            />
        </van-popup>
    </div>
</template>

<script>
    import areaList from "~/assets/utils/areaListTwo"
    import {wechat_authorize_userinfo, wxJssdkInit} from "~/assets/utils/wechat";
    import {getCookie, setCookie} from "~/assets/utils/util";
    import {accessToken, token} from "~/assets/services/user";
    import {addActivity} from "~/assets/services/activity";
    import {getActivityById} from "../../assets/services/activity";
    export default {
        name: "editactivity",
        data(){
            return {
                activity:{
                    province:null,
                    city:null,
                    area:null,
                    name:null,
                    startDate:null,
                    endDate:null,
                    description:null,
                    logo:null,
                    id:this.$route.query.actid
                },
                areaShow:false,
                areaList:areaList,
                startDateShow:false,
                endDateShow:false,
                minDate: new Date("2018-01-01"),
                logoUrl:'',
                userinfo:{}
            }
        },
        methods:{
            async getById(){
                let res = await getActivityById({
                    id:this.activity.id
                })
                this.activity = res.data
                this.logoUrl = res.data.logo
            },
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
            async submit(){
                if(!this.activity.name){
                    this.$toast("请输入活动名称");return;
                }
                if(!this.activity.province || !this.activity.city){
                    this.$toast("请选择城市");return;
                }
                if(!this.activity.startDate){
                    this.$toast("开始日期输入有误");return
                }
                if(!this.activity.endDate){
                    this.$toast("结束日期输入有误");return
                }
                if(!this.activity.logo){
                    this.$toast("请上传logo");return;
                }
                if(!this.activity.description){
                    this.$toast("请输入活动介绍");return;
                }
                var obj = JSON.parse(JSON.stringify(this.activity));
                let startDateStr = this.dateFormat(this.activity.startDate,'yyyy-MM-dd')
                let endDateStr = this.dateFormat(this.activity.endDate,'yyyy-MM-dd')
                obj.startDate = startDateStr;
                obj.endDate = endDateStr;
                console.log(obj)
                let res = await addActivity(obj)
                if(res.data > 0){
                    this.$router.push({name:"business-activity"})
                }else{
                    this.$toast.fail(
                        {message: '信息提交失败',
                            duration: 2000}
                    )
                }
            },
            // 取消城市选择
            cancel(){
                this.areaShow=false
            },
            // 确认城市选择
            confirm(data){
                this.activity.province = data[0].name
                this.activity.city = data[1].name
                this.areaShow = false
            },
            dateFormat(datetime, formatStr){
                if(!(datetime instanceof Date)){
                    return datetime
                }
                var dat = datetime;
                var str = formatStr;
                var Week = ['日', '一', '二', '三', '四', '五', '六'];
                str = str.replace(/yyyy|YYYY/, dat.getFullYear());
                str = str.replace(/yy|YY/, (dat.getYear() % 100) > 9 ? (dat.getYear() % 100).toString() : '0' + (dat.getYear() % 100));
                str = str.replace(/MM/, dat.getMonth() > 8 ? (dat.getMonth() + 1).toString() : '0' + (dat.getMonth() + 1));
                str = str.replace(/M/g, (dat.getMonth() + 1));
                str = str.replace(/w|W/g, Week[dat.getDay()]);
                str = str.replace(/dd|DD/, dat.getDate() > 9 ? dat.getDate().toString() : '0' + dat.getDate());
                str = str.replace(/d|D/g, dat.getDate());
                str = str.replace(/hh|HH/, dat.getHours() > 9 ? dat.getHours().toString() : '0' + dat.getHours());
                str = str.replace(/h|H/g, dat.getHours());
                str = str.replace(/mm/, dat.getMinutes() > 9 ? dat.getMinutes().toString() : '0' + dat.getMinutes());
                str = str.replace(/m/g, dat.getMinutes());
                str = str.replace(/ss|SS/, dat.getSeconds() > 9 ? dat.getSeconds().toString() : '0' + dat.getSeconds());
                str = str.replace(/s|S/g, dat.getSeconds());
                return str
            },
            // 点击上传Logo
            chooseLogoImg(){
                var that = this
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        that.logoUrl = localIds[0] // 预览

                        // 上传图片
                        wx.uploadImage({
                            localId: that.logoUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                that.activity.logo = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
        },
        mounted() {
            this.pageInit()
            this.getById()
            // 微信jssdk
            wxJssdkInit(window.location.href,
                [
                    'chooseImage', // 从手机中或拍照选择图片
                    'previewImage', // 预览图片接口
                    'uploadImage',
                    'downloadImage',
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
    .js-form-area{
        padding:10px 15px;
        display: flex;
    }
    .js-form-area>span{
        line-height: 24px;
        width:90px;
    }
    .js-form-area>span:before{
        position: absolute;
        left: 7px;
        color: #f44;
        content: '*';
    }
    .js-form-area button{
        padding:0 5px;
        line-height: 24px;
        height:24px;
    }
    .activity-add-form{
        background-color: white;
        margin:8px 0;
        padding-bottom:15px;
    }
    .jf-next-btn{
        padding-right:20px;
    }
    .jf-next-btn .van-button{
        float:right;
        line-height: 30px;
        height: 30px;
    }
    .js-form-logo{
        display: flex;
        flex-direction: column;
    }
    .js-form-logo img{
        max-width:64px;
        max-height:64px;
    }
</style>
<style>
    .van-cell{
        font-size: 12px;
    }
    .van-picker__cancel, .van-picker__confirm{
        color:#2cbe4e;
    }
    .van-cell{
        font-size:12px;
    }
</style>