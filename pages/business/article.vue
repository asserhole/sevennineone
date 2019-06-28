<template>
    <!-- 编辑活动 -->
    <div class="my-article">
        <topback />

        <van-cell title="编辑活动页面" style="margin-bottom:10px;" />

        <button @click="$router.push({name:'business-addarticle'})" class="add_article">
            <i class="fa fa-plus" aria-hidden="true"></i>新增活动页面
        </button>

        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"

        >
            <van-cell @click="$router.push({name:'business-articlepre',query:{artid:item.id}})"
                      :label="'链接：/activity/article/'+item.id"
                    v-for="item in articleList" :title="item.title" is-link />

        </van-list>

    </div>
</template>

<script>
    import Topback from "../../components/topback";
    import {listMyArticle} from "../../assets/services/common";
    export default {
        name: "article",
        data(){
            return {
                loading:false,
                articleList:[],
                current:1,
                total:0,
                rowCount:10,

            }
        },
        methods:{
            async listMyArticle(){
                let res = await listMyArticle({
                    current:this.current,
                    rowCount:this.rowCount
                })
                this.loading = false
                this.articleList = this.articleList.concat(res.data.list)
                this.total = res.data.total
            },
            onLoad(){
                if(!this.finished){
                    this.current +=1
                    this.listMyArticle()
                }
            }
        },
        mounted(){
            this.listMyArticle()
        },
        computed:{
            finished(){
                return this.articleList.length === this.total && !this.loading
            }
        },
        components: {Topback}
    }
</script>

<style scoped>
    .van-cell{
        font-size:12px;
    }
    .add_article{
        width:100%;
        border:1px solid #2cbe4e;
        color:#666;
        background-color: white;
        height:35px;
        margin-bottom:10px;
    }
</style>