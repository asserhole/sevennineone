<template>
    <div>
        <topback />
        <Article :title="article.title" :pageText="article.pageText" />
    </div>

</template>

<script>
    import Topback from "~/components/topback";
    import Article from '~/components/article'
    export default {
        name: "index",
        data(){
            return {
                articleId:this.$route.params.artid,
                article:{}
            }
        },
        methods:{
            async getArticleDetail(){
                let res = await getArticleDetail({
                    articleId:this.articleId
                })
                this.article = res.data
            }
        },
        mounted(){
            this.getArticleDetail()
        },
        components: {Topback,Article}
    }
</script>

<style scoped>

</style>