import request from '@/utils/request'

export function roleList (data) {
  return request({
    url: '/role/list',
    method: 'get',
    params: data
  })
}

export function getRolePermissionTree (data) {
  return request({
    url: `/role/permissionTree/${data}`,
    method: 'get',
    params: data
  })
}

export function getRoleInfo (data) {
  return request({
    url: '/role/getRoleInfo',
    method: 'get',
    params: data
  })
}

export function createRole (data) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}

export function updateRole (data) {
  return request({
    url: `/role/update/${data}`,
    method: 'post',
    data: data
  })
}
export function updatePermission (data) {
  return request({
    url: '/role/permission/update',
    method: 'post',
    data: data
  })
}
