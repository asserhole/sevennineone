<template>
    <div class="home-page">
        <div class="banner_box">
            <div class="city_select" @click="$router.push({name:'cityselect'})">
                <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;{{city}}
            </div>
        </div>
        <nav class="nav-container">
            <div
                v-for="(item, index) in navList"
                :key="index"
                class="nav-item"
                @click="$router.push({path:'/newretail', query:{ title: item.id ,name:item.text }})">
            <img
                :src="item.imgUrl">
                {{ item.text }}
            </div>
        </nav>
        <div class="show-list">
            <a @click="$router.push({name:'activity-aid',params:{aid:1}})">
                <img
                        :src="show1"
                        alt="">
            </a>
            <a @click="$router.push({name:'activity-aid',params:{aid:2}})">
                <img
                        :src="show2"
                        alt="">
            </a>
        </div>
        <div style="height:5px;clear:both"/>
        <div class="swiper">
            <mt-swipe
                    :auto="3000"
                    style="height:100px;">
                <mt-swipe-item
                        v-for="(item, index) in bannerList"
                        :key="index">
                    <img
                            :src="item"
                            alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div style="height:10px;clear:both"/>
        <p class="shoplist-title">—— 推荐机构 ——</p>
        <ShopList :city="city" :latng="latng"/>
        <Tabbar page="0"/>
    </div>
</template>

<script>
    import Tabbar from "~/components/tabbar"
    import ShopList from "~/components/shopList"
    import config from "~/config/config.js"
    import {
        getHomeData
    } from "~/assets/services/common";
    import {wxJssdkInit} from "../assets/utils/wechat";


    export default {
        components: {
            Tabbar, ShopList
        },
        data() {
            return {
                data: "静安区",
                // navList: [],
                show1: `https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/d2806dc1384b70c9bdd57d054eba99ec.png`,
                show2: `https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/9a7dcd0ce180aabcf5eafcd847b1ed2f.png`,
                bannerList: [
                    `https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/64ca6a0b5dcf5226fe07df429b82a692.png`,
                    `https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/93a4c7fa855e5edda5d45c8c45ddf2b5.png`,
                    `https://sevennineone.oss-cn-hangzhou.aliyuncs.com/default/2e83576f418958d43b3a33ee037748dc.png`,
                ],
                city: '岳阳市',
                latng: '',
            };
        },
        methods: {
            pageInit() {
                var that = this
                var localCity = localStorage.getItem('city')
                if (localCity) {
                    that.city = localCity
                }
                if (this.$route.params.city) {
                    that.city = this.$route.params.city
                }
                // var geolocation = new qq.maps.Geolocation("XOOBZ-3G2WU-ME2VZ-4AG7A-4NDTT-Z4F7O", "791");
                // if(geolocation){
                //     geolocation.getLocation( position=>{
                //         console.log('position');
                //         console.log(position);
                //         if(!localCity && !that.$route.params.city){
                //             that.city = position.city
                //         }
                //         that.latng = position.lat + ',' + position.lng
                //     }, ()=>{
                //         console.log("定位失败");
                //     });
                // }else{
                //     console.log('geolocation未加载')
                // }
            },
        },
        async asyncData() {
            const res = await getHomeData();
            res.data.map(item => {
                item.imgUrl = config.IMG_URL + item.imgUrl;
            });
            return {
                navList: res.data
            };
        },
        mounted() {
            wxJssdkInit(window.location.href,
                [
                    'onMenuShareTimeline', // 分享到朋友圈
                    'getLocation' //定位
                ],
                wx => {

                })
            this.pageInit()
        }
    };

</script>
<style scoped>
    .banner_box {
        height: 3.65rem;
        position: relative;
        background: url(http://gaif.oss-cn-hangzhou.aliyuncs.com/dc/dmm_index/banner.png);
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }

    .city_select {
        font-size: .28rem;
        color: #fff;
        padding-top: .2rem;
        padding-left: .3rem;
    }

    .home-page {
        width: 100%;
        overflow-x: hidden;
    }
</style>

<style lang="scss">
    @import "../assets/styles/mixin";

    .home-page {
        background-color: #fff;
        padding: 0 0 53px 0;

        .top_head {
            height: 40px;
            background-color: #fc6b79;
            color: white;
            line-height: 40px;
            font-size: 14px;
            padding: 0 15px;
        }

        .nav-container {
            @include fj();
            flex-wrap: wrap;
            margin-bottom: 30px;

            .nav-item {
                @include wh(20%, 80px);
                text-align: center;
                color: #666;
                font-size: .26rem;
                line-height: .35rem;
                padding-top: .1rem;

                img {
                    display: block;
                    margin: 0 auto .01rem;
                    @include wh(50px, 50px);
                }
            }
        }

        .swiper {
            padding: 0 0.3rem;
        }

        .shoplist-title {
            @include fj(center);
            font-size: 15px;
            margin-bottom: 20px;
        }

        .show-list {
            padding: 0 0.3rem;

            a {
                display: inline-block;
                width: 49%;
                height: auto;
                float: left;

                &:nth-last-of-type(1) {
                    float: right;
                }
            }
        }
    }

</style>
