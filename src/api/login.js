import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserInfo',
    method: 'POST',
    //params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getMenuTree() {
  return request({
    url: '/menu/tree',
    method: 'post'
  })
}
export function queryOwnedPermission() {
  return request({
    url: '/menu/queryOwnedPermission',
    method: 'post'
  })
}