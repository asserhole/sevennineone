<template>
    <!-- 添加课程表单 -->
    <div class="addsubject">
        <van-popup v-model="formShow" position="right" :overlay="false">
            <van-button @click="hideAddSubjectForm" class="form-back-btn" type="default">返回</van-button>
            <div class="jft-content-form">
                <van-cell-group>
                    <van-field
                            v-model="subjectItem.name"
                            required
                            clearable
                            label="课程名称"
                            placeholder="请输入课程名称"
                    />
                </van-cell-group>
                <div class="js-form-area">
                    <span>上课频率</span>
                    <van-button @click="rateShow=true" type="primary">{{subjectItem.rateType?subjectItem.rateTypeName+subjectItem.rateNumName:'点击选择'}}</van-button>
                </div>
                <van-cell-group>
                    <van-field
                            v-model="subjectItem.during"
                            required
                            clearable
                            label="每次课时长"
                            placeholder="请输入每次课时长"
                    >
                        <van-button class="price_slot_btn" disabled slot="button" size="small" type="primary">分钟</van-button>
                    </van-field>
                    <van-field
                            v-model="subjectItem.total"
                            required
                            clearable
                            label="总节数"
                            placeholder="请输入课程总节数"
                    />
                    <van-field
                            v-model="subjectItem.price"
                            required
                            clearable
                            label="报名总价"
                            placeholder="请输入价格，不支持小数"
                    >
                        <van-button class="price_slot_btn" disabled slot="button" size="small" type="primary">元/学期</van-button>
                    </van-field>
                    <van-field
                            v-model="subjectItem.maxStudents"
                            required
                            clearable
                            label="每班最多人数"
                            placeholder="请输入每班最多人数"
                    />
                    <van-field
                            v-model="subjectItem.realStudents"
                            required
                            clearable
                            label="已有人数"
                            placeholder="请输入已有人数"
                    />
                    <van-field
                            v-model="subjectItem.suitableAge"
                            required
                            clearable
                            label="适合年龄段"
                            placeholder="请输入适合年龄段"
                    >
                        <van-button class="price_slot_btn" disabled slot="button" size="small" type="primary">岁</van-button>
                    </van-field>
                    <van-field
                            v-model="subjectItem.description"
                            label="课程说明"
                            type="textarea"
                            placeholder="请输入课程说明"
                            rows="2"
                            autosize
                    />
                    <div class="js-form-area">
                        <span>课程宣传图片</span>
                        <div class="js-form-area_img">
                            <van-button @click="chooseLogoImg" type="primary">点击选择</van-button>
                            <img v-show="subjectItem.advImg" :src="advImgUrl" />
                        </div>
                    </div>
                </van-cell-group>

            </div>
            <div class="jf-next-btn clearfix">
                <van-button @click="finishSubject" plain type="primary">确定</van-button>
            </div>
        </van-popup>
        <!-- 上课频率 -->
        <van-popup v-model="rateShow" position="bottom" :overlay="true">
            <van-picker :columns="columns"
                        @confirm="confirmRate"
                        show-toolbar
                        @cancel="rateShow=false"
            />
        </van-popup>
    </div>
</template>

<script>
    import subjectrateList from '~/assets/utils/subjectrate'
    import {getRateTypeName} from "../../../assets/utils/util";

    export default {
        name: "addsubject",
        props:{
            formShow:{
                default:false
            },
            subjectList:{
                default(){
                    return []
                }
            },
            subjectIndex:{
                default:null
            }
        },
        data(){
            return {
                rateShow:false,
                columns: [
                    {
                        values: subjectrateList['rateType'],
                        className: 'column1'
                    },
                    {
                        values: subjectrateList['rateNum'],
                        className: 'column2',
                        defaultIndex: 2
                    }
                ],
                advImgUrl:'',
                subjectItem:{
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
            hideAddSubjectForm(){
                this.$emit("hideAddSubjectForm",false)
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
            // 频率
            confirmRate(data) {
                this.subjectItem.rateType = subjectrateList['rateType'].indexOf(data[0]) + 1
                this.subjectItem.rateNum = subjectrateList['rateNum'].indexOf(data[1]) + 1
                this.subjectItem.rateTypeName = data[0]
                this.subjectItem.rateNumName = data[1]
                this.rateShow = false
            },
            // 点击上传课程广告图片
            chooseLogoImg(){
                var that = this
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        that.advImgUrl = localIds[0] // 预览

                        // 上传图片
                        wx.uploadImage({
                            localId: that.advImgUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                that.subjectItem.advImg = res.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },
            // 完成
            finishSubject(){
                this.$emit('finishSubject',Object.assign({},this.subjectItem))
            },
        },
        watch:{
            subjectIndex(newValue,oldValue){
                this.subjectItem = Object.assign({},this.subjectList[newValue])
                this.subjectItem.rateTypeName = getRateTypeName(this.subjectItem.rateType)
                this.subjectItem.rateNumName = this.subjectItem.rateNum + '次'
            }
        }
    }
</script>

<style scoped>
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
    .form-back-btn{
        width:100%;
    }
    .jft-content-form{
        margin-top:8px;
        background-color: white;
    }
    .js-form-area{
        padding:10px 15px;
        display: flex;
    }
    .price_slot_btn{
        background-color: white;
        color:black;
        border:none;
    }
    .js-form-area_img{
        display: flex;
        flex-direction: column;
    }
    .js-form-area_img img{
        width:64px;
        height:64px;
    }
    .jf-next-btn{
        padding-right: 20px;
        background-color: white;
        padding-bottom: 15px;
        margin-bottom: 20px;
        padding-top: 15px;
    }
    .jf-next-btn .van-button{
        float:right;
        line-height: 30px;
        height: 30px;
    }
</style>
<style>
    .addsubject .van-popup--right{
        width:100%;
        height:100%;
        background-color: #f0f2f4;
    }

</style>