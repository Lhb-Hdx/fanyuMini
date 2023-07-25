import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url 公网部署和开发环境使用
  baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_API : `${location.protocol}//${location.host}/thirdapi`, // 内外网部署使用
  timeout: 300000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    if (parseInt(localStorage.getItem('timeOut')) + 30 * 60 * 1000 < Date.parse(new Date())) {
      store.dispatch('FedLogOut')
      window.location.reload()
    } else {
      localStorage.setItem('timeOut', Date.parse(new Date()))
    }
  }
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 200) {
      // 401:未登录;
      if (res.code === 401 || res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (res.code === 300) { // 300:重复登录;
        MessageBox.confirm('您的账号已经在其他地方登录！', '重复登录', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
