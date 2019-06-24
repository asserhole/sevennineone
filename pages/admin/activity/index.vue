<template>
    <div class="">
        <topback/>
        <van-dropdown-menu style="margin-bottom:8px;">
            <van-dropdown-item @change="optionchange" v-model="auditStatus" :options="option1"/>
        </van-dropdown-menu>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >

            <van-panel style="margin-bottom:8px;" v-for="item in activityList" class="audit-m-item" :title="item.name"
                       :desc="item.poster"
                       :status="item.auditStatus===1?'待审核':item.auditStatus===2?'审核通过':'已拒绝'">
                <div class="audit-m-item_footer" slot="footer">
                    <div><span class="audit-m-item_footer_head">地点:</span><span>{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.area}}</span></div>
                    <div><span class="audit-m-item_footer_head">介绍:</span><span>{{item.description}}</span></div>
                    <div><span class="audit-m-item_footer_head">时间:</span><span>{{item.startDate}} 至 {{item.endDate}}</span></div>
                    <div><span class="audit-m-item_footer_head">活动图片:</span>
                        <div @click="overlayImg=item.logo" class="audit-m-item_footer_img"
                             :style="'background-image:url('+item.logo+');'"></div>
                    </div>
                    <div v-if="item.auditFailMsg"><span class="audit-m-item_footer_head">拒绝原因:</span><span>{{item.auditFailMsg}}</span></div>
                    <p v-if="item.auditStatus===1">
                        <van-button @click="auditRefuse(item.id,3)" size="small">审核拒绝</van-button>
                        <van-button @click="auditPass(item.id,2)" size="small" type="danger">审核通过</van-button>
                    </p>
                </div>
            </van-panel>
        </van-list>
        <div v-if="overlayImg" @click="overlayImg=null" class="audit_overlay">
            <img :src="overlayImg"/>
        </div>
        <van-popup
                v-model="auditFailWindow"
                position="top"
                :style="{ height: '20%' }"
        >
            <van-cell-group>
                <van-field v-model="auditFailMsg" placeholder="请输入拒绝原因" />
            </van-cell-group>
            <van-button @click="fillMsg" style="float:right;margin:10px 15px;height:35px;line-height:35px;" type="default">确定</van-button>
        </van-popup>
    </div>

</template>

<script>
    import {auditMerchant, listMerchantForAudit} from "../../../assets/services/shopping";
    import Topback from "~/components/topback";
    import {auditActivity, listActivityForAudit} from "../../../assets/services/activity";

    export default {
        name: "index",
        data() {
            return {
                current: 1,
                rowCount: 10,
                total: 0,
                activityList: [],
                loading: false,
                auditStatus: 1,
                status:0,
                option2: [
                    {text: '审核中', value: 0},
                    {text: '正常状态', value: 1},
                    {text: '已过期', value: 2},
                ],
                option1: [
                    {text: '全部商家', value: 0},
                    {text: '已审核通过', value: 2},
                    {text: '待审核', value: 1},
                    {text: '已拒绝', value: 3},
                ],
                overlayImg: null,
                auditFailMsg:null,
                auditFailWindow:false,
                failActivityId:null
            }
        },
        components: {Topback},
        methods: {
            async listActivityForAudit() {
                let res = await listActivityForAudit({
                    current: this.current,
                    rowCount: this.rowCount,
                    status: this.status,
                    auditStatus: this.auditStatus
                })
                this.loading = false
                this.activityList = res.data.list
                this.total = res.data.total
            },
            onLoad() { // 滚动加载
                if (!this.finished) {
                    this.current += 1
                    this.listActivityForAudit()
                }

            },
            optionchange() {
                this.current = 1
                this.total = 0
                this.activityList = []
                this.listActivityForAudit()
            },
            auditRefuse(activityId){
                this.auditFailWindow = true
                this.failActivityId = activityId
            },
            async fillMsg(){
                if(!this.auditFailMsg){
                    this.$toast({
                        message: '请输入审核拒绝原因',
                        duration: 1500
                    });
                    return;
                }
                let res = await this.auditPass(this.failActivityId,3)
                if(res.data > 0){
                    this.$notify({
                        message: '审核成功',
                        background: '#fc6b79'
                    })
                    this.activityId = null
                    this.auditFailMsg = null
                    this.auditFailWindow = false
                }
            },
            async auditPass(activityId,auditStatus){
                let res = await auditActivity({
                    auditFailMsg:this.auditFailMsg,
                    auditStatus:auditStatus,
                    activityId:activityId
                })
                if (res.data > 0) {
                    this.$notify({
                        message: '审核成功',
                        background: '#fc6b79'
                    })
                    this.listActivityForAudit()
                    return res
                }else{
                    return {
                        data:0
                    }
                }
            }
        },
        mounted() {
            this.listActivityForAudit()
        },
        computed: {
            finished() {
                return this.activityList.length === this.total && !this.loading
            }
        }
    }
</script>

<style scoped>
    .audit-m-item {
        margin-bottom: 8px;
    }

    .audit-m-item_footer > div {
        display: flex;
        justify-content: space-between;
    }

    .audit-m-item_footer_head {
        width: 60px;
    }

    .audit-m-item_footer_img {
        height: 120px;
        width: 90px;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .audit_overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top:0px;
        background-color: rgba(0, 0, 0, 0.7);
    }
</style>