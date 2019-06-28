<template>
  <div class="seller-page">
    <div class="logo">
      <img 
        :src="banner" 
        alt="">
    </div>
    <h2>{{ seller.name }}</h2>
    <p v-html="seller.description"></p>
  </div>
</template>

<script>
  import config from "~/config/config";
  export default {
    props: {
      seller: {
        default: {}
      }
    },
    computed: {
      banner: function () {
        return config.IMG_URL + this.seller.banner;
      }
    }
  };

</script>

<style lang="scss">
  @import "../../../assets/styles/mixin";

  .seller-page {
    background: #fff;
    padding-bottom: .3rem;

    .logo {
      padding: .3rem .3rem 0 .3rem;
    }

    h2 {
      font-size: .32rem;
      margin-top: .4rem;
      padding: 0 .3rem .2rem .3rem;
    }

    p {
      padding: 0 .3rem;
      color: #666;
      font-size: .26rem;
      line-height: 1.5;
    }

    .brandstory {
      display: block;
      line-height: 1rem;
      margin-top: .5rem;
      color: #666;
      font-size: .28rem;
      text-align: center;
    }

    .placeholder {
      height: .2rem;
      background: #f5f5f5;
    }
  }

</style>
