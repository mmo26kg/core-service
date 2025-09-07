import { UsersService } from './users.service.js'
import { UsersController } from './users.controller.js'
import { buildUsersRouter } from './users.routes.js'
import { defineUserModel } from './users.model.js'

export class UsersModule {
    constructor({ logger }) {
        this.logger = logger
        this.service = new UsersService()
        this.controller = new UsersController(this.service)
    }

    onModuleInit(context, sequelize) {
        this.logger.info('UsersModule initialized')
        context.set('usersService', this.service)
        const usersModel = defineUserModel(sequelize)
        context.set('usersModel', usersModel)
    }

    onModuleDestroy() {
        this.logger.info('UsersModule destroyed')
    }

    registerRoutes(app) {
        app.use('/users', buildUsersRouter(this.controller))
    }
}
