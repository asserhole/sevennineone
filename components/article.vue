<template>
    <div class="article-com">
        <h2>{{title}}</h2>
        <div v-html="pageText"></div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                default:''
            },
            pageText:{
                default:''
            }
        },
        name: "article"
    }
</script>

<style scoped>
    .article-com{
        background-color: white;
        padding:15px;
    }
    .article-com>h2{
        font-size:18px;
        font-weight:bold;
        text-align: center;
        margin-bottom:5px;
    }
</style>