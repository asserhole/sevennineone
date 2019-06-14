<template>
    <div class="uc-myappointment">
        <topback />
        <van-cell title="我的预约"/>

        <div class="uc-mya-content" v-if="loadingStatus && this.appointmentList.length > 0">
            <van-panel class="uc-mya-content_item" v-for="(item,index) in appointmentList" :title="item.merchantName" :desc="dateFormat(item.createTime,'yyyy-MM-dd')" :status="getStatus(item.status)">
                <div class="uc-mya-content_center">
                    <span>您已预约课程</span>
                    <span class="pink">{{item.subjectName}}</span>
                    <span>的试课</span>
                </div>
                <div v-show="item.status === 0" slot="footer">
                    <van-button @click="cancleAppointment(index)" size="small" type="danger">取消预约</van-button>
                </div>
            </van-panel>
        </div>
        <div class="uc-mya-content" v-if="loadingStatus && this.appointmentList.length === 0">
            <p style="padding:10px 15px;">暂无数据</p>
        </div>
        <button @click="$router.push({name:'activity-aid-users-appointment'})" class="add_appointment">
            <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;我要预约
        </button>
    </div>
</template>

<script>
    import Topback from "../../../../components/topback";
    import {cancelAppointment, listMyAppointment} from "../../../../assets/services/reply";
    export default {
        name: "myappointment",
        data(){
            return {
                // 筛选条件
                statusOption:0,
                statusOptionArr:[
                    { text: '全部', value: -1 },
                    { text: '待处理', value: 0 },
                    { text: '接收中', value: 1 },
                    { text: '已取消', value: 2 },
                    { text: '已完成', value: 4 }
                ],
                // 数据集
                appointmentList:[],
                loadingStatus:false

            }
        },
        methods:{
            async listMyAppointment(){
                let res = await listMyAppointment({
                    isMerchant:false
                })
                this.loadingStatus = true
                this.appointmentList = res.data
            },
            dateFormat(datetime, formatStr){
                var dat = new Date(datetime);
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
            getStatus(status){
                let result = ''
                switch (status) {
                    case 0:
                        result = '等待商家确认';break;
                    case 1:
                        result = '商家已同意';break;
                    case 2:
                        result = '已取消';break;
                    case 4:
                        result = '已完成';break;
                }
                return result
            },
            async cancleAppointment(index){
                var that = this;
                that.$dialog.confirm({
                    title: '确认',
                    message: '确认要取消本次预约吗?'
                }).then(async () => {
                    let res = await cancelAppointment(
                        {
                            id:that.appointmentList[index].id
                        }
                    )
                    if(res.code ===  0){
                        this.$notify({
                            message:'操作成功',
                            background:'#fc6b79'
                        })
                        this.listMyAppointment()
                    }else{
                        this.$toast.loading("操作失败")
                    }


                }).catch(() => {
                    // on cancel
                });
            }
        },
        mounted(){
            this.listMyAppointment()
        },
        components: {Topback}
    }
</script>

<style scoped>
    .add_appointment{
        background-color: white;
        color:#fc6b79;
        width:100%;
        height:40px;
        margin-top:15px;
        border:1px solid #fc6b79;
    }
    .uc-mya-content{
        margin:8px 0;
    }
    .uc-mya-content_item{
        margin-bottom:5px;
    }
    .uc-mya-content_center{
        padding:10px 15px;
    }
    .gray{
        color:#999;
    }
    .pink{
        color:#fc6b79;
    }
    .bold{
        font-weight: 600;
    }
</style>
<style>
    .uc-myappointment .van-cell{
        font-size:12px;
    }
    .uc-myappointment .van-button--danger{
        background-color:#fc6b79;
        border-color: #fc6b79;

    }
</style>