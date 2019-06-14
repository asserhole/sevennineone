<template>
    <div class="uc-appointment">
        <topback/>
        <div style="margin-bottom:8px;">
            <van-cell title="预约试课"/>
        </div>
        <div style="margin-bottom:8px;">
            <van-cell @click="getActivityMerchant(i)" v-for="(r,i) in activityList" v-if="activityList.length > 0" :title="r.name" value="点击预约"
                      label="已获得体验资格"/>
        </div>
        <div v-if="showSelect">
            <van-tree-select
                    :items="items"
                    :main-active-index="mainActiveIndex"
                    :active-id="activeId"
                    @navclick="onNavClick"
                    @itemclick="onItemClick"
            />
        </div>

        <button v-if="showSelect" @click="submitAppointment" class="submit_btn">预约</button>

    </div>
</template>

<script>
    import Topback from "../../../../components/topback";
    import {listAppointmentA, submitAppoint} from "../../../../assets/services/reply";
    import {listMerchantByActivityId} from "../../../../assets/services/activity";
    import {getMobileInfo} from "../../../../assets/services/user";
    export default {
        name: "appointment",
        data(){
            return {
                activityList:[],
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: 0,
                // 选择的活动index
                activityIndex:-1,
                merchantList:[],
                items:[],
                // 是否显示选择器
                showSelect:false,
                mobile:null,
                mobileStatus:true
            }
        },
        methods:{
            async pageInit() {
                let res = await listAppointmentA()
                this.activityList = res.data
            },
            async getActivityMerchant(index){
                // 复位
                this.mainActiveIndex=0
                this.items = []
                this.showSelect = false
                this.activeId = 0

                this.activityIndex = index
                if (!this.merchantList[index]) {
                    // 请求数据
                    let res = await listMerchantByActivityId({
                        activityId: this.activityList[index].id
                    })
                    this.merchantList[index] = res.data
                }
                // 封装选择器对象
                for(let i=0;i<this.merchantList[index].length;i++){
                    let item = {}
                    item.text = this.merchantList[index][i].name
                    item.children = []

                    for(let j=0;j<this.merchantList[index][i].subjectList.length;j++){
                        let child = {}
                        child.text = this.merchantList[index][i].subjectList[j].name
                        child.id = this.merchantList[index][i].subjectList[j].id
                        // child.activityId = this.merchantList[index][i].subjectList[j]
                        item.children.push(child)
                    }

                    this.items.push(item)
                    this.showSelect = true
                }

            },
            onNavClick(index){
                this.mainActiveIndex = index
            },
            async onItemClick(subject){
                this.activeId = subject.id
                if(this.mobileStatus){
                    this.$toast.loading("请稍等...")
                    let res = await getMobileInfo()
                    this.$toast.clear()
                    this.mobile = res.data
                    this.mobileStatus = false
                }
                // console.log(index)
            },
            submitAppointment(){
                if(this.activeId === 0){
                    this.$toast("请在右侧选择课程");return;
                }
                if(!this.mobile){
                    this.$dialog.confirm({
                        title: '提示',
                        message: '您还没有绑定手机号,先去绑定手机号吧!'
                    }).then(() => {
                        this.$router.push({name:'user-bindphone'})
                    }).catch(() => {
                        // on cancel
                    });
                }else{
                    this.$dialog.confirm({
                        title: '提示',
                        message: '预约表示您同意商家或学校使用手机号'+this.mobile+"与您取得联系"
                    }).then(async () => {
                        let res = await submitAppoint(
                            {
                                activityId:this.activityList[this.activityIndex].id,
                                merchantId:this.merchantList[this.activityIndex][this.mainActiveIndex].id,
                                subjectId:this.activeId
                            }
                        )
                        if(res.data > 0){
                            this.$notify({
                                message:'预约成功',
                                background:'#fc6b79'
                            })
                            setTimeout(()=>{
                                this.$router.push({name:'activity-aid-users-myappointment'})
                            },2000)
                        }


                    }).catch(() => {
                        // on cancel
                    });
                }


            }
        },
        mounted(){
            this.pageInit()
        },
        computed:{

        },
        components: {Topback}
    }
</script>

<style scoped>
    .submit_btn{
        width:100%;
        position: fixed;
        bottom:0px;
        height:40px;
        color:white;
        background-color: #fc6b79;
        border:none;

    }
</style>
<style>
    .uc-appointment .van-cell{
        font-size:12px;
    }
    .uc-appointment .van-tree-select{
        font-size:12px;
    }
    .uc-appointment .van-tree-select__nav-item{
        height:44px;
        white-space: normal;
        line-height: normal;
    }
    .uc-appointment .van-tree-select__item--active{
        color:#fc6b79;
    }
    .uc-appointment .van-tree-select__nav-item--active{
        border-color:#fc6b79;
    }
    .van-dialog__confirm, .van-dialog__confirm:active{
        color:#fc6b79;
    }
    .van-picker__cancel, .van-picker__confirm{
        color:#fc6b79;
    }
</style>
