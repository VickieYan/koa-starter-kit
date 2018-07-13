export default {
    port: 3000,
    database: {
        db: 'koa_starter_kit', // 数据库名称
        username: 'root',
        password: 'root',
        details: {
            host: '127.0.0.1',
            port: '13307',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    },
    trustOrigin: 'http://127.0.0.1:8081'
}