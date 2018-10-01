import Vue from 'vue'
import Vuex from 'vuex'
import Loading from './app/loading'
import Toast from './app/toast'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        Loading,
        Toast,
    }
})