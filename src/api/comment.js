/**
 * 评论接口模块
 */
import request from '@/utils/request'

/**
 * 获取文章评论列表
 */
export function getComments(params) {
	return request({
		method: 'GET',
		url: '/v1_0/comments',
		params,
	})
}
export function addCommentLike(target) {
	return request({
		method: 'POST',
		url: '/v1_0/comment/likings',
		data: {
			target,
		},
	})
}
/**
 * 添加评论或评论回复
 */
export function postAddComment(data) {
	return request({
		method: 'POST',
		url: '/v1_0/comments',
		data,
	})
}
