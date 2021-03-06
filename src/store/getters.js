const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  menuitems: state => state.menu.menuitems,
  loadroutes : state => state.menu.loadroutes,
  nation:state => state.dict.nation,
  native:state => state.dict.native,
  healthcondition:state => state.dict.healthcondition,
  politicalstatus:state => state.dict.politicalstatus,
  persontype:state => state.dict.persontype,
  staffing:state => state.dict.staffing,
  technical:state => state.dict.technical,
  institutions:state => state.dict.institutions,
  job:state => state.dict.job,
  joblevel:state => state.dict.joblevel,
  jobtype:state => state.dict.jobtype,
  workrank:state => state.dict.workrank,
  code:state => state.dict.code,
  degree:state => state.dict.degree,
  major:state => state.dict.major,
  title:state => state.dict.title,
  award:state => state.dict.award,
  approveoffice:state => state.dict.approveoffice,
  approveofficelevel:state => state.dict.approveofficelevel,
  approveofficenature:state => state.dict.approveofficenature,
  disciplinaryaction:state => state.dict.disciplinaryaction
}
export default getters
