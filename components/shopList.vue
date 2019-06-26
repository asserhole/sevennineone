<template>
    <div class="shoplist_container">
        <ul
            v-if="shopListArr.length"
            type="1">
            <li
                v-for="item in shopListArr"
                @click="$router.push({ name: 'shop', query:{id: item.id }})"
                :key="item.id"
                class="shop_li">
                <div 
                    class="bg_img" 
                    style="width:64px;height:64px;flex-shrink: 0;background-size: cover;"
                    :style="'background-image:url('+item.logo+');'">
                </div>
                <div class="shop_right">
                    <header class="shop_detail_header">
                        <h4 class="shop_title ellipsis">{{ item.name }}</h4>
                    </header>
                    <h5 class="rating_order_num">
                        热度：<span style="color:#fc6b79">{{item.hot_num}}</span>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee ellipsis">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            {{ getAddress(item.address) }}
                        </p>
                        <p class="distance_time">
                             <span>2.7km <span
                                     class="segmentation">/</span>
                             </span>
                            <span class="order_time">23分钟</span>
                        </p>
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
        <div
                ref="abc"
                style="background-color: red;"/>
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

<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .shoplist_container {
        background-color: #fff;
    }

    .shop_li {
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        padding: .2rem;
    }

    .shop_img {
        width: 2.7rem;
        height: 2.4rem;
        display: block;
        margin-right: 0.4rem;
    }

    .list_back_li {
        height: 4.85rem;

        .list_back_svg {
            @include wh(100%, 100%);
        }
    }

    .shop_right {
        flex: 1;
        box-sizing: border-box;
        padding-left: 10px;
        .shop_detail_header {
            @include fj;
            align-items: center;

            .shop_title {
                width: 8.5rem;
                color: #333;
                padding-top: 0.01rem;
                @include font(16px, 30px, "PingFangSC-Regular");
                font-weight: 700;
            }

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

        .fee_distance {
            margin-top: 0.02rem;
            width: 5.5rem;
            @include fj;
            @include sc(12px, #333);

            .fee {
                transform: scale(0.9);
                @include sc(14px, #666);
            }

            .distance_time {
                font-size: 12px;
                width: 1.8rem;
                flex-shrink: 0;
                transform: scale(0.9);

                span {
                    color: #999;
                }

                .order_time {
                    color: $blue;
                }

                .segmentation {
                    color: #ccc;
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
