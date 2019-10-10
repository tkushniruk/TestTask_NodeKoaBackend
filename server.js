 const Koa = require("koa"),
     cors = require('@koa/cors'),
     port = process.env.PORT || 3000,
     logger = require('koa-logger');


const {routes, allowedMethods, startPage } = require('./api/routes/routes');

const app = new Koa();
app.use(cors());


app.use(logger());

app.use(async (ctx, next) => {
    try {

        await next();
    } catch(err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error',err, ctx);
    }
});

app.use(routes());
app.use(allowedMethods());

app.listen(port);
console.log('RESTful API server started on: ' + port);
