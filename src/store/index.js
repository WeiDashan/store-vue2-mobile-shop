import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage:window.sessionStorage
  })],
  state: {
    activeTabbar:'home',
    token: '',
    menu: [],
    imgsrc: "http://49.233.51.52:9000/images/",
    userId: 0,
    userinfo: {
      email: "zhhzh0629@icloud.com",
      icon: "http://49.233.51.52:9000/images/20231026212808719066296.jpg",
      nickyName: "ceshiquanxian",
      phone: "13373367378",
    },
    defaultAddress:{
      addressDetail:"民主小区1号楼",
      addressCity:"山西省大同市新荣区"
    },
    pay:{
      "price":0,
      "orderInfo": "",
      "orderIds": [],
    }
  },
  mutations: {
    SET_TOKEN(state,token) { state.token = token} ,
    SET_MENU(state,menu) { state.menu = menu},
    SET_USERID(state,userId) { state.userId = userId},
    SET_USERINFO(state,userinfo) {state.userinfo = userinfo},
    SET_DEFAULTADDRESS(state,defaultAddress) {state.defaultAddress = defaultAddress},
    SET_ACTIVETABBAR(state,activeTabbar){state.activeTabbar=activeTabbar},
    SET_PAY(state,pay){state.pay = pay}
  },
  getters:{
    GET_TOKEN(state) { return state.token},
    GET_MENU(state) { return state.menu },
    GET_IMGSRC(state) { return state.imgsrc },
    GET_USERID(state){return state.userId},
    GET_USERINFO(state){return state.userinfo},
    GET_DEFAULTADDRESS(state){return state.defaultAddress},
    GET_ACTIVETABBAR(state){return state.activeTabbar},
    GET_PAY(state){return state.pay}
  }
})
