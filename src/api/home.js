import request from '@/utils/request'

export function homeStat (data) {
  return request({
    url: '/home/homestat',
    method: 'get',
    params: data
  })
}

export function checkUserModifyPassword (data) {
  return request({
    url: '/home/checkUserModifyPassword',
    method: 'get',
    params: data
  })
}
