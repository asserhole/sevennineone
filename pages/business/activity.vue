<template>
    <!--我的活动页-->
    <div class="my-activity">
        <topback />
        <van-cell title="我发布的活动" style="margin-bottom:10px;" />
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-panel style="margin-bottom:8px;" @click="$router.push({name:'business-editactivity',query:{actid:item.id}})"
                       :title="item.name"
                       :desc="item.poster"
                       v-for="item in activityList"
            >
                <div style="display: flex;flex-direction: row-reverse;align-items: center" v-for="r in item.linkList">
                    <p>链接：{{r.link}}</p>
                    <img style="width:120px;height:90px;" :src="r.img" />
                    <button @click.stop="deleteLink(r.id)" style="height:0.56rem;background-color: white;color:#fc6b79;border:1px solid #fc6b79;">删除此活动链接</button>
                </div>
                <div slot="footer">
                    <van-button @click.stop="$router.push({name:'business-addActivityLink',query:{actid:item.id}})" size="small">新增活动链接</van-button>
                </div>
            </van-panel>


        </van-list>


    </div>

</template>

<script>
    import Topback from "../../components/topback";
    import {listMyActivity} from "../../assets/services/activity";
    import {deleteLink} from "../../assets/services/common";
    export default {
        name: "activity",
        data(){
            return {
                loading:false,
                activityList:[],
                current:1,
                total:0,
                rowCount:10,

            }
        },
        methods:{
            async listMyActivity(){
                let res = await listMyActivity({
                    current:this.current,
                    rowCount:this.rowCount
                })
                this.loading = false
                this.activityList = this.activityList.concat(res.data.list)
                this.total = res.data.total
            },
            onLoad(){
                if(!this.finished){
                    this.current +=1
                    this.listMyActivity()
                }
            },
            async deleteLink(id){
                let res = await deleteLink({
                    id:id
                })
                if(res.data > 0){
                    this.$notify({
                        message: '操作成功',
                        background: '#fc6b79'
                    })
                    this.current=1
                    this.total = 0
                    this.activityList = []
                    this.listMyActivity()
                }else{
                    this.$toast({
                        message: '操作失败',
                        duration: 1500
                    })
                }
            }
        },
        mounted(){
            this.listMyActivity()
        },
        computed:{
            finished(){
                return this.activityList.length === this.total && !this.loading
            }
        },
        components: {Topback}
    }
</script>

<style scoped>
    .van-cell{
        font-size:12px;
    }
</style>