import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'
import dict from './modules/dictionary'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    menu,
    dict
  },
  getters
})

export default store
