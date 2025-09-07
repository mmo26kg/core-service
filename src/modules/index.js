// Aggregator to register all feature modules in one place
import { HealthModule } from './health/health.module.js'
import { UsersModule } from './users/users.module.js'

export const modules = [HealthModule, UsersModule]

export function registerAllModules(registry) {
    modules.forEach((M) => registry.register(M))
}
