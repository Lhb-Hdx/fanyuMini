import request from '@/utils/request'

export function agentSetList (data) {
  return request({
    url: '/rate/getAgentSetList',
    method: 'get',
    params: data
  })
}

export function getAgentRate (data) {
  return request({
    url: '/rate/getAgentRate',
    method: 'get',
    params: data
  })
}

export function agentAccountSet (data) {
  return request({
    url: '/rate/getAgentAccountSet',
    method: 'get',
    params: data
  })
}

export function partnerSetList (data) {
  return request({
    url: '/rate/getPartnerSetList',
    method: 'get',
    params: data
  })
}

export function updateAgentRateSet (data) {
  return request({
    url: '/rate/updateAgentRateSet',
    method: 'post',
    data: data
  })
}

export function updateAgentAccount (data) {
  return request({
    url: '/rate/updateAgentAccount',
    method: 'post',
    data: data
  })
}

export function updatePartnerRateSet (data) {
  return request({
    url: '/rate/updatePartnerRateSet',
    method: 'post',
    data: data
  })
}
