import axios from 'axios'
import accountStore from './stores/accountStore'


const api = axios.create()
api.defaults.baseURL = 'http://localhost:5000/api/'   // todo: env
api.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

api.defaults.timeout = 5000;
// axiosClient.defaults.withCredentials = true

api.interceptors.request.use(function (config) {
  const token = accountStore.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api