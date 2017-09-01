import axios from 'axios'
import config from '../config'

const _axios = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  transformRequest(data) {
    var params = []
    for (var key in data) {
      var value = data[key]
      if (Array.isArray(value)) {
        for (var val of value) {
          params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val == null ? '' : val))
        }
      } else {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value == null ? '' : value))
      }
    }
    return params.join('&')
  }
})

const login = (account, password, tenantCode) => _axios.post('/mashWebServices/service/mash5/rest', {
  'method.name': 'mash5.user.loginBatch',
  'user.telphone': account,
  'user.password': password
})


const getCurrentUser = (params) => _axios.post('/mashWebServices/service/mash5/rest', Object.assign({
  'method.name': 'mash5.user.queryUserInfo',
  'method.optimize': 'includeField',
  'method.optimize.includeField.fieldName': ['_id', 'name', 'telphone', 'email', 'mainTenantCode', 'tenants', 'playRole'],
  'user.sessionId': config.getSessionId()
}, params)).then(response => {
  return response.data
}).then(r => {
  var user = r && r.object
  if (user && config) {
    var roles = user.playRole
    if (roles instanceof Array) {
      for (var i = 0, len = roles.length; i < len; i++) {
        var id = roles[i]
        if (typeof id === 'object') {
          id = id._id
        }
        switch (id) {
          //局端管理员
          case config.bureauRole:
            user.isBureauer = true
            break
            //运维员工，责任人，上报人
          case config.employee:
            user.isEmployeer = true
            break
            //通信科运维主管(MRO_allRole角色)
          case config.MRO_SubLeader:
            user.isSubLearder = true
            break
            //通信处运维主管
          case config.MRO_MainLeader:
            user.isMainLeader = true
            break
          default:
            break
        }
      }
    }
  }
  return user
})

export {
  login,
  getCurrentUser
}
