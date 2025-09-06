import { describe, it, expect } from '@jest/globals'
import { Application } from '../../src/app.js'
import { ModuleRegistry } from '../../src/core/module-registry.js'
import { createLogger } from '../../src/common/logger.js'
import { HealthModule } from '../../src/modules/health/health.module.js'

describe('Application', () => {
    it('bootstraps with HealthModule', () => {
        const logger = createLogger({ level: 'error' })
        const registry = new ModuleRegistry({ logger })
        registry.register(HealthModule)

        const app = new Application({ registry, logger })
        expect(() => app.bootstrap()).not.toThrow()
    })
})
