<template>
    <!-- 入驻第二步，填写课程信息 -->
    <div class="merchant-joinst">
        <topback />
        <van-cell value="商家入驻" />

        <div class="merchant-joinst-warp clearfix">
            <div class="jf-progress">
                <van-steps :active="active">
                    <van-step>商家信息</van-step>
                    <van-step>课程设置</van-step>
                    <van-step>地理位置</van-step>
                    <van-step>完成</van-step>
                </van-steps>
            </div>
                <van-cell @click="openSubjectForm(i)" v-for="(r,i) in total" is-link >
                    <template slot="title">
                        <i @click.stop="removeSubject(i)" class="fa fa-minus-circle remove_icon" aria-hidden="true"></i>
                        <span class="custom-text">{{subjectList[i].name}}</span>
                    </template>
                </van-cell>
            <div class="jft-content">
                <div class="jft-content-addbtn">
                    <button @click="addSubject">
                        <i class="fa fa-plus" aria-hidden="true"></i>添加
                    </button>
                    <button @click="submit">
                        下一步
                    </button>
                </div>
            </div>

            <addsubject :formShow="formShow"
                        :subjectList="subjectList"
                        :subjectIndex="currentSubjectIndex"
                        @hideAddSubjectForm="formShow=false"
                        @finishSubject="finishSubject"
            />
        </div>

    </div>


</template>

<script>
    import Topback from "../../components/topback";
    import Addsubject from "./components/addsubject";
    import {wxJssdkInit} from "../../assets/utils/wechat";
    import {listSubjectByToken, saveSubjectBatch} from "../../assets/services/shopping";
    export default {
        name: "joinsteptwo",
        data(){
            return{
                active:1, // 步骤条
                activeNames:[], // 折叠面板
                subjectList:[], //课程列表
                formShow:false,
                currentSubjectIndex:-1,
                subjectTemplate:{
                    name:null,
                    rateType:null,
                    rateTypeName:null,
                    rateNum:null,
                    rateNumName:null,
                    during:null,
                    price:null,
                    total:null,
                    maxStudents:null,
                    realStudents:0,
                    suitableAge:null,
                    description:null,
                    advImg:null
                }
            }
        },
        methods:{
            async listSubject() {
                let res = await listSubjectByToken({
                    merchantId:this.$route.params.mid
                })
                this.subjectList = res.data
                this.subjectList.map(input =>{
                    input.price = input.price / 100
                })
            },
            // 加一行
            addSubject(){
                let subject = Object.assign({},this.subjectTemplate)
                subject.name='未设置标题'
                this.subjectList.push(subject)
            },
            // 清除一行
            removeSubject(index){
                this.$dialog.confirm({
                    title: '请确认',
                    message: '确认要删除这门课程吗？'
                }).then(() => {
                    this.subjectList.splice(index,1)
                }).catch(() => {
                    // on cancel
                });
            },
            // 打开
            openSubjectForm(index){
                this.formShow = true
                this.currentSubjectIndex = index
            },
            // 一行完成事件
            finishSubject(data){
                this.formShow = false
                this.subjectList[this.currentSubjectIndex] = Object.assign({},data)
            },
            // 提交
            async submit(){
                if(this.total===0){
                    this.$toast("请至少添加一门课程");return;
                }
                for (let i = 0; i < this.total; i++) {
                    let sitem = this.subjectList[i]
                    sitem.merchantId = this.$route.params.mid
                    if(!sitem.name || sitem.name==='未设置标题'){
                        this.$toast("课程标题输入有误");return
                    }
                    if(!sitem.rateType){
                        this.$toast("上课频率输入有误");return
                    }
                    if(!sitem.during){
                        this.$toast("每次课时长输入有误");return
                    }
                    if(!sitem.price){
                        this.$toast("价格输入有误");return
                    }
                    if(!sitem.total){
                        this.$toast("总次数输入有误");return
                    }
                    if(!sitem.maxStudents){
                        this.$toast("招生人数输入有误");return
                    }
                    if(!sitem.suitableAge){
                        this.$toast("适合年龄段输入有误");return
                    }
                    if(!sitem.advImg){
                        this.$toast("请为每门课程上传一张宣传图片");return
                    }
                }
                console.log(this.subjectList)
                let res = await saveSubjectBatch(this.subjectList)
                if (res.data === this.total) {
                    this.$router.push({name:'shop-joinstepthree'})
                }else{
                    this.$toast.fail({
                        message:'保存课程失败',
                        duration:2000
                    })
                }
            }
        },
        computed:{
            total(){
                return this.subjectList.length
            }
        },
        mounted(){
            this.listSubject()
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
        components: {Addsubject, Topback}
    }
</script>

<style scoped>
    .merchant-joinst-warp{
        margin-top:8px;
        background-color: white;
        margin-bottom:15px;
    }
    .jft-content{
        background-color: white;
    }
    .jft-content-addbtn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
    }
    .jft-content-addbtn button{
        border:1px solid #2cbe4e;
        background-color: white;
        color:#2cbe4e;
        margin-right:15px;
        height: 30px;
        padding:0 15px;
    }
    .remove_icon{
        margin-right:10px;
        color:#fc6b79;
    }
</style>
<style>
    .van-dialog__confirm, .van-dialog__confirm:active{
        color:#2cbe4e;
    }
    .van-picker__cancel, .van-picker__confirm{
        color:#2cbe4e;
    }
    .van-cell{
        font-size:12px;
    }
</style>