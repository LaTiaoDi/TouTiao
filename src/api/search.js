import request from '@/utils/request'

export const getSuggestApi = (q) => {
	return request({
		method: 'GET',
		url: '/v1_0/suggestion',
		params: {
			q,
		},
	})
}

export const getSearchResult = (params) => {
	return request({
		method: 'GET',
		url: '/v1_0/search',
		params,
	})
}
