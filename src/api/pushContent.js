import request from '@/utils/request'

export function pushContentList (data) {
  return request({
    url: '/pushcontent/getAllContent',
    method: 'get',
    params: data
  })
}

export function agentPushContent (data) {
  return request({
    url: '/pushcontent/agentPushContent',
    method: 'get',
    params: data
  })
}

export function addPushContent (data) {
  return request({
    url: '/pushcontent/add',
    method: 'post',
    data: data
  })
}

export function modifyPushContent (data) {
  return request({
    url: '/pushcontent/modify',
    method: 'post',
    data: data
  })
}

export function pushContentDetail (data) {
  return request({
    url: '/pushcontent/detail',
    method: 'get',
    params: data
  })
}

export function contentDetail (data) {
  return request({
    url: '/pushcontent/contentDetail',
    method: 'get',
    params: data
  })
}

export function readPushContent (data) {
  return request({
    url: '/pushcontent/read',
    method: 'get',
    params: data
  })
}

export function deletePushContent (data) {
  return request({
    url: '/pushcontent/delete',
    method: 'post',
    data: data
  })
}
