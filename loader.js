import Koa from 'koa'
import fs from 'fs'
import Router from 'koa-router'
import { bp } from './blueprint'


export class Loader {
    constructor(app) {
        this.app = app
        this.router =  new Router()
    }

    loaderRouter() {
        this.loadController()
        this.loadService()
        const r = bp.getRouter()
        console.log(r) // 打印日志
        Object.keys(r).forEach(url => {
            r[url].forEach(blueprint => {
                this.router[blueprint.httpMethod](url, async (ctx) => {
                    const instance  = new blueprint.constructor(ctx, this.app)
                    await instance[blueprint.handler]()
                })
            })
        })


        return this.router.routes()
    }

    loadController() {
        const dirs = fs.readdirSync(__dirname + '/controller')
        dirs.forEach(filename => {
            require(__dirname + '/controller/' + filename).default
        })
    }

    loadService() {
        const services = fs.readdirSync(__dirname + '/service')
        var _this = this
        Object.defineProperty(this.app.context, 'service', {
            get() {
                this.cache = this.cache || {}
                const loaded = this.cache
                if(!loaded.services) {
                    loaded.services = {}
                    services.forEach(service => {
                        const serviceName = service.split('.')[0]
                        const mod = require(__dirname + '/service/' + serviceName).default
                        console.log(mod)
                        loaded.services[serviceName] = new mod(this, _this.app)

                    })
                }
                return loaded.services
            }
        })
    }
}