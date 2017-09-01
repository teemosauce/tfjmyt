import Cookies from 'js-cookie'

var host = location.host,
  tenantCode = host.substring(0, host.indexOf('.')).toLocaleUpperCase(),
  vars = {
    bureauTenantCode: 'SY',
    keySessionID: 'SESSION_ID',
    keyUserId: 'UID',
    keySessions: 'SS',
    supportTenants: [{
      code: 'SYFYB',
      name: '扶余北'
    }, {
      code: 'SYDHX',
      name: '德惠西'
    }, {
      code: 'SYCCZ',
      name: '长春'
    }, {
      code: 'SYCCX',
      name: '长春西'
    }, {
      code: 'SYGZL',
      name: '公主岭南'
    }, {
      code: 'SYSPD',
      name: '四平东'
    }, {
      code: 'SYCTX',
      name: '昌图西'
    }, {
      code: 'SYKYX',
      name: '开原西'
    }, {
      code: 'SYTLX',
      name: '铁岭西'
    }, {
      code: 'SYSYB',
      name: '沈阳北'
    }, {
      code: 'SYSYZ',
      name: '沈阳'
    }, {
      code: 'SYLYZ',
      name: '辽阳'
    }, {
      code: 'SYASX',
      name: '鞍山西'
    }, {
      code: 'SYHCX',
      name: '海城西'
    }, {
      code: 'SYYKD',
      name: '营口东'
    }, {
      code: 'SYGZX',
      name: '盖州西'
    }, {
      code: 'SYBYQ',
      name: '鲅鱼圈'
    }, {
      code: 'SYWFD',
      name: '瓦房店西'
    }, {
      code: 'SYPLD',
      name: '普湾'
    }, {
      code: 'SYDLB',
      name: '大连北'
    }, {
      code: 'SYDLZ',
      name: '大连'
    }],
    url: '/mashWebServices/service/mash5/rest',
    fileUrl: '/mashWebServices/service/fileUpload/rest',
    fileService: '/mashWebServices/fileService'
  }

export default {
  //appId
  appId: '4f7e90378fe5a1fdb90cd9f7@' + tenantCode + '.App',
  //工单BO
  workOrderBo: '4f8d24b8632a848bd909b577@' + tenantCode + '.Bo',
  serviceBo: '4fab37268fe51b3e8ac32429@' + tenantCode + '.Bo',
  errorReportBo: '4f855e238fe5f78b13afae1b@' + tenantCode + '.Bo',
  //日报/周报BO
  dailyReportBo: '4f7802cf543b848c4c6afc06@' + tenantCode + '.Bo',
  weeklyReportBo: '50d3c751b932ed2de92f039c@' + tenantCode + '.Bo',
  //首页使用到的BO
  indexBo: '4f8d24b8632a848bd909b577@' + tenantCode + '.Bo',
  // 巡检
  planBo: '5031a7d8543bc198334b9a79@' + tenantCode + '.Bo',
  areaBo: '5031a85b543bc198334b9a7b@' + tenantCode + '.Bo',
  planTaskbo: '5031a82a543bc198334b9a7a@' + tenantCode + '.Bo',
  //角色
  employee: '4fa365068fe5fef4a6ce7f39@' + tenantCode + '.Role',
  freewayEmplyee: '4fb0d2ed8fe51470760a6a5b@' + tenantCode + '.Role',
  //工单角色
  MRO_SubLeader: '4f7e94ad8fe5a1fdb90cd9fa@' + tenantCode + '.Role',
  MRO_MainLeader: '50e58045e4b00fdffe2f7e64@' + tenantCode + '.Role',
  //局端用户角色
  bureauRole: '595344544f05a80001b826f9@' + tenantCode + '.Role',

  getURL: function () {
    return vars.url
  },

  getFileURL: function (url, size) {
    return vars.fileUrl + '?method.name=downloadFile&user.sessionId=' + this.getSessionId() + '&query.url=' + url + (size && ('&query.type=' + size) || '')
  },

  getThumbnailFileURL: function (url) {
    return vars.fileUrl + '?method.name=downloadThumbnail&user.sessionId=' + this.getSessionId() + '&query.url=' + url
  },

  getFileService: function () {
    return vars.fileService
  },

  getTenantCode: function () {
    return tenantCode
  },

  getBureauTenantCode: function () {
    return vars.bureauTenantCode
  },

  getSupportTenants: function () {
    return vars.supportTenants
  },

  getSessionId: function (key) {
    let sessions = Cookies.get(vars.keySessions)
    if (sessions && typeof sessions === 'string') {
      try {
        sessions = JSON.parse(sessions)
      } catch (e) {
        sessions = {}
      }
    }
    const sessionId = sessions && sessions[key || tenantCode]
    if (!key) {
      if (sessionId) {
        Cookies.set(vars.keySessionID, sessionId, {
          expires: 7
        })
      } else {
        Cookies.remove(vars.keySessionID)
      }
    }
    return sessionId
  },

  setSession: function (sessions) {
    sessions && Cookies.set(vars.keySessions, sessions, {
      expires: 7
    })
  },

  clearSession: function () {
    Cookies.remove(vars.keySessions)
    Cookies.remove(vars.keyUserId)
  },

  setUserId: function (uid) {
    uid && Cookies.set(vars.keyUserId, uid, {
      expires: 7
    })
  },

  getUserId: function () {
    return Cookies.get(vars.keyUserId)
  }
}
