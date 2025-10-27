import { BASE_URL, TIME_OUT } from './config'
import YSRequest from './request'

const ysRequest = new YSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    }
  }
})

export default ysRequest
