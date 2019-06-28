<template>
    <div class="shop-header">
        <!-- <topback/> -->
        <div class="head" :style="`background-image: url('${banner}');`">
            <div class="shop-logo" :style="`background-image: url(${seller.logo});`">
            </div>

            <!--<img-->
            <!--:src="seller.logo"-->
            <!--class="shop-logo">-->
        </div>
        <div class="content">
            <h2>{{ seller.name }}</h2>
            <div class="info">
                <span>本月有2人报名</span>
            </div>
        </div>
        <div class="foot">
            <p>
                <mt-badge
                    size="small"
                    color="rgb(240, 115, 115)">免费试课</mt-badge>最近试课日期：3天后（2019-05-09 06:00）
            </p>
            <span class="announcement">公告：免费试课为2次，谢谢！我们将竭诚为您服务！</span>
        </div>
    </div>
</template>

<script>
    import config from "~/config/config";
    import Topback from "../../../components/topback";

    export default {
        components: {Topback},
        props: {
            seller: {
                default: {}
            }
        },
        computed: {
            banner: function () {
                return this.seller.banner;
            }
        }
    };

</script>

<style lang="scss">
    @import "../../../assets/styles/mixin";

    .shop-header {
        background: #fff;
        padding-bottom: .2rem;
        .head {
            height: 190px;
            background-position: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;

            .shop-logo {
                width: 64px;
                height: 64px;
                position: absolute;
                bottom: -32px;
                background-color: white;
                background-size: contain;
                background-position: center center;
                background-repeat: no-repeat;
                left: 50%;
                transform: translateX(-50%);
            }
        }


        .content {
            font-size: .24rem;
            margin-top:40px;;
            text-align: center;

            h2 {
                font-size: .4rem;
            }

            .info {
                color: #666;

                span {
                    margin: 0 .1rem;
                }
            }
        }

        .foot {
            padding: 0 .7rem;
            margin-top: 10px;
            font-size: .24rem;

            .mint-badge {
                transform: scale(0.8) translateX(-10%);
                border-radius: 1px;
            }

            .announcement {
                display: inline-block;
                width: 100%;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

</style>
