import { formatDate } from '@/utils/date'
export default {
  install (Vue) {
    // date 类型 格式化
    Vue.filter('filterDateToStr', function (value) {
      return value ? formatDate(new Date(Number(value)), 'yyyy-MM-dd hh:mm:ss') : ''
    })
    // 字符串截取 年份  yyyy-MM-dd hh:mm:ss => yyyy-MM-dd
    Vue.filter('filterYear', function (value) {
      return value ? value.substr(0, 10) : null
    })
    // date 类型 格式化
    Vue.filter('filterDateToStrShort', function (value) {
      return value ? formatDate(new Date(Number(value)), 'yyyy-MM-dd') : ''
    })
  }
}
