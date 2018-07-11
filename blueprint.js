class BluePrint {
    constructor() {
        this.router = {}
    }

    get(url) {
        return (target, propertyKey) => {
            this.setRouter(url, {
                httpMethod: 'get',
                constructor: target.constructor,
                handler: propertyKey,
            })
        }
    }

    post(url) {
        return (target, propertyKey) => {
            this.setRouter(url, {
                httpMethod: 'post',
                constructor: target.constructor,
                handler: propertyKey,
            })
        }
    }
    
    put(url) {
        return (target, propertyKey) => {
            this.setRouter(url, {
                httpMethod: 'put',
                constructor: target.constructor,
                handler: propertyKey,
            })
        }
    }

    getRouter() {
        return this.router
    }

    setRouter(url, blueprint) {
        const _bp = this.router[url]
        if(_bp) {
            for(let index in _bp) {
                const object = _bp[index]
                if(object.httpMethod === blueprint.httpMethod) {
                    console.log(`路由地址${object.httpMethod} ${url}已经存在`)
                }
                return
            }
            this.router[url].push(blueprint)
        } else {
            this.router[url] = []
            this.router[url].push(blueprint)
        }
    }
}

export const bp = new BluePrint()