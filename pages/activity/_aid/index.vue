<template>
    <div id="activityIndex">
        <div class="a-head" :style="`background-image: url('${activityPO.logo}');`">

            <!-- 发起活动 -->
            <div class="launch" @click="addActivity"></div>

            <!-- 商家报名 -->
            <div class="shop_join" @click="merchantJoin"></div>
        </div>
        <div class="i_s_box">
            <input type="text" @focus="searchToast=true" placeholder="请输入机构或学生姓名查询">
        </div>
        <div class="i_s_content">
            <div class="counter_box">
                <div class="counter_up">距本次活动结束还剩：<TimeDown :time-end="timeEndHandler" :endTime="activityPO.endDate" /></div>
                <div class="counter_down">本次活动的最终解释权归趣教育所有</div>
            </div>
            <div class="c_title">活动介绍</div>
            <div class="introduce">{{activityPO.description}}</div>
            <div class="c_title">活动商家</div>
            <div class="c_shop">
                <div 
                    class="shop_item bb"
                    v-for="(item, index) in activityPO.merchantList"
                    @click="$router.push({name:'activity-aid-merchant-mid',params:{mid:item.id,aid:$route.params.aid}})"
                    :key="index">
                    <div 
                        class="item_img bg_img"
                        :style="'background-image:url('+item.logo+')'"></div>
                    <div class="item_text">
                        <div class="item_title">{{item.name}}<span>{{item.categoryName}}</span></div>
                        <div class="item_des ellipsis2">“{{item.poster}}”</div>
                        <div class="item_bottom">
                            <div>报名人数 {{item.replyCount}}</div>
                            <p><span>热度</span>{{item.hotNum}}</p>
                        </div>
                    </div>
                </div>
                <div @click="merchantJoin" class="a-content-join">我是商家，我想出现在这里</div>
            </div>
            <div v-if="activityPO.linkList.length > 0">
                <div class="c_title">活动链接</div>
                <div @click="$router.push({path:r.link})" v-for="r in activityPO.linkList" :style="'background-image:url('+r.img+');'" class="qkx"></div>
            </div>
        </div>

        <ActivityTabbar :page="0" :aid="$route.params.aid"/>

        <div class="search_toast" v-if="searchToast">
            <div id="top_nav1">搜索
              <span 
                @click="searchToast=false" 
                class="lefticon"></span>
            </div>
            <div class="i_s_box up_aniamte">
                <input 
                    v-model="sParams.word" 
                    v-focus 
                    type="text" 
                    placeholder="请输入机构或学生姓名查询"
                    @keyup.enter="searchByWords()">
            </div>
            <div
                class="list_box"
                v-if="list1.length>0||list2.length>0">
                <div class="a_lb_list_head a_lb_list_grap">
                    <div>商家</div>
                </div>
                <div 
                    @click="goMerchantPageList(item.id)"
                    v-for="(item,index) in list1"
                    v-if="list1.length>0"
                    class="a_lb_list bb">
                    <div class="a_lb_list_img" :style="'background-image:url('+item.logo+');'"></div>
                    <div>{{item.name}}</div>
                </div>
                <div class="a_lb_list_head a_lb_list_grap">
                    <div>学生</div>
                </div>
                <div 
                    @click="$router.push({name: 'donate-uid',params:{uid:item.id}})"
                    v-for="(item,index) in list2"
                    v-if="list2.length>0" 
                    class="a_lb_list bb">
                    <div class="a_lb_list_img" :style="'background-image:url('+item.imageList[0]+');'"></div>
                    <div>{{item.childName}}</div>
                </div>
            </div>
        </div>
        <p style="color:#999;margin-top:20px;text-align: center">趣教育——全民助学，圆孩子一个学习梦</p>
    </div>
</template>

<script>
    import ActivityTabbar from '~/components/activity/activityTabbar'
    import ActivityMerchant from '~/components/activity/activityMerchant'
    import TimeDown from '~/components/activity/timeDown'
    import { getActivityById } from '~/assets/services/activity'
    import {wechat_authorize_userinfo, wxJssdkInit} from "../../../assets/utils/wechat";
    import {getCookie, setCookie} from "../../../assets/utils/util";
    import {accessToken, token} from "../../../assets/services/user";
    import {getMerchantJoinInfo} from "../../../assets/services/shopping";
    import {getExistsByAidAndMid, search} from "../../../assets/services/activity";

    export default {
        name: "index",
        data(){
            return {
                searchToast: false,
                userinfo:{},
                sParams: {
                    aid: '',
                    word: ''
                },
                aid:this.$route.params.aid,
                list1: [],
                list2: [],
            }
        },
        async asyncData({params}){
            const res = await getActivityById({
                id:params.aid
            })
            return {
                activityPO:res.data
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        methods:{
            goMerchantPage(index){
                this.$router.push({name:'activity-aid-merchant-mid',params:{aid:this.aid,mid:this.boardList[index].id}})
            },
            goMerchantPageList(id){
                this.$router.push({name:'activity-aid-merchant-mid',params:{aid:this.aid,mid:id}})
            },
            async searchByWords(){
                var that = this;
                const res = await search(that.sParams)
                var d = res.data;
                that.list1 = d.merchantList;
                that.list2 = d.childList;
            },
            timeEndHandler(){ // 倒计时结束事件

            },
            // 商家加入活动
            async merchantJoin(){
                let localToken = getCookie("token")
                let code = this.$route.query.code
                let state = this.$route.query.state
                if(!localToken){
                    if (!code) {
                        wechat_authorize_userinfo(window.location.href)
                    }
                    if (code) {
                        let res = await accessToken({
                            code: code,
                            state: state
                        });
                        this.userinfo = JSON.parse(res.data.user)
                        if(res.data.openid){
                            setCookie('token', res.data.openid, 7)
                            this.$store.commit('setOpenid',res.data.openid)
                        }
                    }
                }else{
                    let res = await token()
                    this.userinfo = JSON.parse(res.data)
                }

                let merchantRes = await getMerchantJoinInfo()
                if(merchantRes.data){
                    let exists = await getExistsByAidAndMid({
                        aid:this.aid
                    })
                    if(exists.data){
                        this.$toast({
                            message: '您已加入活动',
                            duration: 1500
                        })
                    }else{
                        if(merchantRes.data.auditStatus === 2){ // 已经是商家了，直接填写数据加入活动
                            this.$router.push({name:'activity-aid-join',params:{aid:this.aid,status:1}})
                        }else if(merchantRes.data.auditStatus === 1){ // 正在审核中的商家
                            this.$dialog.confirm({
                                title: '请确认',
                                message: '您提交的商家入驻数据正在审核中，若加入活动需等待审核通过才能生效~'
                            }).then(() => {
                                this.$router.push({name:'activity-aid-join',params:{aid:this.aid,status:0}})
                            })
                        }else if(merchantRes.data.auditStatus === 0){ // 未入驻的商家
                            this.$dialog.confirm({
                                title: '请确认',
                                message: '您还没有成为商家，现在就去成为商家吧~'
                            }).then(() => {
                                this.$router.push({name:'shop-join'})
                            })
                        }
                    }
                }else{
                    this.$dialog.confirm({
                        title: '请确认',
                        message: '您还没有成为商家，现在就去成为商家吧~'
                    }).then(() => {
                        this.$router.push({name:'shop-join'})
                    })
                }

            },
            // 发起活动
            addActivity(){
                this.$router.push({name:'activity-add'})
            }
        },
        components:{
            ActivityTabbar,TimeDown,ActivityMerchant
        },
        mounted() {
            console.log(this.activityPO)
            var that = this;
            document.title=this.activityPO.name
            that.sParams.aid = that.$route.params.aid;
            wxJssdkInit(window.location.href,
                [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                ],
                wx => {
                    wx.onMenuShareTimeline({
                        title: that.activityPO.name, // 分享标题
                        link: 'window.location.href', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/c31514038096dc04c14d51d87aed06ee.png', // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    })
                    wx.onMenuShareAppMessage({
                        title: that.activityPO.name, // 分享标题
                        desc: '99元享抵扣学费、体验活动所有商家课程好礼', // 分享描述
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/c31514038096dc04c14d51d87aed06ee.png', // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        }
                    });
                })
        }
    }
</script>

<style scoped>
    #activityIndex {
        padding-bottom: 1.2rem;
        background: #fff;
    }
    .a-head{
        width:100%;
        height:4rem;
        overflow: hidden;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .a-head img{
        width:100%;
        height:100%;
    }

    .i_s_box {
       width: 6.9rem; 
       height: .9rem;
       box-shadow:0px 2px 4px 0px rgba(45,45,84,0.16);
       border-radius:.06rem;
       position: absolute;
       left: 0;
       right: 0;
       margin: auto;
       top: 3.6rem;
       z-index: 2;
       padding-left: .94rem;
       background: #fff url(http://gaif.oss-cn-hangzhou.aliyuncs.com/gf_webapp/search.svg) no-repeat .4rem center / .34rem .34rem;
    }

    .i_s_box>input {
        width: 100%;
        height: 100%;
        display: block;
        border: none;
        outline: none;
        font-size: .28rem;
    }

    .a-content-bg{
        width:100%;
        background-size: 100%;
        position: relative;
        box-sizing:border-box;
        padding-bottom:55px;
        background: linear-gradient(to bottom, pink, white);
    }
    .a-content-warp>div{
        margin:5px 20px;
        background-color: white;
    }
    .a-title{
        padding:15px;
    }

    .a-title>p{
        text-align: left;
        display: inline-block;
        z-index:12;
        font-size:20px;
    }
    .a-time{

    }
    .a-time>div{
        font-size:20px;
    }
    .a-time>div svg{
        width:24px;
        margin-left:15px;
        float:left;
    }
    .a-time>div span{
        float:left;
        line-height: 64px;
        margin-left:15px;
    }
    .a-content-warp{
        left: 0;
        top: 0;
        width: 100%;
        /*background-image: linear-gradient(to bottom , rgba(255, 255, 255, 0), rgb(251, 251, 251));*/
    }
    .a-content{
        padding:15px;
    }
    .a-content p{
        position: relative;
        padding-left:15px;
        margin-bottom:10px;
    }
    .a-content p:before{
        content:'';
        position: absolute;
        width:3px;
        height:100%;
        left:0;
        top:0;
        background-color: #999;
    }
    .a-desc{
        z-index:13;
        color:black;
        background-color: white;
        line-height: 20px;
    }
    .shoplist-title{
        text-align: left;
    }
    .a-content-join{
        color:#BD987C;
        margin-top:.4rem;
        text-align: right;
        margin-bottom: .1rem;
    }
    .a-content-join:before {
        content: '';
        width: .56rem;
        height: .38rem;
        display: inline-block;
        position: relative;
        top: .07rem;
        margin-right: .09rem;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/shangjia.png) no-repeat 0 0 / contain;
    }
    .a-desc-origin{
        display: flex;
        justify-content: space-between;
    }
    .add-activity{
        color:#999;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        padding:0 5px;
    }

    .i_s_content {
        background: #fff;
        padding-top: 1rem;
    }

    .counter_box {
        width: 7.2rem;
        height: 1.64rem;
        border-radius: .14rem 0 0 .14rem;
        overflow: hidden;
        margin-left: .3rem;
        background:linear-gradient(90deg,rgba(245,92,68,1) 0%,rgba(255,75,148,1) 100%);
    }

    .counter_up {
        height: 1rem;
        line-height: 1rem;
        padding-left: .2rem;
        font-size: .28rem;
        color: #fff;
    }

    .counter_down {
        background: #FFECE9;
        height: .64rem;
        line-height: .64rem;
        padding: 0 .3rem;
        text-align: right;
        font-size: .22rem;
        color: #D47A7B;
    }

    .c_title {
        color: #0F1323;
        font-size: .36rem;
        line-height: .47rem;
        padding-top: .6rem;
        padding-bottom: .3rem;
        font-weight: bold;
        padding-left: .3rem;
        position: relative;
    }

    .c_title:before {
        content: '';
        background: #FF7112;
        height: .28rem;
        position: absolute;
        left: 0;
        top: .7rem;
        width: .06rem;
    }

    .introduce {
        padding: 0 .3rem;
        color: #636A7C;
        font-size: .28rem;
        line-height: .46rem;
    }

    .bg_img {
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center center;
    }

    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bb {
      position: relative;
    }

    .bb:before {
      content: '';
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      background: #E7E7E7;
      transform: scaleY(.5);
    }

    .c_shop {
        padding: 0 .3rem;
    }

    .shop_item {
        padding: .5rem 0;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
    }

    .item_img {
        width: 2.1rem;
        height: 1.64rem;
        border-radius: .08rem;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .item_text {
        flex: 1;
        height: .164rem;
        padding-left: .2rem;
    }

    .item_title {
        font-size: .32rem;
        font-weight: bold;
        color: #0F1323;
        line-height: .42rem;
    }

    .item_title>span {
        display: inline-block;
        background: #12A9FF;
        color: #fff;
        font-size: .24rem;
        line-height: 1.5;
        padding: .01rem .12rem .02rem;
        border-radius: .2rem .03rem .2rem .03rem;
        float: right;
        font-weight: normal;
    }

    .item_des {
        color: #999;
        font-size: .26rem;
        line-height: .35rem;
        padding-top: .12rem;
        height: .81rem;
        margin-bottom: .1rem;
    }

    .ellipsis2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;  
        -webkit-box-orient: vertical;
      }

    .item_bottom {
        color: #666;
        font-size: .24rem;
        line-height: .31rem;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        justify-content: space-between;
    }

    .item_bottom>p:before {
        content: '';
        width: .2rem;
        height: .2rem;
        display: inline-block;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/hot.png) no-repeat 0 0 / contain;
        margin-right: .1rem;
    }

    .item_bottom>p>span {
        color: #4188EC;
        margin-right: .05rem;
    }

    .launch {
        width: .87rem;
        height: .75rem;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/faqi.png) no-repeat 0 0 /contain;
        position: absolute;
        right: .3rem;
        top: 1.3rem;
    }

    .shop_join {
        width: .82rem;
        height: .75rem;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/baoming.png) no-repeat 0 0 /contain;
        position: absolute;
        right: .3rem;
        bottom: .8rem;
    }

    .qkx {
        height: 3rem;
        /*background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/qxk.png);*/
        -webkit-background-size: cover;
        background-size: cover;
        width: 6.9rem;
        margin: 0 auto;
        margin-bottom:10px;
    }

    .search_toast {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
    }

    @keyframes toup {
        from {
            top: 3.6rem;
        }
        to {
            top: 1.2rem;
        }
    }

    .up_aniamte {
        top: 1.2rem;
        animation: toup .2s linear;
    }

    #top_nav1 {
        background: #fff;
        height: 1rem;
        line-height: 1rem;
        position: relative;
        text-align: center;
        color: #333;
        font-size: .36rem;
        box-shadow:0rem 0.01rem 0rem 0rem rgba(218,218,218,1);
      }
      #top_nav1 .lefticon {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/gf_webapp/login/left_arrow.svg) no-repeat center center / .4rem .4rem;
      }

      .a_leaderboard{
          width: 100%;
          position: fixed;
          background: white;
          height: 100%;
          overflow: scroll;
          padding-bottom:55px;
      }
      .a_lb_list{
          display: flex;
          align-items: center;
          padding:4px 15px;

      }
      .a_lb_list_img{
          height:50px;
          width:50px;
          background-size: cover;
          background-repeat: no-repeat;
          margin:0 15px;
      }
      .a_lb_list_hot{
          margin-left: auto;
          margin-right:20px;
          font-size:14px;
          font-weight:600;
          color:#fc6b79;
      }
      .a_lb_list_grap{
          background-color: #eee;
      }
      .a_lb_list_head{
          height:35px;
          display: flex;
          justify-content: space-between;
          padding:0 35px 0 15px;
          line-height: 35px;
      }

      .list_box {
        padding-top: 1.3rem;
      }
</style>
<style>

    .van-dialog__confirm, .van-dialog__confirm:active{
        color:#fc6b79;
    }

    #activityIndex .counter_up b {
        color: #FF3047;
        padding: .05rem .1rem;
        background: #fff;
        border-radius: .04rem;
        margin-right: .08rem;
        margin-left: .08rem;
    }
</style>