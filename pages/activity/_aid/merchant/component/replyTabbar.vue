<template>
    <mt-tabbar id="reply-tabbar" v-model="selected">
        <mt-tab-item id="0" :class="{'is-selected':selected==0}">
            <div @click="goPage(0)">
                <div class="mint-tab-item-icon">
                    <svg v-if="selected==0" t="1558148640085" class="icon" style="" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2624"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
                        <defs>
                            <style type="text/css"></style>
                        </defs>
                        <path d="M823.2 1020H61.6c-32 0-57.6-25.6-57.6-57.6V303.2c0-32 25.6-57.6 57.6-57.6h28c8.8 0 16 7.2 16 16s-7.2 16-16 16H61.6c-14.4 0-25.6 11.2-25.6 25.6v659.2c0 14.4 11.2 25.6 25.6 25.6h761.6c8.8 0 16 7.2 16 16s-7.2 16-16 16z"
                              p-id="2625" fill="#fc6b79"></path>
                        <path d="M89.6 756.8c-8.8 0-16-7.2-16-16V20c0-8.8 7.2-16 16-16h705.6c8.8 0 16 7.2 16 16v457.6c0 8.8-7.2 16-16 16s-16-7.2-16-16V36H105.6v704.8c0 8.8-7.2 16-16 16z"
                              p-id="2626" fill="#fc6b79"></path>
                        <path d="M694.4 173.6h-504c-4.8 0-8-3.2-8-8s3.2-8 8-8h504c4.8 0 8 3.2 8 8s-4 8-8 8zM694.4 327.2h-504c-4.8 0-8-3.2-8-8s3.2-8 8-8h504c4.8 0 8 3.2 8 8s-4 8-8 8zM829.6 1020h-768c-18.4 0-35.2-8.8-46.4-24-11.2-15.2-13.6-33.6-8-51.2l143.2-443.2c8-24 29.6-40 54.4-40h757.6c18.4 0 35.2 8.8 46.4 24 11.2 15.2 13.6 33.6 8 51.2l-146.4 453.6c-5.6 17.6-22.4 29.6-40.8 29.6zM204.8 493.6c-11.2 0-20.8 7.2-24 17.6L37.6 954.4c-2.4 8-1.6 16 4 22.4 4.8 6.4 12 10.4 20.8 10.4h768c4.8 0 8.8-3.2 10.4-7.2l146.4-453.6c2.4-8 1.6-16-4-22.4s-12-10.4-20.8-10.4H204.8z"
                              p-id="2627" fill="#fc6b79"></path>
                        <path d="M864.8 493.6h-69.6c-8.8 0-16-7.2-16-16V344.8c0-8.8 7.2-16 16-16h28c32 0 57.6 25.6 57.6 57.6v92c0 8-7.2 15.2-16 15.2z m-53.6-32h37.6v-76c0-14.4-11.2-25.6-25.6-25.6h-12v101.6z"
                              p-id="2628" fill="#fc6b79"></path>
                    </svg>
                    <svg v-if="selected!=0" t="1558148640085" class="icon" style="" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2624"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
                        <defs>
                            <style type="text/css"></style>
                        </defs>
                        <path d="M823.2 1020H61.6c-32 0-57.6-25.6-57.6-57.6V303.2c0-32 25.6-57.6 57.6-57.6h28c8.8 0 16 7.2 16 16s-7.2 16-16 16H61.6c-14.4 0-25.6 11.2-25.6 25.6v659.2c0 14.4 11.2 25.6 25.6 25.6h761.6c8.8 0 16 7.2 16 16s-7.2 16-16 16z"
                              p-id="2625" fill="#818181"></path>
                        <path d="M89.6 756.8c-8.8 0-16-7.2-16-16V20c0-8.8 7.2-16 16-16h705.6c8.8 0 16 7.2 16 16v457.6c0 8.8-7.2 16-16 16s-16-7.2-16-16V36H105.6v704.8c0 8.8-7.2 16-16 16z"
                              p-id="2626" fill="#818181"></path>
                        <path d="M694.4 173.6h-504c-4.8 0-8-3.2-8-8s3.2-8 8-8h504c4.8 0 8 3.2 8 8s-4 8-8 8zM694.4 327.2h-504c-4.8 0-8-3.2-8-8s3.2-8 8-8h504c4.8 0 8 3.2 8 8s-4 8-8 8zM829.6 1020h-768c-18.4 0-35.2-8.8-46.4-24-11.2-15.2-13.6-33.6-8-51.2l143.2-443.2c8-24 29.6-40 54.4-40h757.6c18.4 0 35.2 8.8 46.4 24 11.2 15.2 13.6 33.6 8 51.2l-146.4 453.6c-5.6 17.6-22.4 29.6-40.8 29.6zM204.8 493.6c-11.2 0-20.8 7.2-24 17.6L37.6 954.4c-2.4 8-1.6 16 4 22.4 4.8 6.4 12 10.4 20.8 10.4h768c4.8 0 8.8-3.2 10.4-7.2l146.4-453.6c2.4-8 1.6-16-4-22.4s-12-10.4-20.8-10.4H204.8z"
                              p-id="2627" fill="#818181"></path>
                        <path d="M864.8 493.6h-69.6c-8.8 0-16-7.2-16-16V344.8c0-8.8 7.2-16 16-16h28c32 0 57.6 25.6 57.6 57.6v92c0 8-7.2 15.2-16 15.2z m-53.6-32h37.6v-76c0-14.4-11.2-25.6-25.6-25.6h-12v101.6z"
                              p-id="2628" fill="#818181"></path>
                    </svg>
                </div>
                <span :class="{'selected_text':selected==0}">首页</span>
            </div>
        </mt-tab-item>
        <mt-tab-item id="1" :class="{'has-reply':hasReply,'is-selected':alwaysFalse}">
            <div>
                <div class="mint-tab-item-icon">
                    <button @click="goPage(1)" class="reply_button">{{replyText}}</button>
                    <transition name="fade">
                        <p @click="goRelyPage" class="reply_line" v-if="hasReply">继续报名</p>
                    </transition>
                </div>
            </div>
        </mt-tab-item>
        <mt-tab-item id="2">
            <div @click="goPage(2)">
                <div class="mint-tab-item-icon">
                    <svg v-if="selected==2" t="1558159473296" class="icon" style="" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5105"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
                        <defs>
                            <style type="text/css"></style>
                        </defs>
                        <path d="M363.273442 659.489686 660.733984 659.489686C812.611992 659.489686 939.138904 775.061822 953.544104 925.107659L988.692837 886.422846 35.313527 886.422846 70.462482 925.105346C84.860704 775.02833 211.303606 659.489686 363.273442 659.489686ZM35.313527 957.043535 988.692837 957.043535C1009.527497 957.043535 1025.832655 939.098024 1023.841571 918.358722 1005.966553 732.170964 849.081374 588.868996 660.733984 588.868996L363.273442 588.868996C174.827716 588.868996 18.029957 732.144746 0.164572 918.361035-1.825058 939.09956 14.479794 957.043535 35.313527 957.043535ZM757.250203 305.986648C757.250203 166.24693 643.968784 52.965517 504.229071 52.965517 364.489357 52.965517 251.207938 166.24693 251.207938 305.986648 251.207938 445.726367 364.489357 559.007779 504.229071 559.007779 643.968784 559.007779 757.250203 445.726367 757.250203 305.986648ZM321.828627 305.986648C321.828627 205.24966 403.492087 123.586207 504.229071 123.586207 604.966054 123.586207 686.629514 205.24966 686.629514 305.986648 686.629514 406.723637 604.966054 488.38709 504.229071 488.38709 403.492087 488.38709 321.828627 406.723637 321.828627 305.986648Z"
                              p-id="5106" fill="#fc6b79"></path>
                    </svg>
                    <svg v-if="selected!=2" t="1558159473296" class="icon" style="" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5105"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
                        <defs>
                            <style type="text/css"></style>
                        </defs>
                        <path d="M363.273442 659.489686 660.733984 659.489686C812.611992 659.489686 939.138904 775.061822 953.544104 925.107659L988.692837 886.422846 35.313527 886.422846 70.462482 925.105346C84.860704 775.02833 211.303606 659.489686 363.273442 659.489686ZM35.313527 957.043535 988.692837 957.043535C1009.527497 957.043535 1025.832655 939.098024 1023.841571 918.358722 1005.966553 732.170964 849.081374 588.868996 660.733984 588.868996L363.273442 588.868996C174.827716 588.868996 18.029957 732.144746 0.164572 918.361035-1.825058 939.09956 14.479794 957.043535 35.313527 957.043535ZM757.250203 305.986648C757.250203 166.24693 643.968784 52.965517 504.229071 52.965517 364.489357 52.965517 251.207938 166.24693 251.207938 305.986648 251.207938 445.726367 364.489357 559.007779 504.229071 559.007779 643.968784 559.007779 757.250203 445.726367 757.250203 305.986648ZM321.828627 305.986648C321.828627 205.24966 403.492087 123.586207 504.229071 123.586207 604.966054 123.586207 686.629514 205.24966 686.629514 305.986648 686.629514 406.723637 604.966054 488.38709 504.229071 488.38709 403.492087 488.38709 321.828627 406.723637 321.828627 305.986648Z"
                              p-id="5106" fill="#818181"></path>
                    </svg>
                </div>
                <span :class="{'selected_text':selected==3}">我的</span>
            </div>
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
    export default {
        name: "replyTabbar",
        props:{
            page:{
                default:0
            },
            aid:null,
            mid:null,
            infoNum:{
                default:0
            }
        },
        data(){
            return {
                selected:0,
                alwaysFalse:false
            }
        },
        methods:{
            goPage(index){
                if (index !== this.selected) {
                    switch (index) {
                        case 0:
                            this.$router.push({name: 'activity-aid', params: {aid: this.aid}})
                            return;
                        case 1:
                            if(this.hasReply){
                                this.$emit('replyListClick')
                            }else{
                                this.$router.push({name: 'activity-aid-merchant-mid-reply', params: {aid: this.aid,mid:this.mid}})
                            }
                            return;
                        case 2:
                            this.$router.push({name: 'activity-aid-users',params: {aid: this.aid}})
                            return;
                    }
                }
            },
            goRelyPage(){
                this.$router.push({name: 'activity-aid-merchant-mid-reply', params: {aid: this.aid,mid:this.mid}})
            }
        },
        mounted() {
            this.selected = this.page
        },
        computed:{
            replyText(){
                return parseInt(this.infoNum)>0?this.infoNum + '条报名信息':'报名'
            },
            hasReply(){
                return this.infoNum>0
            }
        }
    }
</script>

<style scoped>
    .selected_text{
        color:red;
    }
    .mint-tabbar{
        position: fixed;
        z-index: 2000;
    }
    .reply_button{
        width: 80%;
        margin: 0 auto;
        border: none;
        background-color: #fc6b79;
        color: white;
        border-radius: 20px;
        height: 40px;
    }
    .has-reply{
        padding-top:0;
        padding-bottom: 0;
        margin-top:-10px;
    }
    .reply_line{
        color:#999;
        margin-top:5px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
<style>
    #reply-tabbar .mint-tab-item-icon{
        width:100%;
    }
</style>
