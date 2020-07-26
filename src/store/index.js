import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Vuex 全局状态变量
 */

const store = new Vuex.Store({
    state: {
        loginUserName: "",
    }
})




export default store;
