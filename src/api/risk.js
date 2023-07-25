import request from '@/utils/request'

// 银行列表
export function bankList (params) {
  return request({
    url: '/riskManager/bank',
    method: 'get',
    params
  })
}

// 添加支持银行
export function saveBank (data) {
  return request({
    url: '/riskManager/bank/create',
    method: 'post',
    data
  })
}

// 根据ID查询支持银行
export function queryBankById (params) {
  return request({
    url: '/riskManager/bank/queryById',
    method: 'get',
    params
  })
}

// 更新支持银行
export function updateBankById (data) {
  return request({
    url: '/riskManager/bank/update',
    method: 'post',
    data
  })
}

// 更改银行状态  0启用  1删除  2维护
export function removeBank (data) {
  return request({
    url: '/riskManager/bank/changeStatus',
    method: 'post',
    data
  })
}

// 渠道列表
export function queryChannelList (params) {
  return request({
    url: '/riskManager/channelList',
    method: 'get',
    params
  })
}
// 人像认证列表
export function faceVerifyList (params) {
  return request({
    url: '/riskManager/faceVerifyList',
    method: 'get',
    params
  })
}

// 人像认证详情
export function faceVerifyInfo (params) {
  return request({
    url: '/riskManager/faceVerifyInfo',
    method: 'get',
    params
  })
}

// 人工认证接口
export function faceVerifySubmit (data) {
  return request({
    url: '/riskManager/commitFaceVerify',
    method: 'post',
    data
  })
}

// 实名认证列表
export function realCertList (params) {
  return request({
    url: '/riskManager/userVerifyHome',
    method: 'get',
    params
  })
}

// 实名认证查看
export function realCertInfo (params) {
  return request({
    url: '/riskManager/userVerifyDetail',
    method: 'get',
    params
  })
}

// 实名认证人工认证
export function realCertSubmit (data) {
  return request({
    url: '/riskManager/userVerifyAuthentication',
    method: 'post',
    data
  })
}
