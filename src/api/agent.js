import request from '@/utils/request'

// 机构为下级代理商再次申请达标补贴（拒绝之后的）
export function reApplyNewSubsidy (data) {
  return request({
    url: '/subsidy/ReApplyNewSubsidy',
    method: 'post',
    data: data
  })
}

// 机构为下级代理商申请达标补贴
export function newApplySubsidy (data) {
  return request({
    url: '/subsidy/newApplySubsidy',
    method: 'post',
    data: data
  })
}

// 机构为下级代理商再次申请直推补贴（拒绝之后的）
export function reApplySubsidy (data) {
  return request({
    url: '/subsidy/ReApplySubsidy',
    method: 'post',
    data: data
  })
}

// 机构为下级代理商申请直推补贴
export function applySubsidy (data) {
  return request({
    url: '/subsidy/applySubsidy',
    method: 'post',
    data: data
  })
}

// 修改机构头像
export function modifyAgencyAvatar (data) {
  return request({
    url: '/admin/modifyAgencyAvatar',
    method: 'post',
    params: data
  })
}

export function agentList (data) {
  return request({
    url: '/agent/list',
    method: 'get',
    params: data
  })
}

export function agentLevel (data) {
  return request({
    url: '/agent/getAgentLevel',
    method: 'get',
    params: data
  })
}

export function agentReviewList (data) {
  return request({
    url: '/agent/reviewList',
    method: 'get',
    params: data
  })
}

export function selectSalesmen (data) {
  return request({
    url: '/agent/selectSalesmen',
    method: 'get',
    params: data
  })
}

export function getSalesman (data) {
  return request({
    url: '/agent/getSalesman',
    method: 'get',
    params: data
  })
}

export function setSalesmanStatus (data) {
  return request({
    url: '/agent/setSalesmanStatus',
    method: 'post',
    data: data
  })
}

export function getAgentInfo (data) {
  return request({
    url: '/agent/getAgentInfo',
    method: 'get',
    params: data
  })
}

export function agentBackProfit (data) {
  return request({
    url: '/agent/getAgentBackProfit',
    method: 'get',
    params: data
  })
}

export function updateAgentBackProfit (data) {
  return request({
    url: '/agent/updateAgentBackProfit',
    method: 'post',
    data: data
  })
}

export function partnerBackProfit (data) {
  return request({
    url: '/agent/getPartnerBackProfit',
    method: 'get',
    params: data
  })
}

export function settleMessage (data) {
  return request({
    url: '/agent/getSettleMessage',
    method: 'get',
    params: data
  })
}

export function agentSettleMessage (data) {
  return request({
    url: '/agent/getAgentSettleMessage',
    method: 'get',
    params: data
  })
}

export function agentUpgradeSettleMessage (data) {
  return request({
    url: '/agent/getUpgradeAgentSettleMessage',
    method: 'get',
    params: data
  })
}

export function agentReviewSettleMessage (data) {
  return request({
    url: '/agent/getAgentReviewSettleMessage',
    method: 'get',
    params: data
  })
}

export function reviewAgent (data) {
  return request({
    url: '/agent/reviewAgent',
    method: 'post',
    data: data
  })
}

export function reviewResultList (data) {
  return request({
    url: '/agent/reviewResultList',
    method: 'get',
    params: data
  })
}

export function addAgent (data) {
  return request({
    url: '/agent/addAgent',
    method: 'post',
    data: data
  })
}

export function upgradeAgent (data) {
  return request({
    url: '/agent/upgradeAgent',
    method: 'post',
    data: data
  })
}

export function selectAgent (data) {
  return request({
    url: '/agent/selectAgent',
    method: 'get',
    params: data
  })
}

export function selectAgentWithoutHide (data) {
  return request({
    url: '/agent/selectAgentWithoutHide',
    method: 'get',
    params: data
  })
}

export function selectAgentReview (data) {
  return request({
    url: '/agent/selectAgentReview',
    method: 'get',
    params: data
  })
}

export function selectAgentByName (data) {
  return request({
    url: '/agent/selectAgentByName',
    method: 'get',
    params: data
  })
}

export function updateAgent (data) {
  return request({
    url: '/agent/updateAgent',
    method: 'post',
    data: data
  })
}

export function setAgentStatus (data) {
  return request({
    url: '/agent/setAgentStatus',
    method: 'post',
    data: data
  })
}

export function selectSuborAgent (data) {
  return request({
    url: '/agent/selectSuborAgent',
    method: 'get',
    params: data
  })
}

export function selectSuborPartner (data) {
  return request({
    url: '/agent/selectSuborPartner',
    method: 'get',
    params: data
  })
}

export function selectSuborBusiness (data) {
  return request({
    url: '/agent/selectSuborBusiness',
    method: 'get',
    params: data
  })
}

export function getLoggedAgentLevel (data) {
  return request({
    url: '/agent/getLoggedAgentLevel',
    method: 'get',
    params: data
  })
}

export function selectSalesIncoming (data) {
  return request({
    url: '/agent/selectSalesIncoming',
    method: 'get',
    params: data
  })
}

export function addSalesIncoming (data) {
  return request({
    url: '/agent/addSalesIncoming',
    method: 'post',
    data: data
  })
}

export function getSalesIncoming (data) {
  return request({
    url: '/agent/getSalesIncoming',
    method: 'get',
    params: data
  })
}

export function getParentAgentInfo (data) {
  return request({
    url: '/agent/getParentAgentInfo',
    method: 'get',
    params: data
  })
}

export function updateSalesIncoming (data) {
  return request({
    url: '/agent/updateSalesIncoming',
    method: 'post',
    data: data
  })
}
export function deleteAgent () {
  return request({
    url: '/agent/deleteAgent',
    method: 'post'
  })
}

export function cofirmRelationship (data) {
  return request({
    url: '/agent/cofirmRelationship',
    method: 'post',
    data: data
  })
}

export function agentCheck (data) {
  return request({
    url: '/agent/agentCheck',
    method: 'get',
    data: data
  })
}

export function salesmanChange (data) {
  return request({
    url: '/agent/salesmanChange',
    method: 'post',
    data: data
  })
}
