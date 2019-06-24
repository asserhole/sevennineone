<template>
    <mt-index-list>
        <mt-index-section v-for="(r,i) in cityIndex" :index="r">
            <div @click="chooseCity(item)" v-for="(item,index) in cityList[r]">
                <mt-cell  :title="item.name"></mt-cell>
            </div>
        </mt-index-section>
    </mt-index-list>
</template>

<script>
    import { cityList } from '~/assets/utils/cityselector'

    export default {
        name: "index",
        data(){
            return {
                cityList:cityList
            }
        },
        methods:{
            chooseCity(item){
                localStorage.setItem('city',item.name)
                this.$router.push({name:'index',params:{city:item.name}})
            }
        },
        computed:{
            cityIndex(){
                let keyList = []
                for(let key in cityList){
                    if (cityList.hasOwnProperty(key)) {
                        keyList.push(key)
                    }
                }
                return keyList
            }
        }
    }
</script>

<style scoped>

</style>