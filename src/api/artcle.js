import request from '@/utils/request'

export const getArticles = (params) => {
	return request({
		method: 'GET',
		url: '/v1_1/articles',
		params,
	})
}
