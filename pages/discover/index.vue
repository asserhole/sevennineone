<template>
    <div id="discover">
        <mt-search
                v-model="searchCondition.name"
                cancel-text="取消"
                placeholder="搜索">
        </mt-search>
        <ActivityList :searchCondition="searchCondition"/>
        <Tabbar page="1"/>
    </div>
</template>

<script>
    import ActivityList from '~/components/activityList'
    import Tabbar from '~/components/tabbar'

    export default {
        name: "index",
        data(){
            return {
                searchCondition:{
                    name:''
                }

            }
        },
        components:{
            ActivityList,Tabbar
        }
    }
</script>

<style scoped>
    #discover{
        padding-bottom: 53px;
    }
</style>
<style>
    #discover .mint-search{
        height:100%;
    }
</style>