import request from '@/utils/request'

export function adminList (data) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: data
  })
}

export function getAdminInfo (data) {
  return request({
    url: `/admin/${data}`,
    method: 'get',
    params: data
  })
}

export function updateAdmin (id, data) {
  return request({
    url: `/admin/update/${id}`,
    method: 'post',
    data: data
  })
}

export function register (data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function forgotPassword (data) {
  return request({
    url: '/admin/forgotPassword',
    method: 'post',
    data: data
  })
}

export function modifyPassword (data) {
  return request({
    url: '/admin/modifyPassword',
    method: 'post',
    data: data
  })
}

export function updatePassword (data) {
  return request({
    url: '/admin/updatePassword',
    method: 'post',
    data: data
  })
}

export function initPassword (data) {
  return request({
    url: '/admin/initPassword',
    method: 'post',
    data: data
  })
}

export function securitySet (data) {
  return request({
    url: '/admin/securitySet',
    method: 'post',
    data: data
  })
}

export function memberShareReg (data) {
  return request({
    url: '/admin/memberShareReg',
    method: 'get',
    params: data
  })
}

export function agentRegister (data) {
  return request({
    url: '/admin/agentRegister',
    method: 'get',
    params: data
  })
}

export function setAdminStatus (data) {
  return request({
    url: '/admin/setAdminStatus',
    method: 'post',
    data: data
  })
}

export const getPermission = (data) => {
  return request({
    url: `/admin/permission/${data}`,
    method: 'get'
  })
}
