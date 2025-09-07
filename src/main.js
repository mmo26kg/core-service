import 'dotenv/config'
import { Application } from './app.js'
import { ModuleRegistry } from './core/module-registry.js'
import { createLogger } from './common/logger.js'
import { registerAllModules } from './modules/index.js'
import { createServer } from './server.js'
import config from '../config/default.js'

// Bootstrap the application
const logger = createLogger({ level: 'info' })

const registry = new ModuleRegistry({ logger })
registerAllModules(registry)

const app = new Application({ registry, logger })
app.bootstrap()

// HTTP server
const httpApp = createServer()
app.registerRoutes(httpApp)

const server = httpApp.listen(config.server.port, () => {
    logger.info(`HTTP server listening on port ${config.server.port}`)
})

// Graceful shutdown hooks (expand later for real servers)
process.on('SIGINT', () => {
    logger.info('Shutting down...')
    app.shutdown?.()
    server?.close(() => process.exit(0))
})
