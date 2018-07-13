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
        this.loadConfig()
        this.loadController()
        this.loadService()
        this.loadModel()
        const r = bp.getRouter()
        // console.log(r) // 打印日志 查看blueprint
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
        const dirs = fs.readdirSync(__dirname + '/controllers')
        dirs.forEach(filename => {
            require(__dirname + '/controllers/' + filename).default
        })
    }

    loadService() {
        const services = fs.readdirSync(__dirname + '/services')
        var _this = this
        Object.defineProperty(this.app.context, 'service', {
            get() {
                this.cache = this.cache || {}
                const loaded = this.cache
                if(!loaded.services) {
                    loaded.services = {}
                    services.forEach(service => {
                        const serviceName = service.split('.')[0]
                        const mod = require(__dirname + '/services/' + serviceName).default
                        console.log(mod)
                        loaded.services[serviceName] = new mod(this, _this.app)

                    })
                }
                return loaded.services
            }
        })
    }

    loadModel() {
        const { db, username, password, details } = this.app.config.database
        const Sequelize = require('sequelize')
        const sequelize = new Sequelize(db, username, password, details)
        const models = fs.readdirSync(__dirname + '/models')
        models.forEach(model => {
            require(__dirname + '/models/' + model).default(sequelize, Sequelize).sync()
        }) // 建表
        Object.defineProperty(this.app.context, 'model', {
            get() {
                this.cache = this.cache || {}
                const loaded = this.cache
                if(!loaded.models) {
                    loaded.models = {}
                    models.forEach(model => {
                        const modelName = model.split('.')[0]
                        const mod = require(__dirname + '/models/' + modelName).default
                        // console.log(mod) // 打印日志 数据模型
                        loaded.models[modelName] = mod(sequelize, Sequelize)
                    })
                }
                return loaded.models
            }
        })
    }

    loadConfig() {
        const configDef = __dirname + '/config/config.default.js'
        const configEnv =
            __dirname +
            (process.env.NODE_ENV === 'production'
                ? '/config/config.pro.js'
                : '/config/config.dev.js');
        const conf = require(configEnv).default;
        const confDef = require(configDef).default;
        const merge = Object.assign({}, conf, confDef);
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge;
            },
        });
    }
}