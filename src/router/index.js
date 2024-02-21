import Vue from 'vue'
import VueRouter from 'vue-router'
import el from "element-ui/src/locale/lang/el";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index'),
    children:[
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/index/home')
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import('@/views/index/orders')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('@/views/index/mine')
      },
      {
        path: '/classify',
        name: 'Classify',
        component: () => import('@/views/index/classify')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/index/cart')
      }
    ]
  },
    //-------------搜索--------------
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/search/list')
  },
    //-------------登录-------------
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/inputCode',
    name: 'InputCode',
    component: () => import('@/views/login/inputCode/inputCode')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register/register')
  },
  {
    path: '/registerCode',
    name: 'RegisterCode',
    component: () => import('@/views/login/register/registerCode')
  },
  {
    path: '/registerDetail',
    name: 'RegisterDetail',
    component: () => import('@/views/login/register/registerDetail')
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: () => import('@/views/login/forgetPassword/forgetPassword')
  },
  {
    path: '/forgetCode',
    name: 'forgetCode',
    component: () => import('@/views/login/forgetPassword/forgetCode')
  },
  {
    path: '/forgetDetail',
    name: 'forgetDetail',
    component: () => import('@/views/login/forgetPassword/forgetDetail')
  },
    //---------我的-----------
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/index/mine/setting/setting')
  },
  {
    path: '/manageaddress',
    name: 'Manageaddress',
    component: () => import('@/views/index/mine/manageaddress/manageaddress')
  },
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: () => import('@/views/index/mine/userinfo/userinfo')
  },
  {
    path: '/editPhone',
    name: 'editPhone',
    component: () => import('@/views/index/mine/userinfo/editPhone')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/index/mine/history/history')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/index/mine/collect/collect')
  },
    //--------商品详情---------------
  {
    path: '/productdetail',
    name: 'ProductDetail',
    component: () => import('@/views/productDetail/productDetail')
  },
  //--------订单---------------
  {
    path: '/paypage',
    name: 'Paypage',
    component: () => import('@/views/paypage/paypage')
  },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/index/orders/orderDetail/orderDetail')
    },


  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/pay/pay')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
import store from '../store/index'
router.beforeEach((to,from,next) => {
  if (store.getters.GET_USERID===0){
    if (to.name != 'Setting' && to.name != 'Manageaddress' && to.name != 'Userinfo'
    && to.name != 'Paypage') {
      next()
    }else{
      next('/login')
    }
  }
  next()
})

export default router
