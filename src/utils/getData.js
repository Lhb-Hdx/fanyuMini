import {fetch} from './utils'
const env = process.env
const context = env.CONTEXT
// const context2 = env.CONTEXT2
// const context3 = env.CONTEXT3

/**
* 一级接口
*/
// admin 接口
// const adminInterface = `${context}/admin`

// portal 接口
// const portalInterface = `${context}/portal`

// payportal 接口
// const payportalInterface = `${context}/payportal`

/**
* 详细接口
*/

// 会员获取手机验证码
const getVerifyCodeUrl = `${context}/thirdapi/admin/getVerifyCode`

// 会员密码登录
const loginUrl = `${context}/thirdapi/admin/login`

// 会员验证码登录
const mobileLoginUrl = `${context}/thirdapi/admin/mobileLogin`

// 会员密码验证码登录
const passwordMobileLoginUrl = `${context}/thirdapi/admin/passwordMobileLogin`

// 获取用户信息
const infoUrl = `${context}/thirdapi/admin/info`

// 获取阿里oss签名
const aliOssSignUrl = `${context}/thirdapi/aliyun/oss/policy`

// 按类型查询广播
const taskQueryUrl = `${context}/thirdapi/taskapi/task_query`

// 添加广播
const taskAddUrl = `${context}/thirdapi/taskapi/task_add`

// 删除广播
const taskDeleteUrl = `${context}/thirdapi/taskapi/task_delete`

// 编辑广播
const taskUpdateUrl = `${context}/thirdapi/taskapi/task_update`

// 手动播放广播
const musicControlNewUrl = `${context}/thirdapi/play/musicControlNew`

// 查询音乐列表
const queryMusicUrl = `${context}/thirdapi/musicapi/query_music`

// 查询音乐类型列表
const queryMusicTypeUrl = `${context}/thirdapi/musictypeapi/query_type`

// 查询节目类型列表
const queryProgramTypeUrl = `${context}/thirdapi/musicapi/getMusicMenu`

// 查询节目类型详情列表
const queryProgramDetailsTypeUrl = `${context}/thirdapi/musicapi/getMusicMenuDetail`

// 查询所有设备列表
const deviceQuerySchoolAllUrl = `${context}/thirdapi/deviceapi/device_query_control_myself`

// 获取某个设备的音量
const getVoulmeUrl = `${context}/thirdapi/deviceControlapi/getVoulme`

// 修改某个设备的音量
const SetSystemVolumeUrl = `${context}/thirdapi/deviceControlapi/SetSystemVolume`

// 查询可以播放的区域列表
const areaQueryAllUrl = `${context}/thirdapi/deviceapi/area_query_can_play`

// 查询可以播放的区域下的设备列表
const areaQueryDeviceUrl = `${context}/thirdapi/deviceapi/area_query_device`

// 查询读音人列表
const getVoiceNameLstUrl = `${context}/thirdapi/tts/getVoiceNameLst`

// 文字转语音
const textToVoiceUrl = `${context}/thirdapi/tts/textToVoice`

// 查询任务分类列表
const taskClassQueryUrl = `${context}/thirdapi/taskclassapi/task_class_query`

// 播放手动任务
const toPlayTaskUrl = `${context}/thirdapi/play/TaskControl`

// 紧急停播
const toUrgentStopPlayUrl = `${context}/thirdapi/play/urgent_stop`

// 获取rtmp接口
const startRrtmpUrl = `${context}/thirdapi/play/start_rtmp`

/**
* 方法实现
*/
// 用户获取验证码
export const getVerifyCode = form => fetch(getVerifyCodeUrl, form, 'get')

// 用户密码登录
export const login = form => fetch(loginUrl, form)

// 用户验证码登录
export const mobileLogin = form => fetch(mobileLoginUrl, form)

// 用户密码验证码登录
export const passwordMobileLogin = form => fetch(passwordMobileLoginUrl, form)

// 用户信息
export const info = form => fetch(infoUrl, form, 'get')

// 获取阿里云的签名
export const aliOssSign = form => fetch(aliOssSignUrl, form, 'get', {nologin: true})

// 按类型查询广播列表
export const taskQuery = form => fetch(`${taskQueryUrl}?type=${form.type}&pageSize=${form.pageSize}&pageNum=${form.pageNum}`, form)

// 添加广播
export const taskAdd = form => fetch(taskAddUrl, form)

// 编辑广播
export const taskUpdate = form => fetch(`${taskUpdateUrl}?taskid=${form.id}`, form)

// 删除广播
export const taskDelete = form => fetch(`${taskDeleteUrl}?taskid=${form.taskid}`, form)

// 手动播放广播
export const musicControlNew = form => fetch(musicControlNewUrl, form)

// 获取音乐列表
export const queryMusic = form => fetch(`${queryMusicUrl}?pageSize=${form.pageSize}&pageNum=${form.pageNum}&music_type=${form.music_type}`, form)

// 获取音乐类型列表
export const queryMusicType = form => fetch(`${queryMusicTypeUrl}?pageSize=${form.pageSize}&pageNum=${form.pageNum}`, form)

// 获取节目类型列表
export const queryProgramType = form => fetch(`${queryProgramTypeUrl}?pageSize=${form.pageSize}&pageNum=${form.pageNum}`, form, 'get')

// 获取节目类型列表
export const queryProgramDetailsType = form => fetch(`${queryProgramDetailsTypeUrl}?menunid=${form.menunid}`, form, 'get')

// 查询所有设备列表
export const deviceQuerySchoolAll = form => fetch(deviceQuerySchoolAllUrl, form)

// 获取某个设备的音量
export const getVoulme = form => fetch(getVoulmeUrl, form, 'get')

// 修改某个设备的音量
export const SetSystemVolume = form => fetch(`${SetSystemVolumeUrl}?systemVolume=${form.systemVolume}&sn=${form.sn}`, form)

// 获取可以播放的区域列表
export const areaQueryAll = form => fetch(`${areaQueryAllUrl}?pageSize=${form.pageSize}`, form)

// 查询可以播放的区域下的设备列表
export const areaQueryDevice = form => fetch(areaQueryDeviceUrl, form)

// 通过devicename和sn字段查询可以播放的区域下的设备列表
export const areaQueryDeviceSearch = form => fetch(`${areaQueryDeviceUrl}?devicename=${form.devicename}`, form.area_ids)

// 查询读音人列表
export const getVoiceNameLst = form => fetch(getVoiceNameLstUrl, form, 'get')

// 文字转语音
export const textToVoice = form => fetch(`${textToVoiceUrl}?voice_name=${form.name}&text=${form.text}`, form)

// 获取任务分类列表
export const taskClassQuery = form => fetch(`${taskClassQueryUrl}?pageSize=${form.pageSize}&pageNum=${form.pageNum}`, form)

// 播放手动任务
export const toPlayTask = form => fetch(toPlayTaskUrl, form)

// 紧急停播
export const toUrgentStopPlay = form => fetch(toUrgentStopPlayUrl, form, 'get')

// 获取rtmp接口
export const startRrtmp = form => fetch(startRrtmpUrl, form)
