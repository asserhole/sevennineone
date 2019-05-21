<template>
    <div>
        <h2>123</h2>
        <!--<h2>{{article.imgUrl}}</h2>-->
        <div v-for="(item,index) in article" :key="index">
            <img :src="item.imgUrl" />
        </div>
    </div>
</template>

<script>
    import { getHomeData } from "~~/assets/services/common";

    export default {
        name: "articleDetail",
        // asyncData ({ params }) {
        //     return axios.get(`http://localhost:8911/common/getHomeData`)
        //         .then((res) => {
        //             return { article: res.data.data }
        //         })
        // },
        async asyncData (){
            let res = await getHomeData();
            return {
                article:res.data
            }
        },
        mounted() {
            console.log(this.article);
        }
    }
</script>

<style scoped>

</style>