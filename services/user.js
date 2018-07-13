import Service from './base'

class User extends Service {
    async findAll() {
        try {
            return await this.ctx.model.user.findAll().then(res => res)
        } catch(err) {
            throw new Error(err)
        }
    }

    
}

export default User