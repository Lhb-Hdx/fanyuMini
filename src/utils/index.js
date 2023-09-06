export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  let fomatDate = new Date(date)
  let year, month, day, hour, minute, second
  year = fomatDate.getFullYear()
  month = fomatDate.getMonth() + 1
  day = fomatDate.getDate()
  hour = fomatDate.getHours()
  minute = fomatDate.getMinutes()
  second = fomatDate.getSeconds()
  if (month < 10) month = 0 + month
  if (day < 10) day = 0 + day
  if (hour < 10) hour = 0 + hour
  if (minute < 10) minute = 0 + minute
  if (second < 10) second = 0 + second
  return `${year}-${month}-${day}${'  '}${hour}:${minute}:${second}`
}
