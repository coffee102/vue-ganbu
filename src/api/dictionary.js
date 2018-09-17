import request from '@/utils/request'
export function getDic(type, parentID) {
  return request({
    url: '/person/getDic',
    method: 'post',
    data: {
      type,
      parentID
    }
  })
}
export function getTreeDic(type) {
  return request({
    url: '/person/getTreeDic',
    method: 'post',
    data: {
      type,
    }
  })
}