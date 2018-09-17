import request from '@/utils/request'

export function getDepartment(code) {
  return request({
    url: '/department/getDepartment',
    method: 'post',
    data: {
      code
    }
  })
}
export function addDepartment(vo) {
  return request({
    url: '/department/addDepartment',
    method: 'post',
    data: vo
  })
}
export function deleteDepartment(id) {
  return request({
    url: '/department/deleteDepartment',
    method: 'post',
    data: {
    	id
    }
  })
}
export function getDepartmentDetail(id) {
  return request({
    url: '/department/getDepartmentDetail',
    method: 'post',
    data: {
    	id
    }
  })
}
export function updateDepartment(vo) {
  return request({
    url: '/department/updateDepartment',
    method: 'post',
    data: vo
  })
}