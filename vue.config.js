// module.exports = {
//     devServer: {
//         disableHostCheck: false,
//         port: 8080,
//         https: false,
//         open: false,
//         proxy: {
//             "/api": {
//                 // target: "http://api.wecook.iotmars.com:10010",// 要访问的接口域名
//                 target: "http://localhost:10010",// 要访问的接口域名
//                 changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//                 pathRewrite: {
//                     '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
//                 }
//             },
//         }
//     },
// };

module.exports = {
    devServer: {
        disableHostCheck: false,
        port: 8080,
        https: false,
        open: false,
        proxy: {
            "/cloud": {
                // target: "http://localhost:10010/",
                target: "http://api.wecook.iotmars.com:10010",
                changeOrigin: true,
                pathRewrite: {
                    '^/cloud': ''
                }
            },
            "/api": {
                target: "http://192.168.32.128",// 要访问的接口域名
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
                }
            },
        }
    },
    // 打包静态文件
    publicPath: '/'
};
