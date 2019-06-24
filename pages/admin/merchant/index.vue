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

            <van-panel style="margin-bottom:8px;" v-for="item in merchantList" class="audit-m-item" :title="item.name"
                       :desc="item.category_name"
                       :status="item.auditStatus===1?'待审核':item.auditStatus===2?'审核通过':'已拒绝'">
                <div class="audit-m-item_footer" slot="footer">
                    <div><span class="audit-m-item_footer_head">地点:</span><span>{{item.address}}</span></div>
                    <div><span class="audit-m-item_footer_head">简介:</span><span>{{item.description}}</span></div>
                    <div><span class="audit-m-item_footer_head">电话:</span><span>{{item.tel}}</span></div>
                    <div><span class="audit-m-item_footer_head">logo:</span>
                        <div @click="overlayImg=item.logo" class="audit-m-item_footer_img"
                             :style="'background-image:url('+item.logo+');'"></div>
                    </div>
                    <div><span class="audit-m-item_footer_head">banner:</span>
                        <div @click="overlayImg=item.banner" class="audit-m-item_footer_img" :style="'background-image:url('+item.banner+');'"></div>
                    </div>
                    <div><span class="audit-m-item_footer_head">营业执照:</span>
                        <div @click="overlayImg=item.businessLicense" class="audit-m-item_footer_img"
                             :style="'background-image:url('+item.businessLicense+');'"></div>
                    </div>
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

    export default {
        name: "index",
        data() {
            return {
                current: 1,
                rowCount: 10,
                total: 0,
                merchantList: [],
                loading: false,
                auditStatus: 1,
                option1: [
                    {text: '全部商家', value: 0},
                    {text: '已审核通过', value: 2},
                    {text: '待审核', value: 1},
                    {text: '已拒绝', value: 3},
                ],
                overlayImg: null,
                auditFailMsg:null,
                auditFailWindow:false,
                failMerchantId:null
            }
        },
        components: {Topback},
        methods: {
            async listMerchantForAudit() {
                let res = await listMerchantForAudit({
                    current: this.current,
                    rowCount: this.rowCount,
                    auditStatus: this.auditStatus
                })
                this.loading = false
                this.merchantList = res.data.list
                this.total = res.data.total
            },
            onLoad() { // 滚动加载
                if (!this.finished) {
                    this.current += 1
                    this.listMerchantForAudit()
                }

            },
            optionchange() {
                this.current = 1
                this.total = 0
                this.merchantList = []
                this.listMerchantForAudit()
            },
            auditRefuse(merchantId){
                this.auditFailWindow = true
                this.failMerchantId = merchantId
            },
            async fillMsg(){
                if(!this.auditFailMsg){
                    this.$toast({
                        message: '请输入审核拒绝原因',
                        duration: 1500
                    });
                    return;
                }
                let res = await this.auditPass(this.failMerchantId,3)
                if(res.data > 0){
                    this.$notify({
                        message: '审核成功',
                        background: '#fc6b79'
                    })
                    this.failMerchantId = null
                    this.auditFailMsg = null
                    this.auditFailWindow = false
                }
            },
            async auditPass(merchantId,auditStatus){
                let res = await auditMerchant({
                    auditFailMsg:this.auditFailMsg,
                    auditStatus:auditStatus,
                    merchantId:merchantId
                })
                if (res.data > 0) {
                    this.$notify({
                        message: '审核成功',
                        background: '#fc6b79'
                    })
                    this.listMerchantForAudit()
                    return res
                }else{
                    return {
                        data:0
                    }
                }
            }
        },
        mounted() {
            this.listMerchantForAudit()
        },
        computed: {
            finished() {
                return this.merchantList.length === this.total && !this.loading
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