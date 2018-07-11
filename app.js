import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { Loader } from './loader'

const app = new Koa()
const loader = new Loader(app)

app.use(bodyParser())
app.use(loader.loaderRouter())

app.listen(app.config.port, '127.0.0.1', () => {
    console.log(`server listening on port ${app.config.port}`)
})