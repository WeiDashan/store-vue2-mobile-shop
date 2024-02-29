import Vue from 'vue';
import axios from "axios";
import {Notify} from "vant";
import store from '@/store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: 'http://127.0.0.1:8183'
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // console.log("------")
    // console.log(store)
    // console.log("------")
    config.headers.token = store.getters.GET_TOKEN
    // console.log(config)
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const request = (url,method,params,callback) => {

  const wdsconfig = {
    url: url,
    method: method
  }
  if(method === 'get') {
    wdsconfig.params = params
  } else {
    const formData = new FormData()
    for(let key in params) {
      if(params[key] instanceof Array) {
        for(let i = 0; i < params[key].length; i++) {
          formData.append(key, params[key][i])
        }
      }else {
        formData.append(key, params[key])
      }
    }
    wdsconfig.data = formData
  }
  _axios.request(wdsconfig).then(response => {
    if(response.data.code === 200) {
      callback(response.data)
    } else {
      Notify({
        type: 'danger',
        message: response.data.message
      })
    }
  }).catch(error => {
    Notify({
      type: 'danger',
      message: error
    })
  })
}
Vue.prototype.axios = _axios
Vue.prototype.request = request
Vue.prototype.get = (url,params,callback) => {
  request(url,'get',params,response => {
    callback(response.obj)
  })
}
Vue.prototype.post = (url,params,callback) => {
  request(url,'post',params,response => {
    Notify({
      type: 'success',
      message: response.message
    })
    callback(response.obj)
  })
}
// Plugin.install = function(Vue, options) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };
// Vue.use(Plugin)
//
// export default Plugin;
