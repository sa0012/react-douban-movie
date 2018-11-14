import axios from 'axios'
import { Toast } from 'antd-mobile'

const axiosInstance = axios.create({
  timeout: 60000
})
axiosInstance.defaults.baseURL = "http://api.douban.com/v2/movie"
// 统一处理ajax失败
axiosInstance.interceptors.response.use(function (res) {
  Toast.hide()
  const response = res.data
  if (!response.success) {
    alert(JSON.stringify(response))
    return
  }
  return res
}, function (error) {
  alert('网络中断了，请重试')
  Toast.hide()
  return Promise.reject(error)
})
// 用于移动端页面
window.axios = axiosInstance