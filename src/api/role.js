import request from '@/utils/request'

export function addrole(ROLE_NAME, ROLE_DESCRIPTION,REMARK) {
  return request({
    url: '/role/add',
    method: 'post',
    data: {
      	ROLE_NAME,
      	ROLE_DESCRIPTION,
      	REMARK
    }
  })
}
export function updaterole(ID,ROLE_NAME, ROLE_DESCRIPTION,REMARK) {
  return request({
    url: '/role/update',
    method: 'post',
    data: {
    	ID,
      	ROLE_NAME,
      	ROLE_DESCRIPTION,
      	REMARK
    }
  })
}
export function queryrole() {
  return request({
    url: '/role/query',
    method: 'post',
  })
}
export function deleterole(id) {
  return request({
    url: '/role/delete',
    method: 'post',
    data: {
      id
    }
  })
}