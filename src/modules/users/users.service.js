export class UsersService {
    constructor() {
        this._users = new Map()
        this._idSeq = 1
    }

    create({ name, email }) {
        const id = this._idSeq++
        const user = { id, name, email }
        this._users.set(String(id), user)
        return user
    }

    findAll() {
        return Array.from(this._users.values())
    }

    findById(id) {
        return this._users.get(String(id)) || null
    }
}
