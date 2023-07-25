import request from '@/utils/request'

// 注册新的企业
export function addEnterprise (data) {
  return request({
    url: '/admin/school_add',
    method: 'post',
    params: data
  })
}

// 手机验证码加密码登录
export function passwordMobileLogin (data) {
  return request({
    url: '/admin/passwordMobileLogin',
    method: 'post',
    data: data
  })
}

// 码登录
export function loginByCode (data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: data
  })
}

// 手机验证码登录
export function mobileLogin (data) {
  return request({
    url: '/admin/mobileLogin',
    method: 'post',
    data: data
  })
}

// 用户名密码登录
export function login (data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: data
  })
}

export function getInfo () {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export const getVerifyCode = (data) => {
  return request({
    url: '/admin/getVerifyCode',
    method: 'get',
    params: data
  })
}

export const getPermission = (data) => {
  return request({
    url: `/admin/permission/${data}`,
    method: 'get'
  })
}
