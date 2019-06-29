<template>
    <div class="shoplist_container">
        <ul
            v-if="shopListArr.length"
            type="1">
            <li
                v-for="item in shopListArr"
                @click="$router.push({ name: 'shop', query:{id: item.id }})"
                :key="item.id"
                class="shop_li bb">
                <div class="item_up">
                    <div 
                        class="bg_img shop_img"
                        :style="'background-image:url('+item.logo+');'">
                    </div>
                    <div class="shop_right">
                        <h4 class="shop_title"><span class="ellipsis">{{item.name}}</span>
                            <p class="distance_time">
                                <span>2.7km<span class="segmentation">|</span></span><span class="order_time">23分钟</span>
                            </p>
                        </h4>
                        <div class="shop_introduce">“{{item.poster}}”</div>
                        <p class="hot_num"><span>热度</span>{{item.hot_num}}</p>
                        
                    </div>
                </div>
                <div class="item_down">
                    <h5 class="fee_distance ellipsis">
                        <i></i>{{ getAddress(item.address) }}
                    </h5>
                </div>
            </li>
        </ul>
        <p
                v-if="touchend"
                class="empty_data">没有更多了</p>
        <aside
                v-if="showBackStatus"
                class="return_top"
                @click="backTop">
            <svg class="back_top_svg">
                <use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xlink:href="#backtop"/>
            </svg>
        </aside>
        <div ref="abc" style="background-color: red;"/>
    </div>
</template>

<script>
    import ratingStar from "./ratingStar";
    import config from "~/config/config.js";
    import {
        listMerchant
    } from "~/assets/services/shopping";

    export default {
        props: [
            "categoryId",
            "province",
            "city",
            "area",
            'latng'
        ],
        data() {
            return {
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                shopListArr: [], // 店铺列表数据
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                touchend: false //没有更多数据
            };
        },
        watch: {
            city(newV,oldV){
                if(newV){
                    this.initData({
                        current:1,
                        rowCount:20,
                        categoryId:this.categoryId,
                        province:this.province,
                        city:this.city,
                        area:this.area,
                        latng:this.latng
                    });
                }
            }
        },
        mounted() {
            //todo  定位后不需要请求
            this.initData({
                current:1,
                rowCount:20,
                categoryId:this.categoryId,
                province:this.province,
                city:this.city,
                area:this.area,
                latng:this.latng
            });
        },
        methods: {
            async initData(param) {
                //获取数据
                let res = await listMerchant(param);
                // res.data.map(item => {
                //   item.image_path = config.IMG_URL + item.image_path;
                // });
                this.shopListArr = [...res.data.list];
            },
            // 地址处理，去掉市前面的字符
            getAddress(address){
                return address.substring(address.indexOf('县')+1).substring(address.indexOf('区')+1)
            }
        },
    };

</script>

<style scoped>
    .shoplist_container {
        background-color: #fff;
        padding: 0 .3rem;
    }

    .shop_li {
        padding: .5rem 0;
        height: 3.15rem;
    }

    .item_up {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
    }

    .shop_img {
        width: 2.1rem;
        height: 1.64rem;
        display: block;
        flex-shrink: 0;
        border-radius: .08rem;
    }

    .shop_right {
        flex: 1;
        padding-left: .2rem;
    }

    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bg_img {
      background-repeat: no-repeat;
      -webkit-background-size: contain;
      background-size: contain;
      background-position: center center;
    }

    .ellipsis2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;  
      -webkit-box-orient: vertical;
    }

    .ellipsis3 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;  
      -webkit-box-orient: vertical;
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

    .ra:after {
      content: '';
      display: inline-block;
      width: .18rem;
      height: .3rem;
      background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/gf_webapp/index/gengduo.svg) no-repeat;
      background-size: 100% 100%;
      background-position: 0 0;
      position: absolute;
      right: 0;
      top:0;
      bottom: 0;
      margin: auto;
    }

    .yuan:after {
      content: '元';
      line-height: .3rem;
      color: #333;
      font-size: .28rem;
      position: absolute;
      right: 0;
      top:0;
      bottom: 0;
      margin: auto;
      height: .3rem;
    }

    .oh {
      overflow: hidden!important;
    }

    .mask_wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 299;
    }

    .shop_title {
        font-size: .32rem;
        color: #0F1323;
        line-height: .42rem;
        font-weight: bold;
    }

    .shop_title>span {
        width: 2.8rem;
        display: inline-block;
    }

    .distance_time {
        font-size: .24rem;
        line-height: .31rem;
        color: #666;
        font-weight: normal;
        float: right;
        position: relative;
        top: .08rem;
    }

    .distance_time .segmentation {
        margin: 0 .1rem;
    }

    .shop_introduce {
        background: #FFF0E8;
        border-radius: .04rem;
        font-size: .26rem;
        line-height: .35rem;
        color: #E68454;
        display: inline-block;
        padding: .03rem .06rem;
        margin-top: .19rem;
    }

    .hot_num {
        color: #666;
        font-size: .24rem;
        line-height: .31rem;
        margin-top: .28rem;
    }

    .hot_num:before {
        content: '';
        width: .2rem;
        height: .2rem;
        display: inline-block;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm/hot.png) no-repeat 0 0 / contain;
        margin-right: .1rem;
    }

    .hot_num>span {
        color: #4188EC;
        margin-right: .05rem;
    }

    .fee_distance {
        color: #666;
        font-size: .24rem;
        line-height: .31rem;
        margin-top: .2rem;
    }

    .fee_distance>i {
        display: inline-block;
        width: .18rem;
        height: .22rem;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/index/dizhi.svg);
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        margin-right: .08rem;
        position: relative;
        top: .02rem;
    }

</style>

<style lang="scss" scoped>
    @import "../assets/styles/mixin";
    

     .shop_right{
        .shop_detail_header {
            @include fj;
            align-items: center;

            

            .premium::before {
                content: "品牌";
                display: inline-block;
                font-size: 0.5rem;
                line-height: 0.6rem;
                color: #333;
                background-color: #ffd930;
                padding: 0 0.1rem;
                border-radius: 0.1rem;
                margin-right: 0.2rem;
            }

            .shop_detail_ul {
                display: flex;
                transform: scale(0.8);
                margin-right: -0.3rem;

                .supports {
                    @include sc(0.5rem, #999);
                    border: 0.025rem solid #f1f1f1;
                    padding: 0 0.04rem;
                    border-radius: 0.08rem;
                    margin-left: 0.05rem;
                }
            }
        }

        .rating_order_num {
            display: flex;
            height: 0.6rem;
            margin-top: 0.2rem;
            color:#999;

            .rating_order_num_left {
                @include fj(flex-start);

                .rating_section {
                    display: flex;

                    .rating_num {
                        @include sc(0.4rem, #ff6000);
                        margin: 0 0.2rem;
                    }
                }

                .order_section {
                    transform: scale(0.8);
                    margin-left: -0.2rem;
                    @include sc(0.4rem, #666);
                }
            }

            .rating_order_num_right {
                display: flex;
                align-items: center;
                transform: scale(0.7);
                min-width: 5rem;
                justify-content: flex-end;
                margin-right: -0.8rem;

                .delivery_style {
                    font-size: 0.4rem;
                    padding: 0.04rem 0.08rem 0;
                    border-radius: 0.08rem;
                    margin-left: 0.08rem;
                    border: 1px;
                }

                .delivery_left {
                    color: #fff;
                    background-color: $blue;
                    border: 0.025rem solid $blue;
                }

                .delivery_right {
                    color: $blue;
                    border: 0.025rem solid $blue;
                }
            }
        }

        
    }

    .loader_more {
        @include font(0.6rem, 3);
        text-align: center;
        color: #999;
    }

    .empty_data {
        @include sc(0.5rem, #666);
        text-align: center;
        line-height: 2rem;
    }

    .return_top {
        position: fixed;
        bottom: 3rem;
        right: 1rem;

        .back_top_svg {
            @include wh(2rem, 2rem);
        }
    }

    .loading-enter-active,
    .loading-leave-active {
        transition: opacity 1s;
    }

    .loading-enter,
    .loading-leave-active {
        opacity: 0;
    }

</style>
