<template>
  <div class="home-page">
    <mt-header
      fixed
      title="岳阳市">
      <mt-button
        slot="right"
        icon="search"
        @click="$router.push('/search')"/>
    </mt-header>
    <nav class="nav-container">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        @click="$router.push({path:'/newretail', query:{ title: item.id ,name:item.text }})">
        <img
          :src="item.imgUrl"
          alt="">
        {{ item.text }}
      </div>
    </nav>
    <div class="show-list">
      <a href="https://h5.ele.me/ranking/#type=quality_meal&activity_id=1&title=%E5%93%81%E8%B4%A8%E5%A5%97%E9%A4%90&navType=0&geohash=wtw3ycy6v7pe">
        <img
          :src="show1"
          alt="">
      </a>
      <a href="https://h5.ele.me/sales/#geohash=wtw3ycy6v7pe">
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
    <ShopList />
    <Tabbar page="0" />
  </div>
</template>

<script>
  import Tabbar from "~/components/tabbar"
  import ShopList from "~/components/shopList"
  import config from "~/config/config.js"
  import {
    getHomeData
  } from "~/assets/services/common";


  export default {
    components: {
      Tabbar,ShopList
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
      };
    },
    async asyncData() {
      const res = await getHomeData();
      res.data.map(item => {
        item.imgUrl = config.IMG_URL + item.imgUrl;
      });
      return {
        navList: res.data
      };
    }
  };

</script>

<style lang="scss">
  @import "../assets/styles/mixin";

  .home-page {
    background-color: #fff;
    padding: px2rem(88px) 0 53px 0;

    .nav-container {
      @include fj();
      flex-wrap: wrap;
      margin-bottom: px2rem(30px);

      .nav-item {
        @include wh(20%, 80px);
        text-align: center;
        color: #666;
        font-size: px2rem(24px);
        padding-top: px2rem(10px);

        img {
          display: block;
          margin: 0 auto;
          @include wh(50px, 50px);
        }
      }
    }

    .swiper {
      padding: 0 0.4rem;
    }

    .shoplist-title {
      @include fj(center);
      font-size: px2rem(30px);
      margin-bottom: px2rem(20px);
    }

    .show-list {
      padding: 0 0.4rem;

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
