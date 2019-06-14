<template>
    <!-- 商家入驻页面 -->
    <div class="merchant_join">
        <topback />
        <van-cell value="学校设置" />

        <div class="merchant_join-warp clearfix">
            <div class="jf-form">
                <div class="js-form-area">
                    <span>选择地区</span>
                    <van-button @click="areaShow=true" type="primary">{{merchant.province?merchant.province+'&nbsp;'+merchant.city+'&nbsp;'+merchant.area:'点击选择'}}</van-button>
                </div>
                <van-cell-group>
                    <van-field
                            v-model="merchant.name"
                            required
                            disabled
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
                            v-model="merchant.description"
                            label="简介"
                            type="textarea"
                            placeholder="请输入机构简介"
                            rows="1"
                            autosize
                    />
                    <van-field
                            v-model="merchant.address"
                            label="详细地址"
                            placeholder="请输入详细地址"
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
                <van-button @click="submit" plain type="primary">保存</van-button>
            </div>
        </div>


    </div>

</template>

<script>
    import Topback from "../../components/topback";
    import areaList from "~/assets/utils/areaList"
    import {getHomeData} from "../../assets/services/common";
    import {wxJssdkInit} from "../../assets/utils/wechat";
    import {getMerchantJoinInfo, saveMerchant} from "../../assets/services/shopping";

    export default {
        name: "merchant",
        data(){
            return {
                active:0,
                areaList:areaList,
                areaShow:false,
                categoryList:[],
                categoryShow:false,
                logoUrl:'',
                merchant:{
                    name:null,
                    province:null,
                    city:null,
                    area:null,
                    categoryId:null,
                    categoryName:null,
                    tel:null,
                    logo:null,
                    description:'',
                    address:''
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
            // 下一步 提交
            async submit(){
                if(!this.merchant.province || !this.merchant.city || !this.merchant.area){
                    this.$toast("请选择城市");return;
                }
                if(!this.merchant.categoryName){
                    this.$toast("请选择机构分类");return;
                }
                if(!this.merchant.tel){
                    this.$toast("请输入电话号码");return;
                }
                if(!this.merchant.logo){
                    this.$toast("请上传logo");return;
                }
                let res = await saveMerchant(this.merchant)
                if(res.data > 0){
                    this.$router.push({name:"business"})
                }else{
                    this.$toast.fail(
                        {message: '信息提交失败',
                            duration: 3000}
                    )
                }
            },
            // 地图定位
            location(){
                wx.getLocation({
                    type:'gcj02',
                    success:function (res) {
                        wx.chooseLocation({
                            latitude : res.latitude, // 纬度，浮点数，范围为90 ~ -90
                            longitude : res.longitude, // 经度，浮点数，范围为180 ~ -180。
                            name : '我的位置', // 位置名
                            address : '329创业者社区', // 地址详情说明
                            scale : 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                            infoUrl : 'http://www.djtp.com' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
                        });
                    }
                })
            },
            // 查找自己填写过的信息
            async getMerchantJoinInfo(){
                let res = await getMerchantJoinInfo();
                if(res.data){
                    if(res.data.auditStatus === 1){ //如果在审核中，跳到申请的页面
                        this.$router.push({name:'shop-joinfinish'})
                    }
                    this.merchant = res.data
                    this.logoUrl = res.data.logo
                    this.busiLiUrl = res.data.businessLicense
                }
            }
        },
        mounted(){
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