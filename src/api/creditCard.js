import request from '@/utils/request'

export function creditCardStat (data) {
  return request({
    url: '/creditCard/creditCardStat',
    method: 'get',
    params: data
  })
}

export function integralStat (data) {
  return request({
    url: '/creditCard/integralStat',
    method: 'get',
    params: data
  })
}
