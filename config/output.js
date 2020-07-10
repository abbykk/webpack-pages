// 原创 author:abbykk   email:460053411@qq.com
const NODE_ENV = process.env.NODE_ENV;
let output = {
    filename: 'res/js/[name].js',
    publicPath: NODE_ENV == 'development' ? "http://www.szxht.com/" : '//static.sensorhunt.com/', //给每个输出的文件带上前缀 该前缀为php中的一个变量
    // publicPath: '__PUBLIC__'
}
module.exports = output