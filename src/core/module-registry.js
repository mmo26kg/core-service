// Simple registry to simulate NestJS module system
export class ModuleRegistry {
    constructor({ logger }) {
        this.logger = logger
        this.modules = []
    }

    register(ModuleClass) {
        const moduleInstance = new ModuleClass({ logger: this.logger })
        this.modules.push(moduleInstance)
        this.logger.info(`Registered module: ${ModuleClass.name}`)
    }

    getModules() {
        return this.modules
    }
}
