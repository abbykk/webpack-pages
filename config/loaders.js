let MiniCssExtractPlugin = require('mini-css-extract-plugin');//CSS单独抽离 从src输出到dist 不然就打包到JS里面了
let loaders = {
    rules: [
         //处理JS文件
        {
            test: /\.js?$/,
            exclude: /node_modules/,//过滤制定目录
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env']
                    ],
                    plugins: [
                        ['transform-es2015-modules-simple-commonjs'],
                    ]
                }
            }
        },
        //处理css文件
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                "postcss-loader" //css3前缀的配置
            ]
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
                "postcss-loader" //css3前缀的配置
            ]
        },
        //处理html里面图片
        {
            test: /\.(html)$/,
            use: [
                'html-withimg-loader'
                
            ]
        },
        //处理JS css里面的图片
        {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000, //表示小于10kb的图片转为base64,大于10kb的是路径
                    outputPath: 'res/img/',
                    name: '[name].[hash:7].[ext]'
                }
            }
        },
        {
            test: /\.svg/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'res/img/',
                    name: '[name].[hash:7].[ext]'
                }
            }
          }
    

    ]
}
module.exports = loaders
// 原创 author:abbykk   email:460053411@qq.com