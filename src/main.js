import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(require('vue-moment'))

Vue.prototype.$store = store
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#3c4253',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#9B9B9B',
      backgroundColor: '#fff',
      selectedColor: '#000000',
      list: [{
        pagePath: 'pages/index/main',
        text: '广播',
        iconPath: '/static/icon/outbroadcast-2.png',
        selectedIconPath: '/static/icon/onbroadcast-2.png'
      }, {
        pagePath: 'pages/task/main',
        text: '任务',
        iconPath: '/static/icon/ontask-2.png',
        selectedIconPath: '/static/icon/outtask-2.png'
      }, {
        pagePath: 'pages/bgMusic/main',
        text: '媒资',
        iconPath: '/static/icon/outmedia-2.png',
        selectedIconPath: '/static/icon/onmedia-22.png'
      }, {
        pagePath: 'pages/my/main',
        text: '我的',
        iconPath: '/static/icon/outmy-2.png',
        selectedIconPath: '/static/icon/onmy-2.png'
      }],
      borderStyle: 'black'
    },
    usingComponents: {
      'vant-area': '/static/vant/area/index',
      'van-swipe-cell': '/static/vant/swipe-cell/index',
      'notice-bar': '/static/vant/notice-bar/index',
      'van-steps': '/static/vant/steps/index',
      'van-dialog': '/static/vant/dialog/index',
      'van-collapse': '/static/vant/collapse/index',
      'van-collapse-item': '/static/vant/collapse-item/index',
      'van-circle': '/static/vant/circle/index',
      'van-tab': '/static/vant/tab/index',
      'van-tabs': '/static/vant/tabs/index'
    },
    plugins: {
      WechatSI: {
        version: '0.3.3',
        provider: 'wx069ba97219f66d99'
      }
    }
  }
}
