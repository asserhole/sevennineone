<template>
  <div class="newretail-page">
    <mt-header 
      :title="$route.query.name"
      fixed>
      <div 
        slot="left" 
        @click="$router.go(-1)">
        <mt-button icon="back"/>
      </div>
    </mt-header>
    <ShopList :category-id="$route.query.title" />
  </div>
</template>

<script>
  import ShopList from "~/components/shopList";
  export default {
    data(){
        return {
          categoryId:null,
        }
    },
    components: {
      ShopList
    },
    methods:{

    },
    mounted() {
      this.categoryId = this.$route.query.title
    }
  };

</script>
<style>
  .newretail-page .mint-header {
      height: 1rem;
      font-size: 0.35rem;
  }

  .newretail-page .mint-header .mintui {
      font-size: 0.35rem;
  }
</style>

<style lang="scss">
  @import "../assets/styles/mixin";

  .newretail-page {
    padding: 1rem 0 0 0;
  }

</style>
