import request from '@/utils/request'

// webRtc
export function webRtcControl (data) {
  return request({
    url: '/play/start_webrtc',
    method: 'post',
    data: data
  })
}

// 直播广播
export function liveControl (data) {
  return request({
    url: '/play/liveControl',
    method: 'post',
    data: data
  })
}

// 获取麦克风列表
export function queryMicrophone (data) {
  return request({
    url: '/deviceapi/device_query_control_myself',
    method: 'post',
    data: data
  })
}

// 音频播放
export function musicControlNew (data) {
  return request({
    url: '/play/musicControlNew',
    method: 'post',
    data: data
  })
}

// 紧急停止
export function urgentStop (data) {
  return request({
    url: '/play/urgent_stop',
    method: 'get'
  })
}
