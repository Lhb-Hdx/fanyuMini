import request from '@/utils/request'

// 列表查询
export function bannerList (data) {
  return request({
    url: '/college/banner',
    method: 'get',
    params: data
  })
}

// 批量操作
export function batchShelf (data) {
  return request({
    url: '/college/banner/shelf',
    method: 'post',
    data
  })
}

// 查询优先级
export function getPriority (data) {
  return request({
    url: '/college/banner/priority',
    method: 'get',
    params: data
  })
}

// 批量删除广告
export function bannerDelete (data) {
  return request({
    url: '/college/banner/delete',
    method: 'post',
    data
  })
}

// 广告新增
export function bannerAdd (data) {
  return request({
    url: '/college/banner/add',
    method: 'post',
    data
  })
}

// 广告新增
export function queryByBannerId (data) {
  return request({
    url: '/college/banner/updateInfo',
    method: 'get',
    params: data
  })
}

// 广告更新
export function bannerUpdate (data) {
  return request({
    url: '/college/banner/update',
    method: 'post',
    data
  })
}
