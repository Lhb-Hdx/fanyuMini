import request from '@/utils/request'

// 日统计交易量
export function outWorkerTransactionStatisticsDay (params) {
  return request({
    url: '/outWorker/outWorkerTransactionStatisticsDay',
    method: 'post',
    data: params
  })
}

// 月统计交易量
export function outWorkerTransactionStatisticsMonth (params) {
  return request({
    url: '/outWorker/outWorkerTransactionStatisticsMonth',
    method: 'post',
    data: params
  })
}

// 累计统计交易量
export function outWorkerTransactionStatisticsTotal (params) {
  return request({
    url: '/outWorker/outWorkerTransactionStatisticsTotal',
    method: 'post',
    data: params
  })
}

// 新增业务经理
export function addOutWorker (params) {
  return request({
    url: '/outWorker/addOutWorker',
    method: 'post',
    data: params
  })
}

// 获取业务经理列表
export function selectOutWorker (params) {
  return request({
    url: '/outWorker/selectOutWorker',
    method: 'get',
    params
  })
}

// 修改业务经理状态
export function setOutWorkerStatus (params) {
  return request({
    url: '/outWorker/setOutWorkerStatus',
    method: 'post',
    data: params
  })
}
