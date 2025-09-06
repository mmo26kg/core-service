// Minimal Nest-like Application wrapper
export class Application {
    constructor({ registry, logger }) {
        this.registry = registry
        this.logger = logger
        this.context = new Map()
        this.httpApp = null // Express instance when started
    }

    bootstrap() {
        // Initialize modules
        const modules = this.registry.getModules()
        modules.forEach((mod) => {
            mod.onModuleInit?.(this.context)
        })

        this.logger.info(`Application bootstrapped with ${modules.length} module(s).`)
    }

    registerRoutes(httpApp) {
        this.httpApp = httpApp
        const modules = this.registry.getModules()
        modules.forEach((mod) => {
            if (typeof mod.registerRoutes === 'function') {
                mod.registerRoutes(httpApp, this.context)
            }
        })
    }

    shutdown() {
        const modules = this.registry.getModules()
            ;[...modules].reverse().forEach((mod) => {
                mod.onModuleDestroy?.(this.context)
            })
        this.logger.info('Application shutdown complete.')
    }
}
