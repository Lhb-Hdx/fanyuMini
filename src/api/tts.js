import request from '@/utils/request'

// 获取读音人列表
export function getVoiceNameLst (data) {
  return request({
    url: '/tts/getVoiceNameLst',
    method: 'get'
  })
}

// 文字转语音
export function textToVoice (data) {
  return request({
    url: '/tts/textToVoice',
    method: 'post',
    params: data
  })
}
