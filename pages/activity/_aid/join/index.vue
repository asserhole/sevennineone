<template>
    <!-- 商家加入活动 -->
    <div class="activity_join">
        <van-cell style="margin-bottom:8px;" title="加入活动" />

        <van-cell-group>
            <van-field
                    v-model="experienceNum"
                    clearable
                    label="可体验次数"
                    @blur="validateNum"
                    placeholder="请输入数字"
            />
            <div class="activity_join_tip">
                <van-radio-group v-model="radio">
                    <van-radio name="1">
                        <p style="color:#999;">您需要同意联盟卡用户在您的入驻商户中，可体验
                        <span v-if="experienceNum">{{experienceNum}}</span>
                        <span v-else>-</span>
                        次课程，并愿意接受趣教育平台监督</p>
                    </van-radio>
                </van-radio-group>


            </div>
            <button class="submit_btn" @click="join">确定</button>

        </van-cell-group>
    </div>
</template>

<script>
    import {joinActivity} from "../../../../assets/services/activity";

    export default {
        name: "index",
        data(){
            return {
                activityId:this.$route.params.aid,
                status:this.$route.params.status, //入驻状态，等审核
                experienceNum:null,
                radio:0,
                disableBtn:true
            }
        },
        methods:{
            // 验证数字
            validateNum(){
                this.experienceNum = isNaN(parseInt(this.experienceNum))?null:parseInt(this.experienceNum)
            },
            async join(){
                if(isNaN(this.experienceNum) || this.experienceNum <= 0){
                    this.$toast({
                        message: '请输入正确的体验次数',
                        duration: 1500
                    })
                    return
                }
                if(this.radio!=='1'){
                    this.$toast({
                        message: '您需要同意上述加入活动条件',
                        duration: 1500
                    })
                    return
                }
                let res = await joinActivity({
                    aid:this.activityId,
                    experienceNum:this.experienceNum,
                    status:this.status
                })
                console.log(res)
                if(res.code!==0){
                    this.$toast.fail({
                        message: '操作失败:'+res.message,
                        duration: 3000
                    })
                }else{
                    this.$notify({
                        message: '操作成功',
                        background: '#fc6b79'
                    })
                    setTimeout(()=>{
                        this.$router.push({name:'activity-aid',params:{aid:this.activityId}})
                    },1000)
                }

            }
        },
        mounted() {
            console.log(this.activityId)
            console.log(this.status)
        }
    }
</script>

<style scoped>
    .activity_join_tip{
        padding:10px 15px;
    }
    .submit_btn{
        width:100%;
        height:40px;
        background-color: #fc6b79;
        color:white;
        margin:15px 0;
        border:none;
    }
</style>
<style>
    .activity_join .van-cell{
        font-size:12px;
    }
    .van-radio__icon--checked .van-icon{
        background-color: #fc6b79;
        border-color: #fc6b79;
    }

</style>