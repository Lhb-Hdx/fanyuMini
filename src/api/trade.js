import request from '@/utils/request'

// 充值记录
export function admindRechargeOrder (data) {
  return request({
    url: '/external/admindRechargeOrder',
    method: 'post',
    data: data
  })
}

// D0服务商有效商户统计
export function AgentMerchantStat (data) {
  return request({
    url: '/transaction/AgentMerchantStat',
    method: 'post',
    data: data
  })
}

// 商务经理有效商户统计
export function BMMerchantStat (data) {
  return request({
    url: '/transaction/BMMerchantStat',
    method: 'post',
    data: data
  })
}

// 商务经理交易量统计
export function BMSettlement (data) {
  return request({
    url: '/transaction/BMSettlement',
    method: 'post',
    data: data
  })
}

// 运营人员审核直推补贴申请列表
export function applySubsidyList (data) {
  return request({
    url: '/subsidy/applySubsidyList',
    method: 'post',
    data: data
  })
}

// 运营人员审核达标补贴申请列表
export function newaApplySubsidyList (data) {
  return request({
    url: '/subsidy/newApplySubsidyList',
    method: 'post',
    data: data
  })
}

// 运营人员审核直推补贴申请
export function applySubsidyReview (data) {
  return request({
    url: '/subsidy/applySubsidyReview',
    method: 'post',
    data: data
  })
}

// 运营人员审核达标补贴申请
export function newApplySubsidyReview (data) {
  return request({
    url: '/subsidy/newApplySubsidyReview',
    method: 'post',
    data: data
  })
}

// 将提现中的订单设置为提现失败
export function UserGetMoneyModify (data) {
  return request({
    url: '/UserGetMoney/modify',
    headers: {'Confirm': data.Confirm},
    method: 'post',
    data: data.in
  })
}

export function tradeRecord (data) {
  return request({
    url: '/transaction/transactionRecord',
    method: 'get',
    params: data
  })
}

export function tradeDetails (data) {
  return request({
    url: '/transaction/distributionDetails',
    method: 'get',
    params: data
  })
}

export function agentSettlement (data) {
  return request({
    url: '/transaction/agentSettlement',
    method: 'post',
    data: data
  })
}

export function exportReportExcel (data) {
  return request({
    url: '/transaction/exportReportExcel',
    method: 'post',
    data: data
  })
}

export function agentSettlementDetails (data) {
  return request({
    url: '/transaction/agentSettlementDetails',
    method: 'get',
    params: data
  })
}

export function details (data) {
  return request({
    url: '/transaction/details',
    method: 'get',
    params: data
  })
}

export function agentGetMoney (data) {
  return request({
    url: '/transaction/agentGetMoney',
    method: 'get',
    params: data
  })
}
export function commissionRecord (data) {
  return request({
    url: '/transaction/commissionRecord',
    method: 'get',
    params: data
  })
}
// 支付记录接口
export function paymentRecord (data) {
  return request({
    url: '/transaction/paymentRecord',
    method: 'get',
    params: data
  })
}
// 导出支付记录接口
export function getPaymentRecordNoPage (data) {
  return request({
    url: '/transaction/getPaymentRecordNoPage',
    method: 'post',
    params: data
  })
}

// 导出提现记录接口
export function agentGetMoneyNoPage (data) {
  return request({
    url: '/transaction/agentGetMoneyNoPage',
    method: 'post',
    params: data
  })
}

// 导出活动奖励记录接口
export function activityRewardDetailsExport (data) {
  return request({
    url: '/transaction/activityRewardDetailsExport',
    method: 'get',
    params: data
  })
}

// 导出交易分润记录接口
export function distributionDetailsExport (data) {
  return request({
    url: '/transaction/distributionDetailsExport',
    method: 'get',
    params: data
  })
}

// 数据可导出状态
export function getDownloadStatus (data) {
  return request({
    url: '/download/getStatus',
    method: 'get',
    params: data
  })
}

// 交易金额汇总
export function getPaymentRecordCount (data) {
  return request({
    url: '/transaction/getPaymentRecordCount',
    method: 'get',
    params: data
  })
}

// 提现金额汇总
export function agentGetMoneyCount (data) {
  return request({
    url: '/transaction/agentGetMoneyCount',
    method: 'get',
    params: data
  })
}

// 下载可导出数据
export function downloadExcelFile (data) {
  return request({
    url: '/download/downloadfile',
    method: 'get',
    params: data
  })
}

export function transactionRecord (data) {
  return request({
    url: '/transaction/tradeRecord',
    method: 'get',
    params: data
  })
}

export function transactionDetail (data) {
  return request({
    url: '/transaction/transactionDetail',
    method: 'get',
    params: data
  })
}

export function transactionStatistics (data) {
  return request({
    url: '/transaction/transactionStatistics',
    method: 'get',
    params: data
  })
}

export function paymentRecordExcel (data) {
  return request({
    url: '/transaction/paymentRecordExcel',
    method: 'get',
    params: data
  })
}

// 奖励明细 列表
export function commenderDetailList (params) {
  return request({
    url: '/transaction/activityRewardDetails',
    method: 'get',
    params
  })
}

// 奖励明细 合计
export function commenderDetailCount (params) {
  return request({
    url: '/transaction/activityRewardAmount',
    method: 'get',
    params
  })
}

// 购物分润明细
export function shoppingDistribution (params) {
  return request({
    url: '/transaction/shoppingDistribution',
    method: 'get',
    params
  })
}

// 购物分润详情
export function shoppingDetails (params) {
  return request({
    url: '/transaction/shoppingDetails',
    method: 'get',
    params
  })
}

// 购物分润统计
export function shoppingStatistics (params) {
  return request({
    url: '/transaction/shoppingStatistics',
    method: 'get',
    params
  })
}

// 获取手机号
export function getPhones (data) {
  return request({
    url: '/transaction/getPhones',
    method: 'post',
    data
  })
}

// 发送短信
export function sendMessages (data) {
  console.log(data)
  return request({
    url: '/transaction/sendMessages',
    method: 'post',
    data
  })
}

// 查询支付记录日志
export function tradeLogList (data) {
  return request({
    url: '/log/listthird',
    method: 'post',
    data
  })
}
