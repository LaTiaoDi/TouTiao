/**
 * PostCSS 的配置文件
 * PostCSS 是基于Node.js 运行的一个处理CSS工具
 * 所以他的配置文件也是运行在Node.js中
 */
module.exports = {
	plugins: {
		// 自动添加浏览器厂商前缀，用来兼容不同的浏览器
		// VUECLI 已经在内部默认配置了autoprefixer
		autoprefixer: {
			// browsers 用来设置兼容到的手机浏览器配置环境
			// 这个配置没有问题，但是写在这里会有警告。
			// 因为VueCli 通过.browserslistrc文件来配置要兼容的环境信息
			// browsers: ['Android >= 4.0', 'iOS >= 8']
		},
		'postcss-pxtorem': {
			// lib-flexible 的 REM 适配方案：把一行分为 10 份，每份就是十分之一
			// 所以 rootValue 应该设置为你的设计稿宽度的十分之一
			// 我们的设计稿是 750，所以应该设置为 750 / 10 = 75
			// 但是 Vant 建议设置为 37.5，为什么？因为 Vant 是基于 375 写的
			// 所以必须设置为 37.5，唯一的缺点就是使用我们设计稿的尺寸都必须 / 2
			// 有没有更好的办法？
			//   如果是 Vant 的样式，就按照 37.5 来转换
			//   如果是 我们自己 的样式，就按照 75 来转换
			// 通过查阅文档，我们发现 rootValue 支持两种类型：
			//    数字：固定的数值
			//    函数：可以动态处理返回
			//          postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
			//          它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
			rootValue({ file }) {
				return file.indexOf('vant') !== -1 ? 37.5 : 75
			},
			// 需要转换的CSS属性，*表示所有都要转换
			// propList: ['font-size'] 表示只转换font-size这个属性
			propList: ['*'],
			//排除不需要转换的样式资源
			exclude: 'github-markdown',
		},
	},
}
