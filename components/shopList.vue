<template>
    <div class="shoplist_container">
        <ul
                v-if="shopListArr.length"
                type="1">
            <router-link
                    v-for="item in shopListArr"
                    :to="{ path: 'shop', query:{id: item.id }}"
                    :key="item.id"
                    class="shop_li">
                <section>
                    <img
                            :src="item.logo"
                            class="shop_img">
                </section>
                <hgroup class="shop_right">
                    <header class="shop_detail_header">
                        <h4 class="shop_title ellipsis">{{ item.name }}</h4>
                    </header>
                    <h5 class="rating_order_num">
                        <section class="rating_order_num_left">

                            <p>热度：{{item.hot_num}}</p>
                        </section>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee">
                            ¥{{ item.address }}
                        </p>
                        <p class="distance_time">
                             <span>2.7km <span
                                     class="segmentation">/</span>
                             </span>
                            <span class="order_time">23分钟</span>
                        </p>
                    </h5>
                </hgroup>
            </router-link>
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
            "area"
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

        },
        mounted() {
            this.initData({
                current:1,
                rowCount:20,
                categoryId:this.categoryId,
                province:this.province,
                city:this.city,
                area:this.area
            });
        },
        methods: {
            async initData(param) {
                //获取数据
                let res = await listMerchant(param);
                // res.data.map(item => {
                //   item.image_path = config.IMG_URL + item.image_path;
                // });
                this.shopListArr = [...res.data];
            },
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
        border-bottom: 0.025rem solid #f1f1f1;
        padding: 0.7rem 0.4rem;
    }

    .shop_img {
        @include wh(2.7rem, 2.7rem);
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
        flex: auto;

        .shop_detail_header {
            @include fj;
            align-items: center;

            .shop_title {
                width: 8.5rem;
                color: #333;
                padding-top: 0.01rem;
                @include font(0.65rem, 0.65rem, "PingFangSC-Regular");
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
            @include fj(space-between);
            height: 0.6rem;
            margin-top: 0.52rem;

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
            margin-top: 0.52rem;
            @include fj;
            @include sc(0.5rem, #333);

            .fee {
                transform: scale(0.9);
                @include sc(0.5rem, #666);
            }

            .distance_time {
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
