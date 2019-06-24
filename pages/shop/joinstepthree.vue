<template>
    <!-- 入驻第三步，设置地理位置 -->
    <div class="shop_jst">
        <topback />
        <van-cell value="商家入驻" />
        <div class="jf-progress">
            <van-steps :active="active">
                <van-step>商家信息</van-step>
                <van-step>课程设置</van-step>
                <van-step>地理位置</van-step>
                <van-step>完成</van-step>
            </van-steps>
        </div>

        <div v-if="address" class="map_info">
            <van-cell-group>
                <van-field
                        value="详细地址"
                        label="详细地址"
                        v-model="address"
                />
            </van-cell-group>
            <p style="color:#999;margin-left:15px;">您可以编辑以完善地址信息，地址信息选定后不能修改</p>
        </div>

        <button @click="choose_map" class="choose_btn">点击选择商家地理位置</button>

        <button class="submit_btn" @click="submit">
            下一步
        </button>

    </div>


</template>

<script>
    import Topback from "../../components/topback";
    import {getMerchantJoinInfo, updateAddressInfo} from "../../assets/services/shopping";
    export default {
        name: "joinstepthree",
        data(){
            return {
                active:2,
                address:null,
                bmapLoca:null,
            }
        },
        methods:{
            async pageInit(){
                let name = this.$route.query.name
                let latng = this.$route.query.latng
                let addr = this.$route.query.addr
                let city = this.$route.query.city

                if(typeof(name) != 'undefined'){
                    this.address = decodeURI(addr) + decodeURI(name)
                    this.bmapLoca = latng
                }else{
                    let res = await getMerchantJoinInfo();
                    if(res.data){
                        if(res.data.auditStatus === 1){ //如果在审核中，跳到申请的页面
                            this.$router.push({name:'shop-joinfinish'})
                        }
                        this.address = res.data.address
                    }

                }


            },
            choose_map(){
                let qqMapUrl = "https://3gimg.qq.com/lightmap/components/locationPicker2/index.html?search=1&type=0&backurl=REDIRECTURL&key=MYKEY&referer=791"
                // let qqMapUrl = 'https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=REDIRECTURL&key=MYKEY&referer=791'
                qqMapUrl = qqMapUrl.replace("REDIRECTURL","http://www.djtp.com/shop/joinstepthree")
                qqMapUrl = qqMapUrl.replace("MYKEY",'XOOBZ-3G2WU-ME2VZ-4AG7A-4NDTT-Z4F7O')  // 我自己的
                window.location.href = qqMapUrl
            },
            // 提交
            async submit(){
                if(!this.address){
                    this.$toast({
                        message: '请选择地址',
                        duration: 1500
                    })
                    return
                }
                let res = await updateAddressInfo({
                    address:this.address,
                    bmapLoca:this.bmapLoca
                })
                if(res.code === 0){
                    this.$router.push({name:'shop-joinfinish'})
                }else{
                    this.$toast.fail({
                        message: '提交失败，请稍后再试',
                        duration: 1000
                    })
                }
            }
        },
        mounted(){
            this.pageInit()
        },
        components: {Topback}
    }
</script>

<style scoped>
    .jf-progress{
        margin-bottom:8px;
    }
    .choose_btn{
        width:100%;
        height:40px;
        background-color: #2cbe4e;
        color:white;
        border:none;
        margin-top:20px;
    }
    .submit_btn{
        border:1px solid #2cbe4e;
        background-color: white;
        color:#2cbe4e;
        margin-right:15px;
        height: 30px;
        padding:0 15px;
        margin-top:15px;
        float:right;
    }
</style>
<style>
    .shop_jst .van-cell{
        font-size: 12px;
    }
</style>