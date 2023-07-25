import request from '@/utils/request'

export function canWithdraw (data) {
  return request({
    url: '/agentWallet/getcantixianAll',
    method: 'get',
    params: data
  })
}

export function butieWithdraw (data) {
  return request({
    url: '/agentWallet/appGetWithdraw_butie',
    method: 'post',
    data: data
  })
}

export function fenrunWithdraw (data) {
  return request({
    url: '/agentWallet/appGetWithdraw',
    method: 'post',
    data: data
  })
}

export function withdraw (data) {
  return request({
    url: '/agentWallet/gettixian',
    method: 'post',
    data: data
  })
}

export function withdrawRecord (data) {
  return request({
    url: '/agentWallet/gettixianRecord',
    method: 'get',
    params: data
  })
}

export function withdrawRecordButie (data) {
  return request({
    url: '/agentWallet/gettixianRecord_butie',
    method: 'get',
    params: data
  })
}

export function getVerifyCode (data) {
  return request({
    url: '/agentWallet/getVerifyCode',
    method: 'get',
    params: data
  })
}

export function submerchantgettixian (data) {
  return request({
    url: '/agentWallet/submerchantgettixian',
    method: 'post',
    data: data
  })
}
