const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

app.use(async (ctx,next) => {
    console.log("request url = "+ctx.request.url);
    console.log("request body = "+ctx.request.body);
    await next();
});

//路由get请求
router.get("/index",async (ctx,next) => {
    console.log("route /");
    ctx.response.body = '<h1>Index</h1>';
})

router.get("/hello",async (ctx,next) => {
    console.log("route /");
    ctx.response.body = '<h1>Hello</h1>';
})

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

//post请求
router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

//post请求体解析
app.use(bodyParser());

//注册路由表
app.use(router.routes());

var listen = function(){
    app.listen(2222);
};

module.exports = listen;