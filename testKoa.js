var Koa = require("koa");
var fs = require("fs");

const app = new Koa();

/**
 * 日志打印
 * 
 * start use one1
 * start use two1
 * start use three1
 * read file success = Hello Dart!r!
 * start user three2
 * start user two2
 * start use one2
 */
app.use(async (ctx, next) => {
    //node.js会默认请求一次f avicon.ico
    console.log("url = "+ctx.request.url)
    console.log("path = "+ctx.request.path)
    if (ctx.request.url == "/favicon.ico") {
        console.log(ctx.request.url);
        return;
    }

    console.log("start use one1");
    await next();
    console.log("start use one2");
    ctx.response.type = "text/html";
    ctx.response.body = "<h1>Hello, koa2!</h1>";
});

app.use(async (ctx, next) => {
    console.log("start use two1");
    await next();
    console.log("start user two2");
});

app.use(async (ctx, next) => {
    console.log("start use three1");
    try {
        console.log("read file success = " + fs.readFileSync("file/testRead.txt", "utf-8"));
    } catch (error) {
        console.log("read file error =" + error);
    }
    console.log("start user three2");
})


module.exports = app;