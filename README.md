# webpack多页面脚手架(全自动)  --原创  

前端时间做一个项目,不依赖任何框架,如何去实现一个前后端完全分离的多页面脚手架呢?思前想后之后,选择了webpack,

用Nodejs的文件读写流,实现了全自动化文件目录编译

用ejs模板,解决了html中头部尾部的抽离

用webpack自带的loader,支持的插件等,处理了样式、图片、html的输出等

`脚手架运行命令`

``` npm run dev ```

### 代码分析

` entry.js 入口文件`

```
//这个是入口文件的配置
let fs = require('fs');
let path = require('path'); //解析需要遍历的文件夹
let filePath = path.resolve('./src/js');
let entry = {};
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
    let files1 = fs.readdirSync(filePath)
    files1.forEach(function (filename1) {
        let filedir = path.join(filePath, filename1);
        let files2 = fs.readdirSync(filedir);
        //配置文件已经在webpack.config.js 单独抽离过         global里面的js文件 生成到dist制定目录了  这里需要return 避免重复
        if (filename1 == 'global') {
            return false
        }
        files2.forEach(function (filename2) {
            let name = filename2.split('.')[0]
            entry[filename1 + '/' + name] = './src/js/' + filename1 + '/' + name 
        })
    })
}
module.exports = entry

```
`用nodejs读 文件遍历读取项目中的文件 入口`


` output.js 出口文件`

``` const NODE_ENV = process.env.NODE_ENV;
let output = {
    filename: 'res/js/[name].js',
    publicPath: NODE_ENV == 'development' ? "http://www.szxht.com/" : '//static.sensorhunt.com/', 
    // publicPath: '__PUBLIC__'
}
module.exports = output ```

最终文件全部会打包到dist目录(不设置默认dist)

`webpack.config.js`

```
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
```
引入出口入口文件 loader插件等 实现公共JS代码抽离加载顺序等功能


好了,最后祝大家愉快的使用在项目中,不清楚的可以私我或者留言

- [Markdown](https://www.jianshu.com/p/9349ebcb14a6)
- [预览项目](http://www.sensorhunt.com/)


