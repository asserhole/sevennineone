import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'


Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: state,
    mutations: {
        setUserinfo (state,local_userinfo) {
            state.local_userinfo = local_userinfo
        },
        setOpenid(state,openid){
            state.openid = openid
        }
    }
})

export default store