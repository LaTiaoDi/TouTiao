import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
	state: {
		user: getItem(TOKEN_KEY),
	},
	mutations: {
		setUser(state, data) {
			state.user = data
			setItem(TOKEN_KEY, data)
		},
	},
	getters: {
		haslogin: (state) => {
			// return Object.keys(state.user).length
			return state.user.token
		},
	},

	actions: {},
	modules: {},
})
