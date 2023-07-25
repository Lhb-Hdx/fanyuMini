import request from '@/utils/request'

export function reuploadImage (data) {
  return request({
    url: '/member/reuploadImage',
    method: 'get',
    params: data
  })
}

export function memberList (data) {
  return request({
    url: '/member/list',
    method: 'get',
    params: data
  })
}

export function countMembers (data) {
  return request({
    url: '/member/countMembers',
    method: 'get',
    params: data
  })
}

export function findInviteHistorys (data) {
  return request({
    url: '/member/findInviteHistorys',
    method: 'get',
    params: data
  })
}

export function selectSuborBusiness (data) {
  return request({
    url: '/member/selectSuborBusiness',
    method: 'get',
    params: data
  })
}

export function selectSuborPartner (data) {
  return request({
    url: '/member/selectSuborPartner',
    method: 'get',
    params: data
  })
}

export function setMemberStatus (data) {
  return request({
    url: '/member/setMemberStatus',
    method: 'post',
    data: data
  })
}

export function updateMember (data) {
  return request({
    url: '/member/updateMember',
    method: 'post',
    data: data
  })
}
export function selectMember (data) {
  return request({
    url: `/member/selectMember/${data}`,
    method: 'get'
  })
}
export function selectMemUpgradeInfo (data) {
  return request({
    url: `/member/selectMemUpgradeInfo/${data}`,
    method: 'get'
  })
}

export function moveMember (data) {
  return request({
    url: '/member/moveMember',
    method: 'post',
    data: data
  })
}

export function deleteMember (data) {
  return request({
    url: '/member/deleteMember',
    method: 'post',
    data: data
  })
}

export function upgradeDianzhu (data) {
  return request({
    url: '/agent/upgradeUserLevel',
    method: 'post',
    params: data
  })
}

export function reviewList (data) {
  return request({
    url: '/member/reviewList',
    method: 'get',
    params: data
  })
}

export function review (data) {
  return request({
    url: '/member/review',
    method: 'post',
    data: data
  })
}

export function memberBackup (data) {
  return request({
    url: `/member/memberBackup/${data}`,
    method: 'get',
    params: data
  })
}

// 激活
export function activeMember (data) {
  return request({
    url: `/member/setCancellationStatus`,
    method: 'post',
    data
  })
}

// 查看激活记录
export function activeMemberRecord (params) {
  return request({
    url: `/member/getLogoutRecords`,
    method: 'get',
    params
  })
}
