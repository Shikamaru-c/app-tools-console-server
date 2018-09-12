const Koa = require('koa')
const app = new Koa()
const route = require('koa-route')
const tools = require('./mock')

function errorMiddleware () {
  let id = 0
  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      console.log(`Error ${++id}, ${e}`)
    }
  }
}
app.use(errorMiddleware())

app.use(route.get('/tools', async (ctx, next) => {
  ctx.body = tools
}))

app.use(route.get('/users', async (ctx, next) => {
  ctx.body = 'users'
}))

app.use(route.get('/suggest', async (ctx, next) => {
  ctx.body = 'suggest'
}))

app.use(route.get('*', async (ctx, next) => {
  ctx.throw(404)
}))

app.listen(3000, () => {
  console.log('listening on port 3000')
})