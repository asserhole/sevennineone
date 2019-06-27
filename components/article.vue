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

</style>