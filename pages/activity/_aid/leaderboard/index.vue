<template>

    <div class="a_leaderboard">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell
                    v-for="item in list"
                    :key="item"
                    :title="item"
            />
        </van-list>
    </div>

</template>

<script>
    export default {
        name: "index",

    }
</script>

<style scoped>

</style>