import request from '@/utils/request'

export function permissionList (data) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: data
  })
}
export function permissionTree (data) {
  return request({
    url: '/permission/treeList',
    method: 'get',
    params: data
  })
}
