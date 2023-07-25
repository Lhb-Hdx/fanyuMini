import request from '@/utils/request'

// 操作日志
export function logList (data) {
  return request({
    url: '/log/list',
    method: 'get',
    params: data
  })
}

// 播放日志
export function playLogList (data) {
  return request({
    url: '/play/task_log',
    method: 'get',
    params: data
  })
}
