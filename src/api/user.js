import request from '@/utils/request'

export function queryuser(page,rows,name) {
  return request({
    url: '/user/queryUser',
    method: 'post',
    data: {
    	page,
    	rows,
    	name
    }
  })
}
export function updateuser(queryparams) {
  return request({
    url: '/user/update',
    method: 'post',
    data: queryparams
  })
}
export function deleteuser(id) {
  return request({
    url: '/user/delete',
    method: 'post',
    data: {id}
  })
}
export function addeuser(queryparams) {
  return request({
    url: '/user/add',
    method: 'post',
    data: queryparams
  })
}
