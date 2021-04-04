// 本地存储模块
export const setItem = (key, data) => {
	//设置
	if (typeof data == 'object') {
		data = JSON.stringify(data)
	}
	window.localStorage.setItem(key, data)
}

export const getItem = (data) => {
	//获取
	try {
		return JSON.parse(window.localStorage.getItem(data))
	} catch (error) {
		return data
	}
}

export const removeItem = (key) => {
	//清除
	window.localStorage.clear(key)
}
