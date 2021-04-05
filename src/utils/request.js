/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
	baseURL: 'http://toutiao-app.itheima.net/', // 接口基础路径

	// transformResponse 允许自定义原始的响应数据（字符串）
	transformResponse: [
		function(data) {
			try {
				// 如果转换成功则返回转换的数据结果
				return JSONBig.parse(data)
			} catch (err) {
				// 如果转换失败，则包装为统一数据格式并返回
				return data
			}
		},
	],
})

// 添加请求拦截器
request.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		const { user } = store.state
		if (user && user.token) {
			config.headers.Authorization = `Bearer ${user.token}`
		}
		return config
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)
export default request
