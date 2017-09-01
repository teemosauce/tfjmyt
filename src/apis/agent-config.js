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

const url = '/agent-config/sysconfig/deviceMenuServlet'

const queryMenu = () => _axios.post(url, {
  'action': 'queryMenu',
  'tenant_code': config.getTenantCode()
})

//根据endpoint查询设备树信息
const findMenuByEndpoint = (endpoint) => _axios.post(url, {
  action: 'findMenuByEndpoint',
  endpoint: endpoint
})

const findMenuById = (id) => _axios.post(url, {
  action: 'findMenuById',
  menu_id: id
})

export {
  queryMenu,
  findMenuByEndpoint,
  findMenuById
}
