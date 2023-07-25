import request from '@/utils/request'

// 获取音乐列表
export function queryMusic (data) {
  return request({
    url: '/musicapi/query_music',
    method: 'post',
    params: data
  })
}

// 获取音乐类型列表
export function queryMusicType (data) {
  return request({
    url: '/musictypeapi/query_type',
    method: 'post',
    params: data
  })
}

// 添加音乐
export function addMusic (data) {
  return request({
    url: '/musicapi/add_music',
    method: 'post',
    params: data
  })
}

// 添加音乐类型
export function addMusicType (data) {
  return request({
    url: '/musictypeapi/add_music_type',
    method: 'post',
    params: data
  })
}

// 删除音乐
export function deleteMusic (data) {
  return request({
    url: '/musicapi/delete_music',
    method: 'post',
    params: data
  })
}

// 删除音乐类型
export function deleteMusicType (data) {
  return request({
    url: '/musictypeapi/delete_music_type',
    method: 'post',
    params: data
  })
}

// 编辑音乐
export function modifyMusic (data) {
  return request({
    url: '/musicapi/modify_music',
    method: 'post',
    params: data
  })
}

// 编辑音乐类型
export function modifyMusicType (data) {
  return request({
    url: '/musictypeapi/modify_music',
    method: 'post',
    params: data
  })
}

// 上传音乐
export function upLoadMusic (data) {
  return request({
    url: '/musicapi/upload_audio',
    method: 'post',
    data: data
  })
}

// 获取保存的播放音乐列表
export function queryMusicControl (data) {
  return request({
    url: '/play/querymusicControl',
    method: 'post',
    data: data
  })
}
