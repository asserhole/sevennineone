<template>
    <span v-html="time"></span>
</template>

<script>
    export default {
        name: "timeDown",
        data () {
            return {
                time : '',
                flag : false
            }

        },
        mounted () {
            let time = setInterval(()=>{
                if(this.flag == true){
                    clearInterval(time)
                }
                this.timeDown()
            },500)
        },
        props : {
            endTime : {
                type : String
            }
        },
        methods : {
            timeDown () {
                const endTime = new Date(this.endTime)
                const nowTime = new Date();
                let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
                let d = parseInt(leftTime/(24*60*60))
                let h = this.formate(parseInt(leftTime/(60*60)%24))
                let m = this.formate(parseInt(leftTime/60%60))
                let s = this.formate(parseInt(leftTime%60))
                if(leftTime <= 0){
                    this.flag = true
                    this.$emit('time-end')
                    this.time='倒计时已结束'
                }
                this.time = `<b>${d}</b>天<b>${h}</b>时<b>${m}</b>分<b>${s}</b>秒`;
            },
            formate (time) {
                if(time>=10){
                    return time
                }else{
                    return `0${time}`
                }
            }
        }
    }
</script>

<style scoped>

</style>

