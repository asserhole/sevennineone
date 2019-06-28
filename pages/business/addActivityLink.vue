<template>
    <div class="add-link">
        <topback />

        <van-cell title="新增链接" style="margin-bottom:10px;"/>

        <van-cell-group>
            <van-field
                    v-model="link"
                    required
                    clearable
                    label="链接地址"
                    placeholder="请输入链接地址"
            />
        </van-cell-group>
        <div class="js-form-area">
            <span>宣传图片</span>
            <div class="js-form-logo">
                <van-button @click="chooseImg" type="primary">点击上传</van-button>
                <img :src="imgUrl" />
            </div>
        </div>

        <button @click="submit" class="jf-next-btn">确定</button>
    </div>
</template>

<script>
    import Topback from "../../components/topback";
    import {wxJssdkInit} from "../../assets/utils/wechat";
    import {saveActivityLink} from "../../assets/services/common";
    export default {
        name: "addActivityLink",
        data(){
            return {
                link:null,
                activityId:this.$route.query.actid,
                img:null,
                imgUrl:null,
            }
        },
        methods:{
            // 点击上传Logo
            chooseImg(){
                var that = this
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        that.imgUrl = localIds[0] // 预览

                        // 上传图片
                        wx.uploadImage({
                            localId: that.imgUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                that.img = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
            // 上传
            async submit(){
                if(!this.link){
                    this.$toast({
                        message: '请填写链接',
                        duration: 1500
                    })
                    return
                }
                if(!this.img){
                    this.$toast({
                        message: '请先上传图片',
                        duration: 1500
                    })
                    return
                }
                let res = await saveActivityLink({
                    link:this.link,
                    activityId:this.activityId,
                    img:this.img
                })
                if(res.data > 0){
                    this.$router.push({name:'business-activity'})
                }else{
                    this.$toast({
                        message: '保存失败',
                        duration: 1500
                    })
                }
            }
        },
        mounted(){
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
        },
        components: {Topback}
    }
</script>

<style scoped>
    .van-cell{
        font-size:12px;
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
    .jf-next-btn{
        width:1.2rem;
        color:#2cbe4e;
        margin:10px 10px 20px 10px;
        background-color: white;
        border:1px solid #2cbe4e;
        height:35px;
    }
</style>