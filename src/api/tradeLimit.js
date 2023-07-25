import request from '@/utils/request'

// 列表查询
export function tradeLimitList (data) {
  return request({
    url: '/riskManager/tradeLimit',
    method: 'get',
    params: data
  })
}
// 改变交易限制状态(生效、作废)
export function obsoleteLimit (data) {
  return request({
    url: '/riskManager/tradeLimit/changeStatus',
    method: 'post',
    data: data
  })
}
// 添加交易限制规则
export function addTradeLimit (data) {
  return request({
    url: '/riskManager/tradeLimit/create',
    method: 'post',
    data: data
  })
}
// 修改交易限制规则
export function updateTradeLimit (data) {
  return request({
    url: '/riskManager/tradeLimit/update',
    method: 'post',
    data: data
  })
}
