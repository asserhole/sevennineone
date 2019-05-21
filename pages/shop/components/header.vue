<template>
  <div class="shop-header">
    <div class="head">
      <nav :style="`background-image: url('${banner}');`">
        <i 
          class="mintui mintui-back" 
          @click="$router.go(-1);"/>
        <img 
          :src="seller.logo"
          class="shop-logo">
      </nav>
    </div>
    <div class="content">
      <h2>{{ seller.name }}</h2>
      <div class="info">
        <span>规模20人</span>
        <span>本月有2人报名</span>
      </div>
    </div>
    <div class="foot">
      <p>
        <mt-badge 
          size="small" 
          color="rgb(240, 115, 115)">免费试课</mt-badge>
        最近试课日期：3天后（2019-05-09 06:00）
      </p>
      <span class="announcement">公告：免费试课为2次，谢谢！我们将竭诚为您服务！</span>
    </div>
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
        // return config.IMG_URL + this.seller.banner;
        // todo 横幅设置
        return 'https:sevennineone.oss-cn-hangzhou.aliyuncs.com/default/36f55795c31e857deab11f9d22c8a286.png';
      }
    }
  };

</script>

<style lang="scss">
  @import "../../../assets/styles/mixin";

  .shop-header {
    background: #fff;

    .head {
      height: px2rem(200px);

      nav {
        height: px2rem(200px);
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        padding: px2rem(10px);
        position: relative;

        .mintui-back {
          font-size: px2rem(46px);
          color: #fff;
        }

        .shop-logo {
          width: px2rem(150px);
          height: px2rem(150px);
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .content {
      font-size: px2rem(24px);
      margin-top: px2rem(50px);
      text-align: center;

      h2 {
        font-size: px2rem(40px);
      }

      .info {
        color: #666;

        span {
          margin: 0 px2rem(10px);
        }
      }
    }

    .foot {
      padding: 0 px2rem(70px);
      margin-top: 10px;
      font-size: px2rem(24px);

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
