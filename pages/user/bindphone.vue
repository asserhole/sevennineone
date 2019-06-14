<template>
    <!--绑定手机号-->
    <div class="bindphone">
        <topback />
        <van-cell value="绑定手机" />

        <van-cell v-if="bindStatus" title="您已绑定" :label="'您已与 '+bindPhoneNum+' 绑定，如需重新绑定，请填写下方绑定信息'" />

        <div class="bp-content">
            <van-cell-group>
                <van-field
                        v-model="phoneNum"
                        placeholder="请输入手机号"
                        :error-message="errorPhoneNum"
                />
                <van-field
                        v-model="smsCode"
                        center
                        clearable
                        placeholder="请输入短信验证码"
                >
                    <van-button @click="sendSms" :disabled="sendSmsDisable" slot="button" size="small" plain hairline type="danger">{{sendSmsText}}</van-button>
                </van-field>
            </van-cell-group>
            <button class="confirm_btn" @click="bindphone">确定</button>
        </div>
    </div>
</template>

<script>
    import Topback from "../../components/topback";
    import {bingPhone, getMobileInfo, sendSms} from "../../assets/services/user";
    export default {
        name: "bindphone",
        data(){
            return {
                phoneNum:'',
                smsCode:'',
                smsId:'',
                errorPhoneNum:'',
                sendSmsText:'发送验证码',
                sendSmsDisable:false,
                timer:null,
                count:10,
                bindStatus:false,
                bindPhoneNum:''
            }
        },
        methods:{
            async sendSms(){
                //手机号正则
                let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                //电话
                if (!phoneReg.test(this.phoneNum)) {
                    this.errorPhoneNum = '请输入正确的手机号'
                    return
                }else{
                    this.sendSmsDisable = true
                    this.timer = setInterval(()=>{
                        if(this.count > 0){
                            this.count--
                            this.sendSmsText = this.count + 's'
                        }else{
                            this.timer = null
                            this.sendSmsDisable = false
                            this.sendSmsText = '发送验证码'
                        }
                    },1000)
                    this.errorPhoneNum = ''
                    let res = await sendSms({
                        phoneNum:this.phoneNum
                    });
                    if(res.data > 0){
                        this.smsId = res.data
                    }else{
                        this.$notify({
                            message:'短信发送失败',
                            background:'#fc6b79'
                        })
                    }
                }
            },
            async bindphone(){
                let res = await bingPhone({
                    smsCode:this.smsCode,
                    smsId:this.smsId,
                    phoneNum:this.phoneNum
                })
                if (res.code === 0) {
                    this.$notify({
                        message:'绑定手机号成功',
                        background:'#fc6b79'
                    })
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },2000)
                }else{
                    this.$notify({
                        message:'绑定手机号失败',
                        background:'#fc6b79'
                    })
                }
            },
            async pageInit(){
                let res = await getMobileInfo()
                if(res.data){
                    this.bindStatus = true
                    this.bindPhoneNum = res.data
                }
            },

        },
        mounted(){
            this.pageInit()
        },
        components: {Topback}
    }
</script>

<style scoped>
    .bp-content{
        background-color: white;
        margin-top: 8px;
        padding:10px 15px;
    }
    .confirm_btn{
        height:30px;
        margin-left:15px;
        margin-top:15px;
        padding:0 15px;
        border:1px solid #fc6b79;
        background-color: #fc6b79;
        color:white;
    }
</style>