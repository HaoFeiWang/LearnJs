'use strict'

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var HTTP = {};

// 创建http server，并传入回调函数（接收request和response对象）:
var server = http.createServer(function (request, response) {
    // 获得HTTP请求的method和url:
    console.log("request method = " + request.method + ' request url = ' + request.url);

    //获取请求路径，端口后面地址 （http://127.0.0.1:8888/hello/test 的请求路径为 /hello/test）
    var pathname = url.parse(request.url).pathname;
    console.log("request pathname = " + pathname);

    //获取file目录的绝对路径
    var rootPath = path.resolve("./file");
    console.log("root path = " + rootPath);

    var filepath = path.join(rootPath, pathname);
    console.log("request filepath = " + filepath);

    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log("request success!");
            // 发送 HTTP 头部 
            // HTTP 状态值: 200 : OK
            // 内容类型: text/plain
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log("request fail!");
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});


//监听8888端口
HTTP.listen = function () {
    server.listen(8888);
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');
}


module.exports = HTTP;