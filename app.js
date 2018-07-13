import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { Loader } from './loader'
import config from './config/config.default'
import { crossOrigin } from './utils'


const app = new Koa()
const loader = new Loader(app)

app.use(bodyParser())
app.use(crossOrigin({ 
    origin: config.trustOrigin
 }))
// app.use(async (ctx, next) => {
//     try {
//         ctx.set('Access-Control-Allow-Origin', config.trustOrigin)
//         ctx.set(
//             'Access-Control-Allow-Headers',
//             'Origin, X-Requested-With, Content-Type, Accept'
//         )
//         ctx.set('Access-Control-Allow-Credentials', true)
//         ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')

//         if (ctx.request.method == 'OPTIONS') {
//             ctx.response.status = 204
//         } else {
//             await next()
//         }
//     } catch (err) {
//         errorHandler(ctx, err);
//     }
// })
app.use(loader.loaderRouter())
console.log(app.config.trustOrigin)

app.listen(app.config.port, '127.0.0.1', () => {
    console.log(`server listening on port ${app.config.port}`)
})