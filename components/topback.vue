<template>
    <div id="top-back">
        <i @click="back" class="fa fa-angle-left" aria-hidden="true"></i>
    </div>
</template>

<script>
    export default {
        name: "topback",
        props:{
            step:{
                default:-1
            }
        },
        methods:{
            back(){
                history.go(this.step)
            }
        },
        watch:{
        }
    }
</script>

<style scoped>
    #top-back{
        height:35px;
        background-color: #fff7f8;
        padding-left:10px;
    }
    #top-back i{
        font-size:24px;
        line-height: 35px;
    }
</style>