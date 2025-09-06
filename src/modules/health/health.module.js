import { HealthController } from './health.controller.js'
import { HealthService } from './health.service.js'

export class HealthModule {
    constructor({ logger }) {
        this.logger = logger
        this.service = new HealthService()
        this.controller = new HealthController(this.service)
    }

    onModuleInit(context) {
        this.logger.info('HealthModule initialized')
        context.set('healthService', this.service)
    }

    onModuleDestroy() {
        this.logger.info('HealthModule destroyed')
    }

    registerRoutes(app) {
        app.get('/health', (req, res) => {
            const result = this.controller.check()
            res.json(result)
        })
    }
}
