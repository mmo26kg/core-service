export class UsersController {
    constructor(service) {
        this.service = service
    }

    list() {
        return this.service.findAll()
    }

    create(payload) {
        return this.service.create(payload)
    }
}
