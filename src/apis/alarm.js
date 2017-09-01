import axios from 'axios'
import config from '../config'


const query = () => axios.get('/alarm/event/hasAlarm?tenant_code=' + config.getTenantCode())
const queryCategory = () => axios.get('/alarm/event/hasAlarmByCategory?tenant_code=' + config.getTenantCode())
export {
  query as queryAlarms,
  queryCategory as queryCategoryAlarms
}
