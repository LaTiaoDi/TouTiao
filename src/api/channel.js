import request from '@/utils/request'
/**
 * 获取所有频道
 */
export const getAllChannels = () => {
	return request({
		method: 'GET',
		url: '/v1_0/channels',
	})
}
export const addUserChannel = (channels) => {
	return request({
		method: 'PATCH',
		url: '/v1_0/user/channels',
		data: {
			channels,
		},
	})
}
export const deleteChannels = (id) => {
	return request({
		method: 'DELETE',
		url: '/v1_0/user/channels/' + id,
	})
}
