import request from '@/utils/request'

// 查询银行分类列表
export function queryBankList (data) {
  return request({
    url: '/BankCard/query',
    method: 'post',
    params: data
  })
}

// 添加银行
export function addBank (data) {
  return request({
    url: '/BankCard/add',
    method: 'post',
    params: data
  })
}

// 编辑银行
export function modifyBank (data) {
  return request({
    url: '/BankCard/modify',
    method: 'post',
    params: data
  })
}

// 删除银行
export function deleteBank (data) {
  return request({
    url: '/BankCard/delete',
    method: 'post',
    params: data
  })
}
