# koa-starter-kit
## 使用方法
### 安装依赖
```
yarn
```
### 启动脚手架
```
yarn start
```
### 连接数据库
1. 启动docker中mysql镜像
```shell
docker run -p 13307:3306 -e MYSQL_ROOT_PASSWORD=root --name mysql -d mysql:5.7
```
2. 进入docker环境
```shell
docker exec -it mysql /bin/bash
```
3. 连接navicat
* 创建新连接，配置如下
```
Host: 127.0.0.1
Port: 13307
User Name: root
Password: root
```
4. 命令行进入mysql
```shell
mysql -uroot -proot
```
5. 项目配置
在config.default.js文件中修改数据库相关配置项
```json
database: {
    db: 'koa_starter_kit', // 数据库名称
    username: 'root', // 用户名
    password: 'root', // 密码
    details: {
        host: '127.0.0.1', // 主机名
        port: '13307', // 端口
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}
```
## 介绍
### 功能


### 工具包
* crossOrigin

用法：

在main.js中引入该文件
```js
import crossOrigin from './util'

app.use(crossOrigin({
    origin: '127.0.0.1: 8081', 
    ...
}))
```
options可以配置参数；
```
maxAge
origin 允许跨域的源
credentials 是否携带cookie
allowMethods 允许跨域的方法
allowHeaders
```

