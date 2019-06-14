<template>
    <div class="merchant-joinfinish">
        <div class="mjf-svg">
            <svg t="1559788701212" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1727" data-spm-anchor-id="a313x.7781069.0.i4" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><defs><style type="text/css"></style></defs><path d="M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m214.3232-685.2096l-292.5056 274.176-126.1568-120.2176a51.2 51.2 0 1 0-70.656 74.0864l161.1776 153.6512a51.2 51.2 0 0 0 70.3488 0.3072l327.7824-307.3024a51.2 51.2 0 1 0-69.9904-74.7008z" fill="#2cbe4e" p-id="1728" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path></svg>
        </div>
        <p class="mjf-success-text">
            提交成功，等待审核中
        </p>
        <p class="gray">预计审核将在24小时内完成</p>
        <p class="gray">请留意短信通知</p>
        <button @click="$router.push({name:'index'})">返回首页</button>
    </div>
</template>

<script>
    export default {
        name: "joinfinish"
    }
</script>

<style scoped>
    .merchant-joinfinish{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top:30px;
    }
    .merchant-joinfinish>p{
        margin-bottom:8px;
    }
    .mjf-svg{
        margin-bottom:20px;
    }
    .mjf-success-text{
        font-weight: 600;
    }
    .gray{
        color:#999;
    }
    .merchant-joinfinish button{
        background-color: white;
        border:1px solid #999;
        padding:5px 8px;
        border-radius: 2px;
    }
</style>
<style>
    .van-cell{
        font-size:12px;
    }
</style>