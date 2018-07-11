import Controller from './base'
import { bp } from '../blueprint'

export default class User extends Controller {
    @bp.get('/user')
    async user() {
        this.ctx.body = this.ctx.service.check.index()
        // this.ctx.model.User
        const userList = await this.ctx.model.User.findAll({
            raw: true
        })
        console.log(userList)
    }
}