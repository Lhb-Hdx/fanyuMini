import request from '@/utils/request'

// 列表查询
export function shopList (data) {
  return request({
    url: '/college/school',
    method: 'get',
    params: data
  })
}

// 店铺新增
export function shopAdd (data) {
  return request({
    url: '/college/school/add',
    method: 'post',
    data
  })
}

// 根据id查询店铺
export function queryById (data) {
  return request({
    url: '/college/school/updateInfo',
    method: 'get',
    params: data
  })
}

// 更新
export function updateInfo (data) {
  return request({
    url: '/college/school/update',
    method: 'post',
    data
  })
}

// 批量上架
export function upperShelf (data) {
  return request({
    url: '/college/school/shelf',
    method: 'post',
    data
  })
}

// 批量删除
export function shopDelete (data) {
  return request({
    url: '/college/school/delete',
    method: 'post',
    data
  })
}
