import axios from 'axios'
import cookieUtils from '@/utils/cookieUtil'

const tsmAuthAxios = axios.create({ baseURL: `${import.meta.env.VITE_TASKSMART_BACKEND_API}/api`})

tsmAuthAxios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${cookieUtils.getCookie('access_token')}`
    return config
  },
  (error) => {
    return Promise.reject(error)  
  },
)

export default tsmAuthAxios