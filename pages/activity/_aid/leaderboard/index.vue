<template>
    <div class="a_leaderboard">
        <div 
            class="banner_box bg_img"
            style="background-image: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/tu/bbg.png);">商家热度排行榜</div>
        <div class="stage_box">
            <div class="stage_item st1" v-if="boardList[0]" @click="goMerchantPage(0)">
                <div 
                    class="st_img bg_img"
                    :style="'background-image: url('+boardList[0].logo+');'"></div>
                <div class="st_name ellipsis">{{boardList[0].name}}</div>
                <div class="st_hot"><span>热度</span>{{boardList[0].hotNum}}</div>
            </div>
            <div class="stage_item st2" v-if="boardList[1]" @click="goMerchantPage(1)">
                <div 
                    class="st_img bg_img"
                    :style="'background-image: url('+boardList[1].logo+');'"></div>
                <div class="st_name ellipsis">{{boardList[1].name}}</div>
                <div class="st_hot"><span>热度</span>{{boardList[1].hotNum}}</div>
            </div>
            <div class="stage_item st3" v-if="boardList[2]" @click="goMerchantPage(2)">
                <div 
                    class="st_img bg_img"
                    :style="'background-image: url('+boardList[2].logo+');'"></div>
                <div class="st_name ellipsis">{{boardList[2].name}}</div>
                <div class="st_hot"><span>热度</span>{{boardList[2].hotNum}}</div>
            </div>
            <div class="hot_list">
                <div 
                    class="hot_item bt"
                    @click="goMerchantPage(index+3)"
                    v-for="(item,index) in boardList.slice(3)"
                    >
                    <div class="hot_num">{{index+4}}</div>
                    <div class="hot_logo bg_img" :style="'background-image:url('+item.logo+');'"></div>
                    <div class="hot_name ellipsis">{{item.name}}</div>
                    <div class="hot_val"><span>热度</span>{{item.hotNum}}</div>
                </div>
            </div>
        </div>


        <ActivityTabbar :page="1" :aid="$route.params.aid" />
    </div>

</template>

<script>
    import {listLeaderBorder} from "~/assets/services/activity";
    import ActivityTabbar from '~/components/activity/activityTabbar'

    export default {
        name: "index",
        data(){
            return {
                aid:this.$route.params.aid,
            }
        },
        async asyncData({params}){
            let res = await listLeaderBorder({
                aid:params.aid
            })
            return {
                boardList:res.data
            }
        },
        methods:{
            goMerchantPage(index){
                this.$router.push({name:'activity-aid-merchant-mid',params:{aid:this.aid,mid:this.boardList[index].id}})
            }
        },
        mounted() {
            console.log(this.boardList)
        },
        components:{
            ActivityTabbar
        }

    }
</script>

<style scoped>
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

    .banner_box {
        height: 3.37rem;
        font-size: .36rem;
        line-height: .9rem;
        color: #fff;
        text-align: center;
        letter-spacing: 1px;
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

    .stage_box {
        background: #fff;
        border-radius: .28rem .28rem 0 0;
        position: relative;
        top: -.28rem;
        padding: 1.99rem .3rem .5rem;
    }

    .stage_box:before {
        content: '';
        width: 2.86rem;
        height: 1.46rem;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -.3rem;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/fist.png);
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }

    .stage_item {
        width: 1.87rem;
        text-align: center;
        height: 2.3rem;
        position: absolute;
    }

    .st_img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: .12rem;
        margin: 0 auto;
        background-color: #DC5F22;
    }

    .st_name {
        font-size: .32rem;
        line-height: .42rem;
        color: #0F1323;
        margin-top: .16rem;
    }

    .st_hot {
        color: #666;
        font-size: .24rem;
        line-height: .31rem;
        margin-top: .13rem;
    }

    .st_hot>span {
        color: #4188EC;
        margin-right: .05rem;
    }

    .stage_item:after {
        content: '';
        width: .42rem;
        height: .36rem;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -.49rem;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/xxxxx/guanjun.png);
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        z-index: 9;
    }

    .st1 {
        left: 0;
        right: 0;
        margin: auto;
        top: -.9rem;
    }

    .st1:after {
        top: -1.1rem;
    }

    .st2 {
        left: .56rem;
        top: -.6rem;
    }

    .st2:after {
        background-image: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/xxxxx/yajun.png);
    }

    .st3 {
        right: .56rem;
        top: -.6rem;
    }

    .st3:after {
        background-image: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/xxxxx/jijun.png);
    }

    .st1 .st_img {
        transform: scale(1.5,1.5);
        transform-origin: center bottom;
    }

    .bt {
        position: relative;
      }

      .bt:after {
        content: '';
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 1px;
        background: #E7E7E7;
        transform: scaleY(.5);
      }

      .hot_val:before {
          content: '';
          width: .2rem;
          height: .2rem;
          display: inline-block;
          background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/hot.png) no-repeat 0 0 / contain;
          margin-right: .1rem;
      }

      .hot_val>span {
          color: #4188EC;
          margin-right: .05rem;
      }

      .hot_item {
        height: 1.72rem;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        align-items: center;
      }

      .hot_num {
        width: .47rem;
        color: #333;
        font-size: .28rem;
        line-height: .37rem;
      }

      .hot_logo {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: .12rem;
        margin-right: .3rem;
      }

      .hot_name {
        color: #0F1323;
        font-size: .32rem;
        line-height: .42rem;
        width: 3.5rem;
      }
</style>