import request from '@/utils/request'

export const login = (data) => {
	return request({
		url: 'v1_0/authorizations',
		method: 'POST',
		data,
	})
}
export const getSmsCode = (mobile) => {
	return request({
		url: '/v1_0/sms/codes/' + mobile,
		method: 'GET',
	})
}
export const getUserInfo = () => {
	return request({
		method: 'GET',
		url: '/v1_0/user',
	})
}
export const getUserChannels = () => {
	return request({
		method: 'GET',
		url: '/v1_0/user/channels',
	})
}
export const addFollow = (target) => {
	return request({
		url: '/v1_0/user/followings',
		method: 'POST',
		data: {
			target,
		},
	})
}
export const unFollow = (target) => {
	return request({
		url: '/v1_0/user/followings/' + target,
		method: 'DELETE',
	})
}
