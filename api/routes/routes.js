const Model = require('../models/model');
const Router = require('koa-router');
const convert = require('koa-convert');
const KoaBody = require('koa-body'),
    koaBody = convert(KoaBody());
const router = new Router();
    router
        .get('/errorReport', async (ctx, next) => {
                await Model.findAll()
                    .then(results => {
                        ctx.body = results;
                    });
            })
        .get('/errorReport/:id', async(ctx, next) => {
            await Model.findByPk(ctx.params.id).then(report => {
                if(report) {
                    ctx.body = report;
                } else {
                    ctx.status = 204;
                }
            });
        })
        .post('/errorReport', koaBody, async(ctx, next) => {
            ctx.status = 201;
            const {id, host, code, message, createdAt, updatedAt} = ctx.request.body;
            const report = {
                id: Number(id),
                host: String(host),
                code: Number(code),
                message: String(message),
                createdAt: Date(createdAt),
                updatedAt: Date(updatedAt)
            };

            Model.create(report).then( result => ctx.body = result);
        })
        .put('/errorReport/:id', koaBody, async (ctx, next) => {
            ctx.status = 204;
            const {id, host, code, message, createdAt, updatedAt} = ctx.request.body;
            const report = {
                host: String(host),
                code: Number(code),
                message: String(message),
                createdAt: Date(createdAt),
                updatedAt: Date(updatedAt)
            };
            await Model.update(report,{where: {id: ctx.params.id} } );
        })
        .delete('/errorReport/:id', async (ctx, next) => {
            ctx.status = 204;
            await Model.destroy({where : { id: ctx.params.id }});
        });

exports.startPage = function() {
    return router.get('*', async (ctx, next) => {
        ctx.response.sendFile('../../public/index.html');
    }).routes();
};
exports.routes = function() {return router.routes()};
exports.allowedMethods = function() {return router.allowedMethods()};
