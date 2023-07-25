import request from '@/utils/request'

// 列表查询
export function materielList (data) {
  return request({
    url: '/college/materiel',
    method: 'get',
    params: data
  })
}

// 物料删除
export function materielDelete (data) {
  return request({
    url: '/college/material/libraryDelete',
    method: 'post',
    data
  })
}

// 物料上架/下架
export function materielShelf (data) {
  return request({
    url: '/college/material/libraryShelf',
    method: 'post',
    data
  })
}

// 新增
export function materielAdd (data) {
  return request({
    url: '/college/materiel/add',
    method: 'post',
    data
  })
}

// 修改
export function materielUpdate (data) {
  return request({
    url: '/college/material/update',
    method: 'post',
    data
  })
}

// 根据ID查询 物料
export function queryMaterielById (data) {
  return request({
    url: '/college/material/updateInfo',
    method: 'get',
    params: data
  })
}
