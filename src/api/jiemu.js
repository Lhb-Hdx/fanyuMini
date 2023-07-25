import request from '@/utils/request'

// 新建节目
export function addMusicMenu (params) {
  return request({
    url: '/musicapi/addMusicMenu',
    method: 'post',
    params: params.menuname,
    data: params.formData
  })
}

// 获取节目列表
export function getMusicMenu (params) {
  return request({
    url: '/musicapi/getMusicMenu',
    method: 'get',
    params
  })
}

// 获取节目详情
export function getMusicMenuDetail (params) {
  return request({
    url: '/musicapi/getMusicMenuDetail',
    method: 'get',
    params
  })
}

// 编辑节目
export function updateMusicMenu (params) {
  return request({
    url: '/musicapi/updateMusicMenu',
    method: 'post',
    params: params.menuname,
    data: params.formData
  })
}

// 删除节目
export function delMusicMenu (params) {
  return request({
    url: '/musicapi/delMusicMenu',
    method: 'post',
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
