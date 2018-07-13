import Controller from './base'
import { bp } from '../blueprint'

export default class User extends Controller {
    @bp.get('/user')
    async user() {
        this.ctx.body = await this.ctx.service.user.findAll()
    }
}