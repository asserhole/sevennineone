<template>
    <div id="a-merchant">
        <div class="a-merchant_bg clearfix">
            <div class="a-merchant_banner" :style="'background-image:url('+merchant.banner+');'">
                <span class="a-merchant_more">
                    查看图集&nbsp;>
                </span>
            </div>


            <div class="a-merchant_content">
                <p class="a-merchant_content_name">
                    <img :src="merchant.logo" />
                   {{merchant.name}}
                </p>
                <p class="a-merchant_gray">已报名人数</p>
                <p class="a-merchant_content_replycount">{{merchant.reply_count}}</p>
                <p class="a-merchant_content_info">
                    <i class="fa fa-tag" aria-hidden="true"></i>&nbsp;联盟卡可体验任意课程{{merchant.experienceNum}}次
                </p>
            </div>

            <div class="a-merchant_content">
                <p class="a-merchant_content_map" @click="$router.push({name:'activity-aid-merchant-mid-map',params:{aid:aid,mid:mid}})">
                    <i class="fa fa-location-arrow" aria-hidden="true"></i>&nbsp;{{merchant.address}}
                    <span class="pull-right"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                </p>
            </div>


            <div class="a-merchant_content">
                <p class="a-merchant_content_hst">课程（当前{{sliderPage}}/共{{merchant.subjectList.length}}门）</p>
                <slider ref="slider" :options="options" @slide="slide">
                    <slider-item v-for="(item,index) in merchant.subjectList" :key="index" >
                        <img :src="item.adv_img" />
                        <div class="a-merchant_content_slider_info">
                            <p class="a-merchant_content_slider_info_p">{{item.name}}</p>
                            <p class="a-merchant_content_slider_info_gray clearfix">
                                <span class="pull-left">{{item.start_time.substring(0,5)}}~{{item.end_time.substring(0,5)}}</span>
                                <span class="pull-right pink">{{item.price/100}}元/学期</span>
                            </p>
                            <p class="a-merchant_content_slider_info_gray clearfix">
                               招生：{{item.real_students}}/{{item.max_students}}人&nbsp;{{item.real_students>=item.max_students?'已满人':''}}
                            </p>
                            <p class="a-merchant_content_slider_info_gray clearfix">
                                开课日期：{{item.start_date}}
                            </p>
                            <p class="a-merchant_content_slider_info_gray">{{getRateLocal(item.rate_type,item.rate_num)}}，共{{item.total}}节</p>
                            <span class="gray a-merchant_content_slider_info_detail">查看详情&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></span>
                        </div>
                    </slider-item>
                    <div class="gray" v-if="merchant.subjectList.length===0" slot="loading">暂无信息</div>
                </slider>
            </div>

            <div class="a-merchant_content">
                <p class="a-merchant_content_hst">历史报名</p>
                <div v-if="replyHistoryTotal>0" :class="{'a-merchant_hisre_item_tw':i%2!==0}"
                     v-for="(r,i) in replyHistoryList" class="a-merchant_hisRe_item">
                    <div class="a-merchant_hisRe_img">
                        <img :src="r.avatar"/>
                    </div>
                    <span class="pink" style="margin-left:5px;">{{r.nickname}}<span style="color:#999">报名了</span></span>
                    <span style="margin-left:auto;" class="gray">{{r.createTime | formatDate}}</span>
                </div>
                <div v-if="replyHistoryTotal===0" class="a-merchant_hisRe_item">
                    <p class="gray">暂无信息</p>
                </div>
            </div>
        </div>
        <ReplyTabbar :page="-1" :aid="aid" :infoNum="replyInfoLen" @replyListClick="replyListClick"  :mid="$route.params.mid"/>

        <mt-popup class="a-merchant-reply-list"
                v-model="ReplyListVisible"
                popup-transition="popup-fade"
                position="bottom">
            <div @click="$router.push({name:'donate-uid',params:{uid:item.id}})" v-for="(item,index) in replyInfo" class="a-merchant-reply-list_item" :key="index">
                <div :style="'background-image:url('+item.imageList[0]+');'">
                </div>
                <div>
                    <mt-badge size="small" color="#fc6b79">{{item.childName}}</mt-badge>
                    <mt-progress :value="Math.round((item.paidFee/item.totalFee)*100)">
                        <div slot="start">￥{{item.paidFee/100}}</div>
                        <div slot="end">￥{{item.totalFee/100}}</div>
                    </mt-progress>
                </div>
            </div>
        </mt-popup>

    </div>
</template>

<script>
    import {seller} from "~/assets/services/shopping";
    import {wechat_arthorize_base} from "~/assets/utils/wechat";
    import {getCookie, setCookie} from "~/assets/utils/util";
    import {accessToken} from "~/assets/services/user";
    import {getMyReplyByMId} from "~/assets/services/reply";
    import ReplyTabbar from '../component/replyTabbar';
    import { getRate } from "~/assets/utils/util";
    import {listReplyByAidAndMid} from "~/assets/services/reply";

    export default {
        name: "_id",
        data(){
            return {
                replyInfo:[],
                aid:this.$route.params.aid,
                mid:this.$route.params.mid,
                subjectIndex:0,
                options: {
                    currentPage: 0,
                    pagination: false,
                    thresholdDistance:10
                },
                // 课程显示的页数
                sliderPage:0,
                replyInfoLen:0, //报名信息条数
                ReplyListVisible:false
            }
        },
        validate ({ params }) {
            // 必须是number类型
            return /^\d+$/.test(params.mid)
        },
        methods:{
            // 进入页面执行
            async page_init(){
                let openid = getCookie("token")
                if (openid === '') {
                    let code = this.$route.query.code
                    let state = this.$route.query.state
                    if (!code) {
                        wechat_arthorize_base(window.location.href)
                    } else {
                        let resUser = await accessToken({
                            code:code,
                            state:state
                        })
                        if(resUser.data.openid){
                            setCookie('token', resUser.data.openid, 7)
                            this.$store.commit('setOpenid',resUser.data.openid)
                        }
                        this.check_reply({
                            token:resUser.data.openid,
                            mid:this.merchant.id
                        })
                    }
                }else{
                    this.check_reply({
                        aid:this.aid,
                        mid:this.merchant.id
                    })
                }
            },
            // 查询自己是否报名
            async check_reply(params){
                let myReply = await getMyReplyByMId(params)
                this.replyInfo = myReply.data
                this.replyInfoLen = this.replyInfo.length
            },
            // 滑动事件
            slide(data){
                this.sliderPage = data.currentPage + 1
            },
            // 计算频率
            getRateLocal(rateType,rateNum){
                return getRate(rateType,rateNum)
            },
            // 查看列表点击事件
            replyListClick(){
                if (this.replyInfoLen >= 1) { // 如果多于一条信息，弹出框选择
                    this.ReplyListVisible = true
                }else{ //直接转跳到详情

                }
            }

        },
        async asyncData( {params} ){
            let res = await seller({
                id:params.mid,
                aid:params.aid
            })
            let replyHistory = await listReplyByAidAndMid({
                mid:params.mid,
                aid:params.aid,
                current:1,
                rowCount:10
            })
            return {
                merchant:res.data,
                replyHistoryList:replyHistory.data.list,
                replyHistoryTotal:replyHistory.data.total
            }
        },
        mounted() {
            // console.log(this.merchant)
            // console.log(this.replyHistoryList)
            // console.log(this.replyHistoryTotal)

            this.page_init()
        },
        components:{
            ReplyTabbar
        }
    }
</script>

<style scoped>
    .a-merchant_banner{
        height:190px;
        width:100%;
        overflow: hidden;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;
    }
    .a-merchant_bg{
        background: linear-gradient(to bottom, pink, white);
    }
    .a-merchant_more{
        position: absolute;
        bottom:20px;
        right:0;
        background-color: rgba(0, 0, 0, 0.8);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        color:white;
        padding:5px 8px;
    }
    .a-merchant_content{
        margin: 5px 20px;
        background-color: white;
        padding:15px;
    }
    .a-merchant_content_nomargin{
        background-color: white;
        padding:15px;
    }
    .a-merchant_content_name{
        height:40px;
        line-height: 40px;
        font-weight: 600;
    }
    .a-merchant_content_name img{
        display: inline-block;
        border-radius: 50%;
        height:40px;
        float:left;
    }
    .a-merchant_content_name p{
        display: inline-block;
        float:left;
        line-height:40px;
    }
    .a-merchant_content_replycount{
        color:#fc6b79;font-weight:600
    }
    .a-merchant_content_info{
        margin-top:10px;
        color:#999;
    }
    .a-merchant_gray{
        color:#999;
    }
    .a-merchant_content_map i{
        color:#999;
    }
    .a-merchant_content_hst{
        position: relative;
        padding-left:15px;
        color:#999;
    }
    .a-merchant_content_hst:before{
        content:'';
        position: absolute;
        background-color: #999999;
        width:3px;
        height:100%;
        top:0;
        left:0;
    }
    .a-merchant_content_slider_info{
        width:100%;
    }
    .a-merchant_content_slider_info_p{
        text-align: left;
        font-weight: 600;
    }
    .a-merchant_content_slider_info_gray{
        color:#999;
        text-align: left;
    }
    .gray{
        color:#999;
    }
    .pink{
        color:#fc6b79;
    }
    .a-merchant_content_slider_info_detail{
        position: absolute;
        bottom:5px;
        right:5px;
    }
    .a-merchant_hisRe_img{
        width:30px;
        height:30px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        float:left;
    }
    .a-merchant_hisRe_img img{
        height:30px;
        width:30px;
    }
    .a-merchant_hisRe_item{
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items:center;
        margin:5px 0;
    }
    .a-merchant_hisRe_item span{

    }
    .a-merchant_hisre_item_tw{
        background-color: #f6f8fa;
        border-radius: 3px;
    }
    .a-merchant-reply-list{
        width:100%;
        max-height:600px;
        overflow-y: scroll;
    }
    .a-merchant-reply-list_item{
        height:100px;
        padding:10px;
        border-bottom:1px solid #eee;
    }
    .a-merchant-reply-list_item>div{
        display: inline-block;
        float:left;
    }
    .a-merchant-reply-list_item>div:first-child{
        width:80px;
        height:80px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        margin-right:20px;
    }
    .a-merchant-reply-list_item .mt-progress{
        width:200px;
        color:#999;
        margin-top:10px;
    }
    .a-merchant-reply-list_item .mt-progress>div:first-child{
        padding-right: 10px;
    }
    .a-merchant-reply-list_item .mt-progress>div:last-child{
        padding-left: 10px;
    }
</style>
<style>
    #a-merchant{
        padding-bottom:55px;
    }
    #a-merchant .slider-item{
        color:black;
        font-size:12px;
        flex-direction: column;
    }
    #a-merchant .slider-container{
        padding:10px 0;
    }
</style>