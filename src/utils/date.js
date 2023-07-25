// date.js
export function formatLastDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth(),
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function str2Date (dateStr, separator) {
  if (!separator) {
    separator = '-'
  }
  let dateArr = dateStr.split(separator)
  let year = parseInt(dateArr[0])
  let month
  // 处理月份为04这样的情况
  if (dateArr[1].indexOf('0') === 0) {
    month = parseInt(dateArr[1].substring(1))
  } else {
    month = parseInt(dateArr[1])
  }
  let day = parseInt(dateArr[2])
  let date = new Date(year, month - 1, day)
  return date
}

export const formatTableDate = (date) => {
  let fomatDate, year, month, day, hour, minute, second
  fomatDate = new Date(date)
  year = 1900 + fomatDate.getYear()
  month = `${fomatDate.getMonth() + 1}`
  day = `${fomatDate.getDate()}`
  hour = `${fomatDate.getHours()}`
  minute = `${fomatDate.getMinutes()}`
  second = `${fomatDate.getSeconds()}`
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}${'  '}${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
}
export function getFrontDay (val) {
  // Date()返回当日的日期和时间。
  var nowDate = new Date()
  // getTime()返回 1970 年 1 月 1 日至今的毫秒数。
  var gettimes = nowDate.getTime() - 1000 * 60 * 60 * 24 * val
  // setTime()以毫秒设置 Date 对象。
  nowDate.setTime(gettimes)
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var today = nowDate.getDate()
  if (today < 10) {
    today = '0' + today
  }
  return year + '-' + month + '-' + today
}

export function getFrontMonth (val) {
  // Date()返回当日的日期和时间。
  var nowDate = new Date()
  nowDate.setMonth(nowDate.getMonth() - val)
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var today = nowDate.getDate()
  if (today < 10) {
    today = '0' + today
  }
  return year + '-' + month + '-' + today
}

export function getFrontYear (val) {
  // Date()返回当日的日期和时间。
  var nowDate = new Date()
  var year = nowDate.getFullYear() - val
  var month = nowDate.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var today = nowDate.getDate()
  if (today < 10) {
    today = '0' + today
  }
  return year + '-' + month + '-' + today
}
