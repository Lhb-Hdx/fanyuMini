import request from '@/utils/request'

export function queryOrderStatus (params) {
  return request({
    url: '/queryChannel/queryOrderStatus',
    method: 'get',
    params
  })
}

export function queryWithDrawOrderStatus (params) {
  return request({
    url: '/queryChannel/queryWithDrawOrderStatus',
    method: 'get',
    params
  })
}
