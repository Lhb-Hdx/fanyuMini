import request from '@/utils/request'

// 获取任务列表
export function taskQuery (data) {
  return request({
    url: '/taskapi/task_query',
    method: 'post',
    params: data
  })
}

// 删除任务
export function taskDelete (data) {
  return request({
    url: '/taskapi/task_delete',
    method: 'post',
    params: data
  })
}

// 添加任务
export function taskAdd (data) {
  return request({
    url: '/taskapi/task_add',
    method: 'post',
    data: data
  })
}

// 添加任务
export function taskUpdate (data) {
  return request({
    url: '/taskapi/task_update',
    method: 'post',
    params: {taskid: data.taskid},
    data: data.oTaskParam
  })
}

// 手动播放任务
export function musicControlNew (data) {
  return request({
    url: '/play/musicControlNew',
    method: 'post',
    data: data
  })
}

// 查询不播放的日期
export function restDayQuery (data) {
  return request({
    url: '/taskapi/rest_day_query',
    method: 'get',
    params: data
  })
}

// 删除不播放的日期
export function restDayDelete (data) {
  return request({
    url: '/taskapi/rest_day_delete',
    method: 'post',
    data: data.lst
  })
}

// 增加不播放的日期
export function restDayAdd (data) {
  return request({
    url: '/taskapi/rest_day_add',
    method: 'post',
    data: data.lst
  })
}

// 查询类型列表
export function taskClassQuery (data) {
  return request({
    url: '/taskclassapi/task_class_query',
    method: 'post',
    params: data
  })
}

// 添加类型
export function taskClassAdd (data) {
  return request({
    url: '/taskclassapi/task_class_add',
    method: 'get',
    params: data
  })
}

// 删除类型
export function taskClassDelete (data) {
  return request({
    url: '/taskclassapi/task_class_delete',
    method: 'post',
    params: data
  })
}

// 更细类型
export function taskClassUpdate (data) {
  return request({
    url: '/taskclassapi/task_class_update',
    method: 'post',
    data: data
  })
}

// 更新类型状态
export function taskClassUpdateStatus (data) {
  return request({
    url: '/taskclassapi/task_class_update_status',
    method: 'post',
    params: data
  })
}

// 手动任务播放
export function taskToPlay (data) {
  return request({
    url: '/play/TaskControl',
    method: 'post',
    data: data
  })
}
