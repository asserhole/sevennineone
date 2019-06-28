<template>
    <div>
        <topback />
        <Article :title="article.title" :pageText="article.pageText" />
        <div class="clearfix">
            <button @click="$router.push({name:'business-editarticle',query:{artid:articleId}})" class="modify_btn">修改</button>
        </div>
        <div class="article-url clearfix">
            <p>本文的地址为：</p>
            <p>{{articleUrl}}</p>
        </div>
    </div>

</template>

<script>
    import Topback from "~/components/topback";
    import Article from '~/components/article'
    import {getArticleDetail} from "~/assets/services/common";
    export default {
        name: "articlepre",
        data(){
            return {
                articleId:this.$route.query.artid,
                article:{}
            }
        },
        methods:{
            async getArticleDetail(){
                let res = await getArticleDetail({
                    id:this.articleId
                })
                this.article = res.data
            }
        },
        mounted(){
            this.getArticleDetail()
        },
        computed:{
            articleUrl(){
                return "/activity/article/"+this.articleId
            }
        },
        components: {Topback,Article}
    }
</script>

<style scoped>
    .modify_btn{height:35px;
        width:1.2rem;
        color:#2cbe4e;
        margin:10px 10px 20px 10px;
        background-color: white;
        border:1px solid #2cbe4e;
    }
    .article-url{
        padding:10px 15px;
        background-color: white;
    }

</style>