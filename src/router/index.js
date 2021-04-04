import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch((err) => err)
}

const routes = [
	{
		path: '/',

		component: () => import('@/views/layout'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/views/home'),
			},
			{
				path: 'qa',
				name: 'qa',
				component: () => import('@/views/qa'),
			},
			{
				path: 'video',
				name: 'video',
				component: () => import('@/views/video'),
			},
			{
				path: 'my',
				name: 'my',
				component: () => import('@/views/my'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/login'),
	},
	{
		path: '/my/collect',
		name: 'UserCollect',
		meta: { needLogin: true },
		component: () => import('@/views/my/collect.vue'),
	},
	{
		path: '/my/history',
		name: 'UserHistory',
		meta: { needLogin: true },
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('@/views/search'),
	},
]

const router = new VueRouter({
	routes,
})
router.beforeEach((to, from, next) => {
	if (to.meta.needLogin) {
		if (store.state.user) {
			next()
		} else {
			next('/login?url=' + to.path)
		}
	} else {
		next()
	}
})
export default router
