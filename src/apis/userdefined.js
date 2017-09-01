import axios from 'axios'
import config from '../config'

const URL = '/mashWebServices/service/mash5/rest'

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

const query = (params) => _axios.post(URL, Object.assign({
  'method.name': 'mash5.tenant.queryCustomerTableData',
  'query.tableName': 'UserDefined',
  'user.sessionId': config.getSessionId()
}, params))


const queryById = (id) => query({
  'query._id': id
})

export {
  query,
  queryById
}
