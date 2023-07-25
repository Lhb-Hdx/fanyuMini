import request from '@/utils/request'

export function advisoryList (data) {
  return request({
    url: '/agentAdvisory/list',
    method: 'get',
    params: data
  })
}

export function saveAdvisory (data) {
  return request({
    url: '/agentAdvisory/save',
    method: 'post',
    data: data
  })
}

export function queryAgentOrgn (data) {
  return request({
    url: '/agentAdvisory/queryAgentOrgnByPhone',
    method: 'get',
    params: data
  })
}

export function saveHandleInfo (data) {
  return request({
    url: '/agentAdvisory/saveHandleInfo',
    method: 'post',
    data: data
  })
}
