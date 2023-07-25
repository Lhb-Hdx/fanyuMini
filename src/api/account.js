import request from '@/utils/request'

// 日经营分析总表
export function analyseTotalTableRecord (params) {
  return request({
    url: '/caiwu_stat/daystat',
    method: 'get',
    params
  })
}

// 对账记录
export function checkRecord (params) {
  return request({
    url: '/accountsManage/checkRecord',
    method: 'get',
    params
  })
}

// 对账总计
export function checkRecordCollect (params) {
  return request({
    url: '/accountsManage/checkRecordCollect',
    method: 'get',
    params
  })
}

// 每日对账记录总计
export function checkRecordDaily (params) {
  return request({
    url: '/accountsManage/checkRecordDaily',
    method: 'get',
    params
  })
}

// 用户对账记录
export function userCheckRecord (params) {
  return request({
    url: '/accountsManage/userCheckRecord',
    method: 'get',
    params
  })
}

// 用户对账记录详情
export function userCheckRecordDetail (params) {
  return request({
    url: '/accountsManage/userCheckRecordDetail',
    method: 'get',
    params
  })
}
