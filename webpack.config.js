let entry = require('./config/entry');
let plugins = require('./config/plugins');
let loaders = require('./config/loaders');
let output = require('./config/output');
let NODE_ENV = process.env.NODE_ENV;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    //优化项配置
    mode: NODE_ENV,
    devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : '',
    optimization: {
        // 原创 author:abbykk   email:460053411@qq.com
        // 分割代码块
        splitChunks: {
            cacheGroups: {
                header: { //拆分指定文件
                    test: /[\\/]src[\\/]js[\\/]global[\\/]header[\\.]js/,
                    name: 'global/header',
                    chunks: 'all',
                    priority: 1,
                    enforce: true
                },
                //第三方库抽离
                jquery: {
                    priority: 100, //权重 越大 加载越靠前
                    chunks: 'all',
                    minSize: 0, //大于0个字节
                    minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
                    // test: function (module) {
                    //     return /jquery/.test(module.context);
                    // },
                    test: /jquery/,
                    name: 'global/jquery',
                    enforce: true
                }
            }
        },
        //解决生产环境打包ie8下js出现缺少关键字
        minimizer: [
			new UglifyJsPlugin({
				exclude: /node_modules/,
				uglifyOptions: {
					ie8: true // 解决ie下的关键字default的问题
				}
			})
		]

    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500, //防抖
        ignored: /node_modules/ //不需要监控哪个文件

    },
    entry: entry,
    output: output,
    module: loaders,
    plugins: [new CleanWebpackPlugin(
        ['dist/']

    ), ...plugins]
}
// 原创 author:abbykk   email:460053411@qq.com