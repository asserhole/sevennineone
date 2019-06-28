<template>
    <div class="goods-page">
        <div class="foods-wrapper">
            <ul v-if="goods.length>0">
                <li class="food-list food-list-hook">
                    <h1
                            :id="'a'+index"
                            class="title">热门课程</h1>
                    <ul>
                        <li
                                v-for="(item, index) in goods"
                                :key="index"
                                class="food-item border-1px">
                            <div 
                                class="icon"
                                :style="'background-image: url('+item.adv_img+');'">
                            </div>
                            <div class="content">
                                <h2 class="name">{{ item.name }}</h2>
                                <p class="desc">共{{item.total}}节 / {{ getRateLocal(item.rate_type,item.rate_num) }}</p>
                                <div class="extra">
                                    <span class="count">可报名人数：{{item.max_students - item.real_students}}</span>
                                    <span class="now">￥<b>{{ parseFloat(item.price/100) }}</b></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul v-else>
                <li class="food-list food-list-hook">
                    <h1
                            :id="'a'+index"
                            class="title">该机构还未设置课程</h1>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import * as shoppingApi from "~/assets/services/shopping";
    import { getRate } from "~/assets/utils/util";

    export default {
        props: {
            seller: {
                default: {}
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
                currentIndex: 0,
                isScroll: false
            };
        },
        computed: {},
        created() {
        },
        mounted() {
            shoppingApi.listSubject({
                merchantId: this.seller.id
            }).then(res => {
                if (res.code === 0) {
                    this.goods = res.data;
                }
            });

        },
        methods: {
            // 计算频率
            getRateLocal(rateType,rateNum){
                return getRate(rateType,rateNum)
            }
        },
    };

</script>

<style lang="scss">
    @import "../../../../assets/styles/mixin";

    .goods-page {
        display: flex;
        background: #fff;
        width: 100%;

        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            height: calc(100vh - 38px);
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            background: #f8f8f8;

            .menu-item {
                display: table;
                height: 54px;
                padding: 0 12px;
                line-height: 14px;

                &.current {
                    position: relative;
                    margin-top: -1px;
                    z-index: 10;
                    background: #ffffff;

                    .text {
                        color: #333;
                    }
                }

                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 12px;
                    height: 12px;
                    margin-right: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;

                    // &.decrease {
                    //   bg-image('decrease_3');
                    // }

                    // &.discount {
                    //   bg-image('discount_3');
                    // }

                    // &.guarantee {
                    //   bg-image('guarantee_3');
                    // }

                    // &.invoice {
                    //   bg-image('invoice_3');
                    // }

                    // &.special {
                    //   bg-image('special_3');
                    // }
                }

                .text {
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    position: relative;
                    color: #666;
                }
            }
        }

        .foods-wrapper {
            width: calc(100vw);
            height: calc(100vh - 38px);
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 60px;

            .title {
                padding-left: 14px;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #666;
            }

            .food-item {
                display: flex;
                margin: 10px;
                padding-bottom: 18px;
                position: relative;

                &:after {
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    content: " ";
                }

                &:last-child {
                    margin-bottom: 0;

                    &:after {
                        display: none;
                    }
                }

                .icon {
                    margin-right: 10px;
                    width: 80px;
                    height: 54px;
                    background-size: cover;
                    background-position: center center;
                }

                .content {
                    flex: 1;
                    position: relative;

                    .name {
                        margin: 2px 0 8px 0px;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }

                    .desc,
                    .extra {
                        line-height: 10px;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                        transform: scale(0.9) translateX(-6%);
                    }

                    .desc {
                        margin-bottom: 8px;
                        line-height: 12px;
                        max-width: px2rem(350px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .extra {
                        .count {
                            margin-right: 12px;
                        }

                        .now {
                            font-size: 20px;
                            color: #ff5339;
                            float: right;
                            position: relative;
                            top: -39px;
                        }
                    }

                    .price {
                        width: 100%;
                        font-weight: 700;
                        position: absolute;
                        bottom: 0;
                        @include fj(space-between);

                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }

                        b {
                            font-weight: normal;
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }

</style>
