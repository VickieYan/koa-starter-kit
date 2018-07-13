const crossOrigin = (options = {}) => {
    const defaultOptions = {
        allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
    }

    for (let key in defaultOptions) {
        if(!Object.prototype.hasOwnProperty.call(options, key)) {
            options[key] = defaultOptions[key]
        }
    }

    return async function(ctx, next) {
        const origin = options.origin || '*'
        ctx.set('Access-Control-Allow-Origin', origin)
        if (ctx.method === 'OPTIONS') {
            if (options.maxAge) {
                ctx.set('Access-Control-Max-Age', String(options.maxAge))
              }

              if (options.credentials === true) {
                ctx.set('Access-Control-Allow-Credentials', 'true')
              }

              if (options.allowMethods) {
                ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','))
              }

              if (options.allowHeaders) {
                ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','))
              } else {
                ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'))
              }

              ctx.status = 204
        } else {
            if (options.credentials === true) {
                if (origin === '*') {
                    ctx.remove('Access-Control-Allow-Credentials')
                } else {
                    ctx.set('Access-Control-Allow-Credentials', 'true')
                }
            }
        }

        try {
            await next()
        } catch (err) {
            throw err
        }
    }
}

export default crossOrigin