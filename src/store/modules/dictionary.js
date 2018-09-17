
import { getTreeDic } from '@/api/dictionary'

const dict = {
  state: {
    nation: [],
    native: [],
    politicalstatus: [],
    healthcondition:[],
    persontype: [],
    staffing:[],
    technical:[],
    institutions:[],
    job:[],
    joblevel:[],
    jobtype:[],
    workrank:[],
    code:[],
    degree:[],
    major:[],
    title:[],
    award:[],
    approveoffice:[],
    approveofficelevel:[],
    approveofficenature:[],
    disciplinaryaction:[]
  },

  mutations: {
    SET_NATION: (state, nation) => {//1 民族
      state.nation = nation
    },
    SET_NATIVE: (state, native) => {//2 籍贯
      state.native = native
    },
    SET_POLITICALSTATUS: (state, politicalstatus) => {//4 政治面貌
      state.politicalstatus = politicalstatus
    },
    SET_HEALTHCONDITION: (state, healthcondition) => {//6 政治面貌
      state.healthcondition = healthcondition
    },
    SET_PERSONTYPE: (state, persontype) => {//7人员类型
      state.persontype = persontype
    },
    SET_STAFFING: (state, staffing) => {//8 人员编制
      state.staffing = staffing
    },

    SET_TECHNICAL: (state, technical) => {//9 专业技术职务资格
      state.technical = technical
    },
    SET_APPROACH: (state, approach) => {//10 获得资格途径
      state.approach = approach
    },
    SET_INSTITUTIONS: (state, institutions) => {//11 任职机构名称：
      state.institutions = institutions
    },
    SET_JOB: (state, job) => {//12 职务名称：
      state.job = job
    },
    SET_TEAMTYPE: (state, teamtype) => {//14 班子成员类别：
      state.teamtype = teamtype
    },
    SET_JOBLEVEL: (state, joblevel) => {//15 职务层次：
      state.joblevel = joblevel
    },
    SET_JOBTYPE: (state, jobtype) => {//16 职务类别：
      state.jobtype = jobtype
    },
    SET_WORKRANK: (state, workrank) => {//17 职级
      state.workrank = workrank
    },
    SET_CODE: (state, code) => {//19 学历
      state.code = code
    },
    SET_DEGREE: (state, degree) => {//20 学位
      state.degree = degree
    },
    SET_MAJOR: (state, major) => {//28 国家规定大学专业分类
      state.major = major
    },
    SET_TITLE: (state, title) => {//21 称谓
      state.title = title
    },
    SET_AWARD: (state, award) => {//21 称谓
      state.award = award
    },
    SET_APPROVEOFFICE: (state, approveoffice) => {//21 称谓
      state.approveoffice = approveoffice
    },
    SET_APPROVEOFFICELEVEL: (state, approveofficelevel) => {//21 称谓
      state.approveofficelevel = approveofficelevel
    },
    SET_APPROVEOFFICENATURE: (state, approveofficenature) => {//21 称谓
      state.approveofficenature = approveofficenature
    },
    SET_DISCIPLINARYACTION: (state, disciplinaryaction) => {//21 称谓
      state.disciplinaryaction = disciplinaryaction
    }
  },

  actions: {
    // 登录
    CacheDict({ commit }) {
      	return new Promise((resolve, reject) => {
	        getTreeDic(1).then(response => {
	          commit('SET_NATION', response.obj?response.obj:[])
	          resolve()
	        }).catch(error => {
	          reject("民族字典表获取失败")
	        })
	        getTreeDic(2).then(response => {
	          commit('SET_NATIVE', response.obj?response.obj:[])
	          resolve()
	        }).catch(error => {
	          reject("籍贯字典表获取失败")
	        })
	        getTreeDic(4).then(response => {
	          commit('SET_POLITICALSTATUS', response.obj?response.obj:[])
	          resolve()
	        }).catch(error => {
	          reject("政治面貌字典表获取失败")
	        })
          getTreeDic(6).then(response => {
            commit('SET_HEALTHCONDITION', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("健康状况字典表获取失败")
          })
	        getTreeDic(7).then(response => {
	          commit('SET_PERSONTYPE', response.obj?response.obj:[])
	          resolve()
	        }).catch(error => {
	          reject(error)
	        })
	        getTreeDic(8).then(response => {
	          commit('SET_STAFFING', response.obj?response.obj:[])
	          resolve()
	        }).catch(error => {
	          reject("人员编制字典表获取失败")
	        })
          getTreeDic(9).then(response => {
            commit('SET_TECHNICAL',response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("专业技术职务资格字典表获取失败")
          })
          getTreeDic(10).then(response => {
            commit('SET_APPROACH', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("获得资格途径字典表获取失败")
          })
          getTreeDic(11).then(response => {
            commit('SET_INSTITUTIONS', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("任职机构名称字典表获取失败")
          })
          getTreeDic(12).then(response => {
            commit('SET_JOB', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("职务字典表获取失败")
          })
          getTreeDic(14).then(response => {
            commit('SET_TEAMTYPE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("职务类别字典表获取失败")
          })
          getTreeDic(15).then(response => {
            commit('SET_JOBLEVEL', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("职务层次字典表获取失败")
          })
          getTreeDic(16).then(response => {
            commit('SET_JOBTYPE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("职务类别字典表获取失败")
          })
          getTreeDic(17).then(response => {
            commit('SET_WORKRANK', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("职级字典表获取失败")
          })
          getTreeDic(19).then(response => {
            commit('SET_CODE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("学历字典表获取失败")
          })
          getTreeDic(20).then(response => {
            commit('SET_DEGREE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {

            reject("学位字典表获取失败")
          })
          getTreeDic(28).then(response => {
            commit('SET_MAJOR', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("大学专业字典表获取失败")
          })
           getTreeDic(21).then(response => {
            commit('SET_TITLE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("称谓字典表获取失败")
          })
          getTreeDic(24).then(response => {
            commit('SET_APPROVEOFFICE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("批准机关字典表获取失败")
          })
          getTreeDic(25).then(response => {
            commit('SET_APPROVEOFFICELEVEL', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("批准机关级别字典表获取失败")
          })
          getTreeDic(26).then(response => {
            commit('SET_APPROVEOFFICENATURE', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("批准机关性质字典表获取失败")
          })
          getTreeDic(23).then(response => {
            commit('SET_AWARD', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("奖励字典表获取失败")
          })
          getTreeDic(27).then(response => {
            commit('SET_DISCIPLINARYACTION', response.obj?response.obj:[])
            resolve()
          }).catch(error => {
            reject("处分字典表获取失败")
          })
      	})
    },
  }
}

export default dict
