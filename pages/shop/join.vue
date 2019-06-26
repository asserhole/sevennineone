<template>
    <!-- 商家入驻页面 -->
    <div class="merchant_join">
        <topback />
        <van-cell value="商家入驻" />

        <div class="merchant_join-warp clearfix">
            <div class="jf-progress">
                <van-steps :active="active">
                    <van-step>商家信息</van-step>
                    <van-step>课程设置</van-step>
                    <van-step>地理位置</van-step>
                    <van-step>完成</van-step>
                </van-steps>
            </div>

            <div class="jf-form">
                <div class="js-form-area">
                    <span>选择地区</span>
                    <van-button @click="areaShow=true" type="primary">{{merchant.province?merchant.province+'&nbsp;'+merchant.city+'&nbsp;'+merchant.area:'点击选择'}}</van-button>
                </div>
                <van-cell-group>
                    <van-field
                        v-model="merchant.name"
                        required
                        clearable
                        label="机构名称"
                        placeholder="请输入机构名称"
                    />
                </van-cell-group>
                <div class="js-form-area">
                    <span>选择分类</span>
                    <van-button @click="categoryShow=true" type="primary">{{merchant.categoryName?merchant.categoryName:'点击选择'}}</van-button>
                </div>
                <van-cell-group>
                    <van-field
                            v-model="merchant.tel"
                            required
                            clearable
                            label="电话号码"
                            placeholder="请输入电话号码"
                    />
                    <van-field
                            v-model="merchant.poster"
                            required
                            clearable
                            label="一句话介绍"
                            placeholder="不超过100字"
                    />
                    <van-field
                            v-model="merchant.description"
                            label="简介"
                            type="textarea"
                            placeholder="请输入机构简介，不超过1000字"
                            rows="1"
                            autosize
                    />
                </van-cell-group>
                <div class="js-form-area">
                    <span>上传logo</span>
                    <div class="js-form-logo">
                        <van-button @click="chooseLogoImg" type="primary">点击上传</van-button>
                        <img :src="logoUrl" />
                    </div>
                </div>
                <div class="js-form-area">
                    <span>营业执照</span>
                    <div class="js-form-logo">
                        <van-button @click="chooseBusinessLiImg" type="primary">点击上传</van-button>
                        <img :src="busiLiUrl" />
                    </div>
                </div>
                <div class="js-form-area">
                    <span>首页横幅</span>
                    <div class="js-form-logo">
                        <van-button @click="chooseBannerImg" type="primary">点击上传</van-button>
                        <img :src="bannerUrl" />
                    </div>
                </div>
                <div class="js-form-area">
                    <span>宣传图片</span>
                    <div class="js-form-logo">
                        <van-button @click="chooseMerchantImg" type="primary">点击上传，请上传最少5张</van-button>
                        <img v-for="r in merchantImgList" :src="r" />
                    </div>
                </div>
            </div>

            <!-- 城市选择器 -->
            <van-popup v-model="areaShow" position="bottom" :overlay="true">
                <van-area @cancel="cancel" @confirm="confirm" :area-list="areaList" value="430000" />
            </van-popup>

            <!-- 机构分类 -->
            <van-popup v-model="categoryShow" position="bottom" :overlay="true">
                <van-picker show-toolbar @cancel="categoryShow=false" @confirm="chooseCategory" :columns="categoryList" />
            </van-popup>


            <div class="jf-next-btn">
                <van-button @click="submit" plain type="primary">下一步</van-button>
            </div>
        </div>


    </div>

</template>

<script>
    import Topback from "../../components/topback";
    import areaList from "~/assets/utils/areaList"
    import {getHomeData} from "../../assets/services/common";
    import {wechat_authorize_userinfo, wxJssdkInit} from "../../assets/utils/wechat";
    import {getMerchantJoinInfo, saveMerchant} from "../../assets/services/shopping";
    import {getCookie, setCookie} from "../../assets/utils/util";
    import {accessToken, token} from "../../assets/services/user";

    export default {
        name: "join",
        data(){
            return {
                active:0,
                areaList:areaList,
                areaShow:false,
                categoryList:[],
                categoryShow:false,
                logoUrl:'',
                busiLiUrl:'',
                bannerUrl:'',
                merchantImgList:[], // 微信选择本地图片列表
                merchant:{
                    name:null,
                    province:null,
                    city:null,
                    area:null,
                    categoryId:null,
                    categoryName:null,
                    tel:null,
                    logo:null,
                    businessLicense:null,
                    description:'',
                    banner:'',
                    merchantImgList:[],  // 上传的服务器图片id
                    poster:null
                }
            }
        },
        methods:{
            // 加载分类数据
            async getCagetoryList(){
                var res = await getHomeData()
                this.categoryList = res.data
            },
            // 取消城市选择
            cancel(){
                this.areaShow=false
            },
            // 确认城市选择
            confirm(data){
                this.merchant.province = data[0].name
                this.merchant.city = data[1].name
                this.merchant.area = data[2].name
                this.areaShow = false
            },
            // 分类选择
            chooseCategory(value){
                this.merchant.categoryId = value.id
                this.merchant.categoryName = value.text
                this.categoryShow = false
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
                                that.merchant.logo = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
            // 上传营业执照
            chooseBusinessLiImg(){
                var that = this
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        that.busiLiUrl = localIds[0] // 预览

                        // 上传图片
                        wx.uploadImage({
                            localId: that.logoUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                that.merchant.businessLicense = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
            // 上传首页横幅
            chooseBannerImg(){
                var that = this
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        that.bannerUrl = localIds[0] // 预览

                        // 上传图片
                        wx.uploadImage({
                            localId: that.bannerUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                that.merchant.banner = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
            // 上传宣传图片
            chooseMerchantImg(){
                var that = this
                wx.chooseImage({
                    count: 9, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        that.merchantImgList = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                        // 上传图片
                        for(let i=0;i<that.merchantImgList.length;i++){
                            wx.uploadImage({
                                localId: that.merchantImgList[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    that.merchant.merchantImgList.push(res.serverId); // 返回图片的服务器端ID
                                }
                            });
                        }

                    }
                });
            },
            // 下一步 提交
            async submit(){
                console.log(this.merchant)
                if(!this.merchant.name){
                    this.$toast("请输入机构名称");return;
                }
                if(!this.merchant.province || !this.merchant.city || !this.merchant.area){
                    this.$toast("请选择城市");return;
                }
                if(!this.merchant.categoryName){
                    this.$toast("请选择机构分类");return;
                }
                if(!this.merchant.tel){
                    this.$toast("请输入电话号码");return;
                }
                if(!this.merchant.poster){
                    this.$toast("请输入一句话介绍");return;
                }
                if(!this.merchant.logo){
                    this.$toast("请上传logo");return;
                }
                if(!this.merchant.businessLicense){
                    this.$toast("请上传营业执照");return;
                }
                // if(this.merchant.merchantImgList.length < 5){
                //     this.$toast("请上传至少5张机构图片");return;
                // }
                let res = await saveMerchant(this.merchant)
                if(res.data > 0){
                    this.$router.push({name:"shop-joinsteptwo",params:{mid:res.data}})
                }else{
                    this.$toast.fail(
                        {message: '信息提交失败',
                            duration: 3000}
                    )
                }
            },
            // 查找自己填写过的信息
            async getMerchantJoinInfo(){
                let res = await getMerchantJoinInfo();
                if(res.data){
                    if(res.data.auditStatus === 1){ //如果在审核中，跳到申请的页面
                        this.$router.push({name:'shop-joinfinish'})
                    }
                    if(res.data.auditStatus === 2){
                        this.$router.push({name:'business'})
                    }
                    this.merchant = res.data
                    this.logoUrl = res.data.logo
                    this.busiLiUrl = res.data.businessLicense
                    this.bannerUrl = res.data.banner
                    this.merchantImgList = res.data.imgList
                }
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
        },
        mounted(){
            this.pageInit()
            this.getCagetoryList()
            this.getMerchantJoinInfo()

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
        },
        watch:{
        },
        components: {Topback}
    }
</script>

<style scoped>
    .jf-next-btn{
        padding-right:20px;
    }
    .jf-next-btn .van-button{
        float:right;
        line-height: 30px;
        height: 30px;
    }
    .merchant_join-warp{
        background-color: white;
        margin-top:8px;
        padding-bottom:20px;
    }
    .jf-form{
        padding-bottom:10px;
    }
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
    .van-picker__cancel, .van-picker__confirm{
        color:#2cbe4e;
    }
    .van-cell{
        font-size:12px;
    }
</style>