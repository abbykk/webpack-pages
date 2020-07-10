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
// 原创 author:abbykk   email:460053411@qq.com