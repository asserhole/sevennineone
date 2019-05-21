<template>
    <div class="activity-page">
        <div class="activity-content">
            <div @click="$router.push({path:'/activity',query:{aid:item.id}})" class="activity-item" v-for="(item,index) in activities">
                <div class="activity-item-img">
                    <img :src="item.logo" />
                </div>
                <div class="activity-item-text">
                    <p>{{item.name}}</p>
                    <p>{{item.poster}}</p>
                </div>
            </div>
        </div>
        <!--<div v-else class="activity-content">-->
            <!--<p>该机构还未加入任何活动</p>-->
        <!--</div>-->
    </div>
</template>

<script>
    import * as shoppingApi from "~/assets/services/shopping";
    export default {
        props: {
            merchantId: null,
            searchCondition:{
            }, //搜索活动的条件
        },
        data() {
            return {
                activities: [],
                total:0,
            };
        },
        methods:{
            getActivityList(){
                if (this.merchantId != null) {
                    shoppingApi.listByMerchantId({
                        merchantId: this.merchantId
                    }).then(res => {
                        if (res.code === 0) {
                            this.activities = res.data
                            // 通知父组件
                            if(res.data.length === 0){
                                this.$emit('ActivityListLengthZero','message')
                            }else{
                                this.activities.map(item=>{
                                    item.logo = item.logo + '?x-oss-process=image/resize,w_360'
                                })
                            }

                        }
                    });
                } else {
                    shoppingApi.listActivity(this.searchCondition).then(res=>{
                        if(res.code === 0){
                            this.activities = res.data.list
                            this.total = res.data.total
                        }
                    })
                }
            }
        },
        mounted() {
            this.getActivityList();
        },
        watch:{
            searchCondition:{
                deep:true,
                handler(newValue,oldValue){
                    console.log(newValue)
                }
            }
        }
    };

</script>


<style scoped>
    .activity-page{
        width:100%;
        margin-top: 10px;
    }
    .activity-page .activity-item{
        width:100%;
        margin:0 auto;
        border-radius: 5px;
        background-color: white;
        max-height: 280px;
        max-width: 95%;
        overflow: hidden;
        padding-bottom:10px;
        margin-bottom:15px;
    }

    .activity-page .activity-item .activity-item-img{
        max-height:200px;
        overflow: hidden;
    }
    .activity-page .activity-item .activity-item-img img{
        width:100%;
    }
    .activity-page .activity-item .activity-item-text{
        padding:10px 15px;
    }
    .activity-page .activity-item .activity-item-text p:first-child{
        font-size: 16px;
    }

    .activity-page .activity-item .activity-item-text p:last-child {
        color: #999;
        margin-top: 5px;
        font-size: 13px;
        height: 43px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;      /* 可以显示的行数，超出部分用...表示*/
        -webkit-box-orient: vertical;
    }
</style>
