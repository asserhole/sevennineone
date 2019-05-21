<template>
  <div class="shop-page">
    <Header :seller="seller" />
    <mt-navbar v-model="selected">
      <mt-tab-item id="goods">课程</mt-tab-item>
      <mt-tab-item id="ratings">活动</mt-tab-item>
      <mt-tab-item id="seller">商家</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="goods">
        <Goods :seller="seller" />
      </mt-tab-container-item>
      <mt-tab-container-item id="ratings">
        <ActivityList :merchantId="seller.id" @ActivityListLengthZero="activityListZeroHandler"/>
        <p v-if="activityZero">该机构还未加入任何活动</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="seller">
        <Seller :seller="seller" />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Header from "./components/header";
  import Goods from "./components/goods";
  import ActivityList from '~/components/activityList';
  import Seller from "./components/seller";
  import * as shoppingApi from "~/assets/services/shopping";

  export default {
    components: {
      Header,
      Goods,
      ActivityList,
      Seller
    },
    data() {
      return {
        selected: "goods",
        seller: {},
        activityZero:false, // 商家加入的活动数为0
      };
    },
    methods:{
      activityListZeroHandler(data){
        this.activityZero = true;
      }
    },
    async asyncData({query}) {
      const {
        data
      } = await shoppingApi.seller({id:query.id});
      return {
        seller: data
      };
    },
  };

</script>

<style lang="scss">
  @import "../../assets/styles/mixin";

  .shop-page {
    font-size: px2rem(24px);

    .mint-navbar {
      position: sticky;
      top: 0;
      z-index: 20;

      .mint-tab-item-label {
        font-size: px2rem(30px);
      }

      .mint-tab-item {
        padding: 10px 0;

        &.is-selected {
          color: inherit;
          border: none;
          position: relative;

          &::after {
            content: " ";
            display: inline-block;
            @include wh(20%, 2px);
            background: #2395ff;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }

</style>
