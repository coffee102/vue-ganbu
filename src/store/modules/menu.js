import { transToMenu } from '@/utils/transtreedata'
import { queryOwnedPermission } from '@/api/login'
import { getMenu, setMenu } from '@/utils/auth'
import router from '@/router'


const menu = {
  state: {
    menuitems:getMenu(),
    loadRoutes:''
  },

  mutations: {
    SET_MENUITEMS: (state, menuitems) => {
      state.menuitems = menuitems
    },
    SET_LOADROUTES: (state, loadroutes) => {
      state.loadroutes = loadroutes
    }
  },

  actions: {
    // 获取左侧边树
    GetMenuTree({ commit }) {
      return new Promise((resolve, reject) => {
        queryOwnedPermission().then(response => {
          var menutree = transToMenu(response.obj,'');
          menutree.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_LOADROUTES', '1')
          commit('SET_MENUITEMS', menutree)
          setMenu(menutree)
          router.addRoutes(
            menutree
          )
          //console.log('router.options.routes111',router.options.routes)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default menu
