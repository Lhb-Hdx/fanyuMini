import request from '@/utils/request'

// 钱包表头统计数据
export function walletstatStatCount (params) {
  return request({
    url: '/walletstat/StatCount',
    method: 'post',
    params
  })
}

// 钱包统计数据
export function walletstatStat (params) {
  return request({
    url: '/walletstat/Stat',
    method: 'post',
    params
  })
}

// 机构统计数据
export function jigouStat (params) {
  return request({
    url: '/stat/jigouStat',
    method: 'post',
    params
  })
}

// 每月返润
export function FenrunAgentByMonth (params) {
  return request({
    url: '/stat/FenrunAgentByMonth',
    method: 'post',
    params: params
  })
}

// 月结分润统计
export function statAgentByMonth (params) {
  return request({
    url: '/stat/statAgentByMonth',
    method: 'get',
    params: params
  })
}

// 获取交易量日统计列表
export function sallTransactionStatisticsDay (params) {
  return request({
    url: '/transaction/sallTransactionStatisticsDay',
    method: 'post',
    data: params
  })
}

// 获取交易量月统计列表
export function sallTransactionStatisticsMonth (params) {
  return request({
    url: '/transaction/sallTransactionStatisticsMonth',
    method: 'post',
    data: params
  })
}

// 获取交易量累计统计列表
export function sallTransactionStatisticsTotal (params) {
  return request({
    url: '/transaction/sallTransactionStatisticsTotal',
    method: 'post',
    data: params
  })
}

// 获取交易量统计列表
export function sallTransactionStatistics (params) {
  return request({
    url: '/transaction/sallTransactionStatistics',
    method: 'post',
    data: params
  })
}

// 获取核心服务商名称列表
export function queryAgentNameList (params) {
  return request({
    url: '/transaction/queryName',
    method: 'post',
    data: params
  })
}

export function countGetMoneyList (data) {
  return request({
    url: '/count/getMoneyList',
    method: 'get',
    params: data
  })
}

export function getMoneyDetail (data) {
  return request({
    url: '/count/getMoneyDetail',
    method: 'get',
    params: data
  })
}

export function todayNewUserData (data) {
  return request({
    url: '/count/todayNewUserData',
    method: 'get',
    params: data
  })
}

export function newUserData (data) {
  return request({
    url: '/count/newUserData',
    method: 'get',
    params: data
  })
}

export function newCountUserData (data) {
  return request({
    url: '/count/newCountUserData',
    method: 'get',
    params: data
  })
}

export function transactionData (data) {
  return request({
    url: '/count/transactionData',
    method: 'get',
    params: data
  })
}

export function monthData (data) {
  return request({
    url: '/count/monthData',
    method: 'get',
    params: data
  })
}

export function countTransactionData (data) {
  return request({
    url: '/count/countTransactionData',
    method: 'get',
    params: data
  })
}

export function channelDetailData (data) {
  return request({
    url: '/count/channelDetailData',
    method: 'get',
    params: data
  })
}

export function agencyData (data) {
  return request({
    url: '/count/agencyData',
    method: 'get',
    params: data
  })
}

export function agentData (data) {
  return request({
    url: '/count/agentData',
    method: 'get',
    params: data
  })
}

// 平台新增用户数据
export function queryUserAddList (params) {
  return request({
    url: '/count/newUserData',
    method: 'get',
    params
  })
}

// 平台新增用户数据合计
export function queryUserAddListCount (params) {
  return request({
    url: '/count/newCountUserData',
    method: 'get',
    params
  })
}

// 平台今日新增用户数据
export function queryTodayNewUser (params) {
  return request({
    url: '/count/todayNewUserData',
    method: 'get',
    params
  })
}

// 平台本月交易数据
export function queryTradeDataByCurrentMonth (params) {
  return request({
    url: '/count/monthData',
    method: 'get',
    params
  })
}

// 平台交易数据列表
export function queryTradeDataList (params) {
  return request({
    url: '/count/transactionData',
    method: 'get',
    params
  })
}

// 平台交易数据合计
export function queryTradeDataCount (params) {
  return request({
    url: '/count/countTransactionData',
    method: 'get',
    params
  })
}

// 渠道明细数据列表
export function queryChannelDataList (params) {
  return request({
    url: '/count/channelDetailData',
    method: 'get',
    params
  })
}

// 机构用户数据和交易数据
export function queryAgenyUserTradeData (params) {
  return request({
    url: '/count/agencyData',
    method: 'get',
    params
  })
}

// 机构服务商数据
export function queryAgenyAgentData (params) {
  return request({
    url: '/count/agentData',
    method: 'get',
    params
  })
}

// 机构代理总数据
export function queryAgenyAgentCountData (params) {
  return request({
    url: '/count/agentCountData',
    method: 'get',
    params
  })
}

// 机构代理导出
export function agentReport (params) {
  return request({
    url: '/count/agentDataExcel',
    method: 'get',
    params
  })
}
