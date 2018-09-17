import request from '@/utils/request'

//查询某个单位人员列表
export function getDepartmentPersonList(code) {
  return request({
    url: '/person/getDepartmentPersonList',
    method: 'post',
    data: {
    	code
    }
  })
}
//获取单个用户信息接口
export function getUserInfo(ID) {
  return request({
    url: '/person/getUserInfo',
    method: 'post',
    data: {
    	ID
    }
  })
}
//删除干部信息接口
export function deleteBaseInfo(id) {
  return request({
    url: '/person/deleteBaseInfo',
    method: 'post',
    data: {
    	id
    }
  })
}
//新增修改基础信息 id为0 则新增
export function updateBaseInfo(params) {
  return request({
    url: '/person/updateBaseInfo',
    method: 'post',
    data: params
  })
}
//新增和修改教育培训
export function updateEDUCATIONALTRAINING(params) {
  return request({
    url: '/person/updateEDUCATIONALTRAINING',
    method: 'post',
    data: params
  })
}
//删除教育培训
export function deleteEDUCATIONALTRAINING(id) {
  return request({
    url: '/person/deleteEDUCATIONALTRAINING',
    method: 'post',
    data: {id}
  })
}
//删除学历学位情况
export function deleteEDUCATIONBACKGROUND(id) {
  return request({
    url: '/person/deleteEDUCATIONBACKGROUND',
    method: 'post',
    data: {
    	id
    }
  })
}
//新增修改学历学位情况
export function updateEDUCATIONBACKGROUND(params) {
  return request({
    url: '/person/updateEDUCATIONBACKGROUND',
    method: 'post',
    data: params
  })
}
//新增修改家庭成员及社会关系
export function updateFAMILY(params) {
  return request({
    url: '/person/updateFAMILY',
    method: 'post',
    data: params
  })
}
//新增删除家庭成员及社会关系
export function deleteFAMILY(id) {
  return request({
    url: '/person/deleteFAMILY',
    method: 'post',
    data: {id}
  })
}
//新增修改干部主要特点及不足
export function updateRELATIVEMERITS(params) {
  return request({
    url: '/person/updateRELATIVEMERITS',
    method: 'post',
    data: params
  })
}
//删除干部主要特点及不足
export function deleteRELATIVEMERITS(id) {
  return request({
    url: '/person/deleteRELATIVEMERITS',
    method: 'post',
    data: {id}
  })
}
//删除个人简历
export function deleteRESUME(id) {
  return request({
    url: '/person/deleteRESUME',
    method: 'post',
    data: {id}
  })
}
//新增修改个人简历
export function updateRESUME(params) {
  return request({
    url: '/person/updateRESUME',
    method: 'post',
    data: params
  })
}
//新增修改半年考核
export function updateASSESS(params) {
  return request({
    url: '/person/updateANNUALASSESSMENT_ASSESS',
    method: 'post',
    data: params
  })
}
//删除半年考核
export function deleteASSESS(id) {
  return request({
    url: '/person/deleteANNUALASSESSMENT_ASSESS',
    method: 'post',
    data: {id}
  })
}

export function uploadImage() {
  return request({
    url: '/person/uploadImage',
    method: 'post'
  })
}
export function uploadPerson() {
  return request({
    url: '/person/uploadPerson',
    method: 'post'
  })
}
//模糊查询用户
export function vagueSearch(page,pageSize,content ) {
  return request({
    url: '/person/vagueSearch',
    method: 'post',
    data:{
      page,
      pageSize,
      content
    }
  })
}
//组合查询用户
export function searchUserInfo(params ) {
  return request({
    url: '/person/searchUserInfo',
    method: 'post',
    data:params
  })
}
///新增修干部监督_12380
export function updateREPORT(params) {
  return request({
    url: 'person/updateCADRESUPERVISION_REPORT',
    method: 'post',
    data: params
  })
}
///新增修干部监督_个人事项查核
export function updatePERSON(params) {
  return request({
    url: '/person/updateCADRESUPERVISION_PERSON',
    method: 'post',
    data: params
  })
}
////新增修干部监督_组织处理情况
export function updateHANDLINGINFO(params) {
  return request({
    url: 'person/updateCADRESUPERVISION_HANDLINGINFO',
    method: 'post',
    data: params
  })
}
////新增修改干部监督_经济责任审计
export function updateECNOMIC(params) {
  return request({
    url: 'person/updateCADRESUPERVISION_ECNOMIC',
    method: 'post',
    data: params
  })
}
//新增修干部监督_党纪政务处分
export function updateDISCIPLINARYACTION(params) {
  return request({
    url: 'person/updateCADRESUPERVISION_DISCIPLINARYACTION',
    method: 'post',
    data: params
  })
}

///删除干部监督_12380
export function deleteREPORT(id) {
  return request({
    url: 'person/deleteCADRESUPERVISION_REPORT',
    method: 'post',
    data: {id}
  })
}
///删除修干部监督_个人事项查核
export function deletePERSON(id) {
  return request({
    url: '/person/deleteCADRESUPERVISION_PERSON',
    method: 'post',
    data: {id}
  })
}
////删除修干部监督_组织处理情况
export function deleteHANDLINGINFO(id) {
  return request({
    url: 'person/deleteCADRESUPERVISION_HANDLINGINFO',
    method: 'post',
    data: {id}
  })
}
////删除修改干部监督_经济责任审计
export function deleteECNOMIC(id) {
  return request({
    url: 'person/deleteCADRESUPERVISION_ECNOMIC',
    method: 'post',
    data: {id}
  })
}
//删除修干部监督_党纪政务处分
export function deleteDISCIPLINARYACTION(id) {
  return request({
    url: 'person/deleteCADRESUPERVISION_DISCIPLINARYACTION',
    method: 'post',
    data: {id}
  })
}

////新增修改专业技术职务
export function updateTECHNICAL(params) {
  return request({
    url: 'person/updateBASEINFO_TECHNICALPOSITION',
    method: 'post',
    data: params
  })
}
//新增修改工作单位及职务
export function updateWORKUNITS(params) {
  return request({
    url: 'person/updateBASEINFO_WORKUNITS',
    method: 'post',
    data: params
  })
}
////新增修基本信息___职级信息/熟悉专业有何专长
export function updateWORKRANK(params) {
  return request({
    url: 'person/updateBASEINFO_WORKRANK',
    method: 'post',
    data: params
  })
}
////删除专业技术职务
export function deleteTECHNICAL(id) {
  return request({
    url: 'person/deleteBASEINFO_TECHNICALPOSITION',
    method: 'post',
    data: {id}
  })
}
//删除工作单位及职务
export function deleteWORKUNITS(id) {
  return request({
    url: 'person/deleteBASEINFO_WORKUNITS',
    method: 'post',
    data: {id}
  })
}
////删除基本信息___职级信息/熟悉专业有何专长
export function deleteWORKRANK(id) {
  return request({
    url: 'person/deleteBASEINFO_WORKRANK',
    method: 'post',
    data: {id}
  })
}
////新增修改年度考核_奖励情况
export function updateAWARD(param) {
  return request({
    url: 'person/updateAWARD',
    method: 'post',
    data: param
  })
}
//删除年度考核_奖励情况
export function deleteAWARD(id) {
  return request({
    url: 'person/deleteAWARD',
    method: 'post',
    data: {id}
  })
}