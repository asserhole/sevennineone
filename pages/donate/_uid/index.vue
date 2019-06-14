<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="reply_detail_wrap">
                <div class="reply_detail_title clearfix">
            <span class="pull-left reply_detail_title_logo">
            </span>
                    <span class="pull-left reply_detail_title_name">趣教育</span>
                    <span class="pull-right reply_detail_title_btn">
                <button @click="goReplyPage">为萌娃报名</button>
            </span>
                </div>
                <div class="reply_detail_top clearfix">
                    <div class="reply_detail_user">
                        <div :style="{backgroundImage: 'url(' + replyDetail.userinfo.avatar + ')' }">
                        </div>
                        <span class="pink">
                {{replyDetail.userinfo.nickname}}
                 </span>
                        <span class="gray">
                    的报名
                </span>
                    </div>
                    <div class="clearfix reply_detail_childPhoto">
                        <img @click="imgView=true" v-for="(r,i) in replyDetail.imageList" :src="r.url"/>
                        <div class="reply_detail_poster clearfix">
                            <p>{{replyDetail.childName}}</p>
                            <p><i class="fa fa-flag" aria-hidden="true"></i>&nbsp;正在上{{replyDetail.schoolInfo |
                                schoolInfoFilter}}</p>
                            <p class="reply_detail_poster_desc">
                                <span>我想上{{replyDetail.merchantName}}的{{replyDetail.categoryName}}课程</span>
                                <span>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="reply_detail_progress_warp">
                    <p class="reply_detail_title_p">Ta的报名进度</p>
                    <div class="reply_detail_progress clearfix">
                        <div class="reply_detail_progress_step reply_detail_progress_step_l">
                            <p :class="{'finish_step':currStep>=5}">
                                <i class="fa" :class="{'fa-circle':currStep>=5,'fa-circle-o':currStep<5}"
                                   aria-hidden="true"></i>
                                <span>入学&nbsp;</span>
                            </p>
                            <p :class="{'finish_step':currStep>=4}">
                                <i class="fa" :class="{'fa-circle':currStep>=4,'fa-circle-o':currStep<4}"
                                   aria-hidden="true"></i>
                                <span>学费完成&nbsp;</span>
                            </p>
                        </div>
                        <no-ssr placeholder="Loading...">
                            <radial-progress-bar :diameter="150"
                                                 :completed-steps="completedSteps"
                                                 :total-steps="totalSteps"
                                                 startColor="#fc6b79"
                                                 stopColor="#fc6b79"
                                                 innerStrokeColor="#ccc"
                            >
                        <span class="progress_center">
                            <p><i class="fa fa-jpy" aria-hidden="true"></i>{{replyDetail.paidFee/100}}</p>
                            <p>已交</p>
                        </span>
                                <span class="progress_center">
                            <p><i class="fa fa-jpy" aria-hidden="true"></i>{{(replyDetail.totalFee - replyDetail.paidFee)/100}}</p>
                            <p>剩余</p>
                        </span>
                            </radial-progress-bar>
                        </no-ssr>
                        <div class="reply_detail_progress_step reply_detail_progress_step_r">
                            <p :class="{'finish_step':currStep>=1}">
                                <i class="fa" :class="{'fa-circle':currStep>=1,'fa-circle-o':currStep<1}"
                                   aria-hidden="true">&nbsp;</i>
                                <span>报名成功</span>
                            </p>
                            <p :class="{'finish_step':currStep>=2}">
                                <i class="fa" :class="{'fa-circle':currStep>=2,'fa-circle-o':currStep<2}"
                                   aria-hidden="true">&nbsp;</i>
                                <span>获得联盟卡</span>
                                <i class="fa fa-question-circle" @click="recommend(1)" aria-hidden="true"></i>
                            </p>
                            <p :class="{'finish_step':currStep>=3}">
                                <i class="fa" :class="{'fa-circle':currStep>=3,'fa-circle-o':currStep<3}"
                                   aria-hidden="true">&nbsp;</i>
                                <span>可支付剩余学费</span>
                                <i class="fa fa-question-circle" @click="recommend(2)" aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>

                </div>

                <div class="reply_detail_progress_warp">
                    <p class="reply_detail_title_p">助学排行榜</p>
                    <div class="reply_detail_order clearfix">
                        <div v-if="total>0" :class="{'back_odd':index%2!==0}" v-for="(item,index) in giftRecordList"
                             class="reply_detail_order_item">
                            <img :src="item.avatar"/>
                            <p>
                                <span class="pink">{{item.nickname}}</span>
                                送给Ta
                                <span class="pink">{{item.giftNum}}</span>
                                个
                                <span class="pink">{{item.giftName}}</span>
                            </p>
                            <img class="order_gift_img" :src="item.giftImg"/>
                            <span style="margin-left: auto;color:#999;">{{item.createTime | timeago}}</span>
                        </div>
                    </div>
                    <p class="reply_detail_order_more">
                        <span @click="loadMoreGiftRecord" v-if="total>10 && total>giftRecordList.length">查看更多，</span>
                        共{{total}}份礼物
                    </p>
                </div>

                <transition name="fade">
                    <div @click="imgView=false" v-if="imgView" class="img_preview">
                        <img v-for="(r,i) in replyDetail.imageList" :src="r.url"/>
                    </div>
                </transition>


                <Gift :giftList="giftList" @giftSend="giftSend"/>
                <Sku :gift="currGift" @payConfirm="payConfirmHandler"/>
            </div>
        </van-pull-refresh>
        <div>
            <DonateTabbar :aid="replyDetail.activityId"/>
        </div>
    </div>

</template>

<script>
    import {getReplyDetail, listGiftRecordByReplyId, wechatPay} from "../../../assets/services/reply";
    import RadialProgressBar from './components/RadialProgressBar'
    import DonateTabbar from './components/donateTabbar'
    import Gift from './components/gift'
    import {listGift} from "~/assets/services/common";
    import Sku from './components/sku'
    import {getJssdk} from "../../../assets/services/wechat";
    import config from "~/config/config.js"
    import {isWeixin, wxJssdkInit} from "../../../assets/utils/wechat";

    export default {
        name: "index",
        data() {
            return {
                imgView: false, //查看大图
                totalSteps: 100,
                diameter: 180,
                giftBarShow: false,
                giftList: [], // 礼物列表
                giftRecordList: [], //送礼记录列表
                currGift: {},
                isLoading: false, //下拉刷新是否在加载数据
                current: 1,
                total: 0,
            }
        },
        validate({params}) {
            // 必须是number类型
            return /^\d+$/.test(params.uid)
        },
        async asyncData({params}) {
            let res = await getReplyDetail({
                replyId: params.uid
            })
            let giftRes = await listGiftRecordByReplyId({
                replyId: params.uid
            })
            return {
                replyDetail: res.data,
                giftRecordList: giftRes.data.list,
                total: giftRes.data.total
            }
        },
        methods: {
            recommend(type) { // 介绍 1联盟卡2可支付剩余学费
                if (type === 1) {
                    this.$dialog.alert({
                        message: '联盟卡可体验本活动所有商家的指定课程，可直接购买或助学金达到99元后自动获得'
                    })
                }
                if (type === 2) {
                    this.$dialog.alert({
                        message: '报名成功后，报名发起人需要等到助学金额达到学费一半后，才可以交清剩余学费'
                    })
                }
            },
            async getGiftList() { // 查询礼物列表
                let res = await listGift();
                this.giftList = res.data
            },
            giftSend(gift) { //点击的礼物
                this.currGift = gift
            },
            async payConfirmHandler(data) { // 支付事件处理
                var that = this;
                let obj = {
                    replyId: that.$route.params.uid,
                    giftId: data.giftId,
                    giftNum: data.giftNum
                }
                let res = await wechatPay(obj); // 微信统一下单
                if (res.code === 0) {
                    console.log(res.data.timeStamp)
                    let currentStamp = res.data.timeStamp
                    window.wx.chooseWXPay({
                        timestamp: parseInt(currentStamp), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.data.paySign, // 支付签名
                        success: async function (succRes) {
                            if (succRes.errMsg === 'chooseWXPay:ok') {
                                await that.paySuccessCB(res.data.totalFee)
                                let donationRecordRes = await listGiftRecordByReplyId({replyId: that.$route.params.uid});
                                that.giftRecordList = donationRecordRes.data.list
                                that.total = donationRecordRes.data.total
                            }
                        },
                        fail:function () {
                            that.$store.commit('setSkuShowStatus', false)
                            that.$store.commit('setGiftBarShowStatus', false)
                            that.$toast.fail({
                                message: '支付失败',
                                duration: 1000,
                            })
                        }
                    });
                } else {
                    this.$toast.fail({
                        message: '支付失败',
                        duration: 3000
                    })
                }
            },
            async paySuccessCB(totalFee) { // 测试用
                var that = this
                that.$toast.clear()
                that.$toast.success({
                    message: '支付成功',
                    duration: 1000,
                })
                that.$store.commit('setSkuShowStatus', false)
                that.$store.commit('setGiftBarShowStatus', false)
                setTimeout(() => {
                    that.replyDetail.paidFee += totalFee
                }, 1200)
            },
            async onRefresh() {  // 下拉刷新
                this.isLoading = true
                let newReplyDetailRes = await getReplyDetail({replyId: this.$route.params.uid});
                let newReplyRecordRes = await listGiftRecordByReplyId({
                    replyId: this.$route.params.uid,
                    current: this.current,
                    rowCount: 10
                })
                this.isLoading = false
                this.replyDetail = newReplyDetailRes.data
                this.giftRecordList = newReplyRecordRes.data.list
                this.current = 1
            },
            async loadMoreGiftRecord() { //查看更多礼物
                let moreRecord = await listGiftRecordByReplyId({
                    replyId: this.$route.params.uid,
                    current: this.current + 1,
                    rowCount: 10
                })
                this.giftRecordList = this.giftRecordList.concat(moreRecord.data.list)
            },
            goReplyPage() { // 去到报名页
                this.$router.push({
                        name: 'activity-aid-merchant-mid-reply',
                        params: {
                            aid: this.replyDetail.activityId,
                            mid: this.replyDetail.merchantId
                        }
                    }
                )
            },
        },
        mounted() {
            console.log(this.replyDetail)
            console.log(this.giftRecordList)
            this.getGiftList()
            var that = this

            wxJssdkInit(window.location.href,
                [
                    'onMenuShareTimeline', // 分享到朋友圈
                    'chooseWXPay' //微信支付
                ],
                wx => {
                    wx.onMenuShareTimeline({
                        title: that.replyDetail.childName + '的入学进度，来助他一臂之力吧！',  // 分享标题
                        link: window.location.href.substring(0, window.location.href.indexOf("?")),   // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: that.replyDetail.imageList[0].url, // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        }
                    })
            })

            // 页面监听事件
            document.addEventListener('click', function (e) {
                let currEle = e.target
                let result = false
                while (currEle != null) {
                    if (currEle.className.indexOf('gift-overlay') !== -1
                        || currEle.className.indexOf('van-overlay') !== -1
                        || currEle.className.indexOf('fa-times') !== -1
                        || currEle.className.indexOf('sku-overlay') !== -1
                    ) {
                        result = true
                        break
                    } else {
                        currEle = currEle.parentElement
                    }
                }
                if (!result) {
                    that.$store.commit('setGiftBarShowStatus', false)
                }
            })
        },
        components: {
            RadialProgressBar, DonateTabbar, Gift, Sku
        },
        computed: {
            completedSteps() {
                return Math.round((this.replyDetail.paidFee / this.replyDetail.totalFee) * 100)
            },
            currStep() {
                let step = 1
                if (this.replyDetail.paidFee >= 9900) {
                    step = 2
                }
                if (this.replyDetail.paidFee >= (this.replyDetail.totalFee / 2)) {
                    step = 3
                }
                if (this.replyDetail.paidFee === this.replyDetail.totalFee) {
                    step = 4
                }
                // todo  入学状态
                return step
            },
            show() {
                return this.giftBarShow
            }
        }
    }
</script>

<style scoped>
    .reply_detail_wrap {
        padding-bottom: 50px;
    }

    .reply_detail_wrap > div {
        padding: 10px 10px;
    }

    .reply_detail_title {
        border-bottom: 1px solid #eeeeee;
        background-color: white;
    }

    .reply_detail_title_logo {
        width: 40px;
        height: 40px;
        background-image: url("https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/c31514038096dc04c14d51d87aed06ee.png");
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        margin-right: 5px;
    }

    .reply_detail_title_name {
        line-height: 40px;
        font-weight: 600;
        font-size: 20px;
        color: #2cbe4e;
    }

    .reply_detail_title_btn {
        line-height: 40px;
    }

    .reply_detail_title_btn button {
        border: 1px solid #2cbe4e;
        background-color: white;
        padding: 5px 10px;
        color: #2cbe4e;
        border-radius: 5px;
        height: 30px;
        line-height: 20px;
    }

    .reply_detail_top {
        margin: 5px 20px;
        background-color: white;
    }

    .reply_detail_user {
        line-height: 25px;
        display: flex;
    }

    .reply_detail_user > div:first-child {
        width: 25px;
        height: 25px;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        display: inline-block;
        border-radius: 50%;
        margin-right: 5px;
        over-flow: hidden;
    }

    .reply_detail_poster {
        margin: 10px 15px;
    }

    .reply_detail_poster > p:first-child {
        font-weight: 600;
    }

    .reply_detail_poster > p + p {
        color: #999;
        margin: 10px 0;
    }

    .reply_detail_childPhoto {
        margin: 10px 0px;
        display: flex;
    }

    .reply_detail_childPhoto img {
        width: 90px;
        height: 120px;
        border-radius: 10px;
        display: inline-block;
    }

    .reply_detail_poster_desc {
        display: flex;
        align-items: center;
    }

    .img_preview {
        width: 100%;
        height: 100%;
        background-color: #333333;
        position: absolute;
        top: 0;
        z-index: 2;
    }

    .reply_detail_progress_warp {
        margin: 5px 20px;
        background-color: white;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .reply_detail_progress_warp > p:first-child {
        margin: 5px;
    }

    .reply_detail_title_p {
        position: relative;
        padding-left: 15px;
    }

    .reply_detail_title_p:before {
        content: '';
        position: absolute;
        width: 3px;
        height: 100%;
        border-radius: 2px;
        background-color: #2cbe4e;
        left: 0px;
        top: 0;
    }

    .reply_detail_progress {
        display: flex;
        justify-content: space-around;
    }

    .reply_detail_progress_step {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100px;
    }

    .reply_detail_progress_step p {
        color: #999;
    }

    .reply_detail_progress_step_r p:first-child {
        margin-left: -10px;
    }

    .reply_detail_progress_step_r p:last-child {
        margin-left: -10px;
    }

    .reply_detail_progress_step_l p {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }

    .reply_detail_progress_step_r p {
        display: flex;
        align-items: center;
    }

    .reply_detail_progress_step_l p:first-child {
        text-align: right;
        margin-right: -10px;
    }

    .reply_detail_progress_step_l p:last-child {
        text-align: right;
        margin-right: -10px;
    }

    .progress_center {
        text-align: center;
    }

    .progress_center p:first-child {
        font-weight: 600;
        color: #2cbe4e;
        margin-bottom: 5px;
    }

    .reply_detail_order_item {
        display: flex;
        align-items: center;
        padding-left: 3px;
    }

    .reply_detail_order_item img:first-child {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        border-radius: 50%;
    }

    .order_gift_img {
        width: 40px;
        height: 40px;
        margin-left: 5px;
    }

    .reply_detail_order_more {
        text-align: center;
        color: #999;
        padding-top: 10px;
    }

    .finish_step {
        color: #2cbe4e !important;
    }

    .back_odd {
        background-color: #eee;
    }

    .gray {
        color: #999;
    }

    .pink {
        color: #fc6b79;
    }

    .bold {
        font-weight: 600;
    }
</style>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .reply_detail_wrap .radial-progress-inner {
        flex-direction: row;
        justify-content: space-evenly;
    }

    .van-dialog__confirm, .van-dialog__confirm:active {
        color: #fc6b79;
    }
</style>