import request from '@/utils/request'

export const getArticles = (params) => {
	return request({
		method: 'GET',
		url: '/v1_1/articles',
		params,
	})
}
export const getDetail = (params) => {
	return request({
		method: 'GET',
		url: '/v1_0/articles/' + params,
	})
}
// 收藏文章
export const addCollections = (target) => {
	return request({
		method: 'POST',
		url: '/v1_0/article/collections',
		data: {
			target,
		},
	})
}

export const unCollections = (target) => {
	return request({
		method: 'DELETE',
		url: `/v1_0/article/collections/${target}`,
	})
}

export const getLikes = (target) => {
	return request({
		url: '/v1_0/article/likings',
		method: 'POST',
		data: {
			target,
		},
	})
}
