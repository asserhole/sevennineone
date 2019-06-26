<template>
    <!-- 入驻第二步，填写课程信息 -->
    <div class="merchant-joinst">
        <topback />
        <van-cell value="课程设置" />

        <div class="merchant-joinst-warp clearfix">
            <van-cell value="修改" @click="openSubjectForm(i)" v-for="(r,i) in total" is-link >
                <template slot="title">
                    <span class="custom-text">{{subjectList[i].name}}</span>
                </template>
            </van-cell>
            <div class="jft-content">
                <div class="jft-content-addbtn">
                    <button @click="addSubject">
                        <i class="fa fa-plus" aria-hidden="true"></i>添加
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
        name: "subject",
        data(){
            return{
                activeNames:[], // 折叠面板
                subjectList:[], //课程列表
                formShow:false,
                currentSubjectIndex:-1,
                subjectTemplate:{
                    id:null,
                    name:null,
                    startDate:null,
                    endDate:null,
                    startTime:null,
                    endTime:null,
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
                let res = await listSubjectByToken()
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
            // 打开
            openSubjectForm(index){
                console.log("index:"+index)
                this.formShow = true
                this.currentSubjectIndex = index
            },
            // 一行完成事件
            finishSubject(data){
                this.formShow = false
                this.listSubject()
                this.currentSubjectIndex = -1
            },
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