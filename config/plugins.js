//这个是插件的配置
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离css样式变为单独的文件
let fs = require('fs');
let path = require('path'); 
let filePath = path.resolve('./view');
let plugins = [];
//调用文件遍历方法
// 原创 author:abbykk   email:460053411@qq.com
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
    let files1 = fs.readdirSync(filePath);
    files1.forEach(function (filename1) {
        let filedir = path.join(filePath, filename1);
        let files2 = fs.readdirSync(filedir);
        //公共html不编译 页面 用到时会引入一起在页面编译
        if(filename1=="global"){
            return;
        }
        files2.forEach(function (filename2) {
         

            plugins.push(
                new HtmlWebpackPlugin({
                    template: filedir + '/' + filename2,
                    filename: path.resolve('./dist/view') + '/' + filename1 +  '/' + filename2.split(".")[0]+'.html',
                    hash: true,
                    //chunks: chunks,
                    // minify:{
                    //     collapseWhitespace:true,
                    //     keepClosingSlash:true
                    // },
                })
            )
            
        })
    })

}
//处理css 单独抽离
plugins.push(new MiniCssExtractPlugin({
    filename: "res/css/[name].css"
}))



module.exports = plugins