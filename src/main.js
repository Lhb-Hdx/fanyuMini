import Vue from 'vue'
import MyPlugins from '@/plugins/myplugin'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import SlideVerify from 'vue-monoplasty-slide-verify'
import '../static/css/theme/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import '@/validate' // validate

Vue.use(VueQuillEditor)
// Vue.use(ElementUI, { locale, size: 'small', zIndex: 3000 })
Vue.use(SlideVerify)
Vue.use(MyPlugins)
Vue.config.productionTip = false
console.log('env is' + process.env.NODE_ENV)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
