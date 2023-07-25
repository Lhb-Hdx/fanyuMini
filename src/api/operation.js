import request from '@/utils/request'

export function newUserList (data) {
  return request({
    url: '/operation/getPullNewUser',
    method: 'get',
    params: data
  })
}
export function addPullNewUser (data) {
  return request({
    url: '/operation/addPullNewUser',
    method: 'post',
    data: data
  })
}

export function updatePullNewUser (data) {
  return request({
    url: '/operation/updatePullNewUser',
    method: 'post',
    data: data
  })
}

export function delPullNewUser (data) {
  return request({
    url: '/operation/delPullNewUser',
    method: 'post',
    data: data
  })
}

export function pullNewUserReward (data) {
  return request({
    url: '/operation/pullNewUserReward',
    method: 'post',
    data: data
  })
}

export function selectPullNewUser (data) {
  return request({
    url: '/operation/selectPullNewUser',
    method: 'get',
    params: data
  })
}

export function getPullNewUserResult (data) {
  return request({
    url: '/operation/getPullNewUserResult',
    method: 'get',
    params: data
  })
}

export function countPullNewUserResult (data) {
  return request({
    url: '/operation/countPullNewUserResult',
    method: 'get',
    params: data
  })
}

export function getNameRegistration (data) {
  return request({
    url: '/operation/getNameRegistration',
    method: 'get',
    params: data
  })
}

export function getAgentNameRegistration (data) {
  return request({
    url: '/operation/getAgentNameRegistration',
    method: 'get',
    params: data
  })
}

export function selectNameRegistration (data) {
  return request({
    url: '/operation/selectNameRegistration',
    method: 'get',
    params: data
  })
}

export function selectAgentNameRegistration (data) {
  return request({
    url: '/operation/selectAgentNameRegistration',
    method: 'get',
    params: data
  })
}

export function selectRegistration (data) {
  return request({
    url: '/operation/selectRegistration',
    method: 'get',
    params: data
  })
}

export function addHthVerifyHis (data) {
  return request({
    url: '/operation/addHthVerifyHis',
    method: 'post',
    data: data
  })
}

export function selectSignById (data) {
  return request({
    url: '/operation/selectSignById',
    method: 'get',
    params: data
  })
}

export function deleteSignById (data) {
  return request({
    url: '/operation/deleteSignById',
    method: 'post',
    data: data
  })
}

export function addSign (data) {
  return request({
    url: '/operation/addSign',
    method: 'post',
    data: data
  })
}

export function agentSign (data) {
  return request({
    url: '/operation/agentSign',
    method: 'post',
    data: data
  })
}

export function updateSign (data) {
  return request({
    url: '/operation/updateSign',
    method: 'post',
    data: data
  })
}

export function getSigningList (data) {
  return request({
    url: '/operation/getSigningList',
    method: 'get',
    params: data
  })
}

export function countSign (data) {
  return request({
    url: '/operation/countSign',
    method: 'get',
    params: data
  })
}
export function getAgentSignContent (data) {
  return request({
    url: '/operation/getAgentSignContent',
    method: 'get',
    params: data
  })
}

export function selectPlatformWallet (data) {
  return request({
    url: '/operation/selectPlatformWallet',
    method: 'get',
    params: data
  })
}

export function countPlatformWallet (data) {
  return request({
    url: '/operation/countPlatformWallet',
    method: 'get',
    params: data
  })
}
export function countEquityCard (data) {
  return request({
    url: '/operation/equityCardStatistics',
    method: 'get',
    params: data
  })
}

export function blackList (params) {
  return request({
    url: '/riskManager/blackListHome',
    method: 'get',
    params
  })
}

export function blackListChangeState (params) {
  return request({
    url: '/riskManager/blackListState',
    method: 'get',
    params
  })
}

export function addBlack (data) {
  return request({
    url: '/riskManager/blackListAdd',
    method: 'post',
    data
  })
}

export function updateBlack (data) {
  return request({
    url: '/riskManager/blackListUpdate',
    method: 'post',
    data
  })
}

export function queryBlackInfo (params) {
  return request({
    url: '/riskManager/blackListInfo',
    method: 'get',
    params
  })
}

export function queryAgentActList (params) {
  return request({
    url: '/operation/agentActivity',
    method: 'get',
    params
  })
}

export function saveAgentActivity (data) {
  return request({
    url: '/operation/insertAgentActivity',
    method: 'post',
    data
  })
}

export function updateAgentActivity (data) {
  return request({
    url: '/operation/updateActivity',
    method: 'post',
    data
  })
}

export function checkAgentActivity (params) {
  return request({
    url: '/operation/AgentActivityDetail',
    method: 'get',
    params
  })
}

export function operateAgentActivity (data) {
  return request({
    url: '/operation/updateActivityStatue',
    method: 'post',
    data
  })
}

export function agentActivityVerifyName (params) {
  return request({
    url: '/operation/activityName',
    method: 'get',
    params
  })
}

export function agentActivityVerifyTime (params) {
  return request({
    url: '/operation/activityTime',
    method: 'get',
    params
  })
}

export function agentActivityCountByDate (params) {
  return request({
    url: '/operation/activityCountByDate',
    method: 'get',
    params
  })
}

export function agentActivityCount (params) {
  return request({
    url: '/operation/activityCount',
    method: 'get',
    params
  })
}

export function agentActivityByDay (params) {
  return request({
    url: '/operation/referrerDetails',
    method: 'get',
    params
  })
}

export function agentActivityUserDetail (params) {
  return request({
    url: '/operation/userDetails',
    method: 'get',
    params
  })
}

export function editorPoster (data) {
  return request({
    url: '/college/posterEditor',
    method: 'post',
    data
  })
}

export function addPoster (data) {
  return request({
    url: '/college/posterAddition',
    method: 'post',
    data
  })
}

export function queryPoster (params) {
  return request({
    url: '/college/posterRead',
    method: 'get',
    params
  })
}
export function userSuggestions (params) {
  return request({
    url: '/operation/userSuggestions',
    method: 'get',
    params
  })
}

export function userSuggestionsDetail (params) {
  return request({
    url: '/operation/userSuggestionsDetail',
    method: 'get',
    params
  })
}

export function deletePoster (data) {
  return request({
    url: '/college/posterDeleted',
    method: 'post',
    data
  })
}

export function userSuggestionsSolve (data) {
  return request({
    url: '/operation/userSuggestionsSolve',
    method: 'post',
    data
  })
}

export function userSuggestionsExcel (params) {
  return request({
    url: '/operation/userSuggestionsExcel',
    method: 'get',
    params
  })
}
