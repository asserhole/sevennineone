<template>
    <div>
        <van-image v-if="imgList.length>0 && requestStatus" v-for="(r,i) in imgList"
                max-width="100"
                maxheight="100"
                lazy-load
                :src="r.url"
        >
            <template v-slot:loading>
                <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template>
        </van-image>
        <p v-if="imgList.length===0 && requestStatus" style="color:#999;padding:10px 15px;">暂无数据</p>
    </div>
</template>

<script>
    import {getMerchantImageList} from "../../../../../assets/services/shopping";

    export default {
        data(){
            return {
                imgList:[],
                requestStatus:false
            }
        },
        name: "image",
        methods:{
            async getMerchantImageList(){
                let res = await getMerchantImageList({
                    mid:this.$route.params.mid
                })
                this.requestStatus = true
                this.imgList = res.data
            }
        },
        mounted() {
            this.getMerchantImageList()
        }

    }
</script>

<style scoped>

</style>