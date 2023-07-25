import request from '@/utils/request'

// 添加设备获取验证码
export function getdeviceauthcode (data) {
  return request({
    url: '/deviceapi/getdeviceauthcode',
    method: 'post',
    params: data
  })
}

// 添加设备
export function adddevice (data) {
  return request({
    url: '/deviceapi/adddevice',
    method: 'post',
    params: data
  })
}

// 删除设备
export function deletedevice (data) {
  return request({
    url: '/deviceapi/deletedevice',
    method: 'post',
    params: data
  })
}

// 获取管理区域列表
export function areaQueryControl (data) {
  return request({
    url: '/deviceapi/area_query_control',
    method: 'post',
    params: data
  })
}

// 添加区域
export function areaAdd (data) {
  return request({
    url: '/areaapi/area_add',
    method: 'post',
    params: data
  })
}

// 删除区域
export function areaDelete (data) {
  return request({
    url: '/areaapi/area_delete',
    method: 'post',
    params: data
  })
}

// 编辑区域
export function areaUpdate (data) {
  return request({
    url: '/areaapi/area_update',
    method: 'post',
    params: data
  })
}

// 给区域添加设备
export function areaAddDevice (data) {
  return request({
    url: '/areaapi/area_set_device',
    method: 'post',
    params: data.id,
    data: data.list
  })
}

// 获取可以播放区域下的设备
export function queryAllDevice (data) {
  return request({
    url: '/deviceapi/area_query_device_by_mg',
    method: 'get',
    params: data
  })
}

// 获取可以播放区域下的设备
export function queryAllDeviceByPage (data) {
  return request({
    url: '/deviceapi/area_query_device_by_mg_page',
    method: 'get',
    params: data
  })
}

// 获取全校的所有设备
export function querySchoolAllDevice (data) {
  return request({
    url: '/deviceapi/device_query_school_all',
    method: 'post',
    params: data
  })
}

// 修改设备名称
export function setDeviceName (data) {
  return request({
    url: '/deviceControlapi/setDeviceName',
    method: 'get',
    params: data
  })
}

// 获取设备音量和功放
export function getDeviceVoulme (data) {
  return request({
    url: '/deviceControlapi/getVoulme',
    method: 'get',
    params: data
  })
}

// 修改设备音量
export function setSystemVolume (data) {
  return request({
    url: '/deviceControlapi/SetSystemVolume',
    method: 'post',
    params: data
  })
}

// 修改所有设备音量
export function SetSystemVolumeToAllDevice (data) {
  return request({
    url: '/deviceControlapi/SetSystemVolumeToAllDevice',
    method: 'post',
    params: data
  })
}

// 修改设备功放
export function setGongfangLevel (data) {
  return request({
    url: '/deviceControlapi/SetGongfangLevel',
    method: 'post',
    params: data
  })
}

// 获取设备频道
export function getChannel (data) {
  return request({
    url: '/deviceControlapi/getChannel',
    method: 'get',
    params: data
  })
}

// 刷新存储信息
export function refreshDiskInfo (data) {
  return request({
    url: '/deviceControlapi/refreshDiskInfo',
    method: 'get',
    params: data
  })
}

// 修改设备频道
export function setChannel (data) {
  return request({
    url: '/deviceControlapi/setChannel',
    method: 'get',
    params: data
  })
}

// 查询区域及区域下设备
export function schoolQueryAreaDevice (data) {
  return request({
    url: '/deviceapi/school_query_area_device',
    method: 'post',
    params: data
  })
}

// 获取配置给当前用户的设备
export function userDeviceQueryByMgn (data) {
  return request({
    url: '/userDeviceAreaapi/user_device_query_by_mgn',
    method: 'post',
    params: data
  })
}

// 获取配置给当前用户的设备
export function userDeviceQueryByPageMgn (data) {
  return request({
    url: '/userDeviceAreaapi/user_device_query_page_by_mgn',
    method: 'post',
    params: data
  })
}

// 获取配置给当前用户的区域
export function userAreaQueryByMgn (data) {
  return request({
    url: '/userDeviceAreaapi/user_area_query_by_mgn',
    method: 'post',
    params: data
  })
}

// 获取配置给当前用户的区域 分页
export function userAreaQueryByPageMgn (data) {
  return request({
    url: '/userDeviceAreaapi/user_area_query_page_by_mgn',
    method: 'post',
    params: data
  })
}

// 给当前用户配置设备
export function deviceSetControl (data) {
  return request({
    url: '/userDeviceAreaapi/device_set_control',
    method: 'post',
    params: {admin_id: data.id},
    data: data.devicelst
  })
}

// 给当前用户配置区域
export function areaSetControl (data) {
  return request({
    url: '/userDeviceAreaapi/area_set_control',
    method: 'post',
    params: {admin_id: data.id},
    data: data.arealst
  })
}

// 查询扩音
export function queryKuoyinDevice (data) {
  return request({
    url: '/wirelessgb/query_gb_device',
    method: 'get',
    params: data
  })
}

// 查询扩音
export function queryKuoyinDevicePage (data) {
  return request({
    url: '/wirelessgb/query_page_gb_device',
    method: 'get',
    params: data
  })
}

// 设置扩音
export function setKuoyinDevice (data) {
  return request({
    url: '/wirelessgb/set_gb_device',
    method: 'post',
    params: {zhujiao_sn: data.zhujiao_sn},
    data: data.snlst
  })
}

// 上传excel
export function importExcelUsing (data) {
  return request({
    url: '/deviceapi/importExcel',
    method: 'post',
    params: data
  })
}

// 批量处理
export function postCommonedApi (data) {
  return request({
    url: '/deviceControlapi/CommCmd_lst',
    method: 'get',
    params: data
  })
}
