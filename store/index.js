import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'


Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: state,
    mutations: {
        setGiftBarShowStatus(state, giftBarshow){
            state.giftBarShow = giftBarshow
        },
        setSkuShowStatus(state, skushow){
            state.skuShow = skushow
        },
        setOpenid(state, openid){
            state.openid = openid
        }
    }
})

export default store