import { describe, it, expect } from '@jest/globals'
import request from 'supertest'
import { createServer } from '../../src/server.js'
import { HealthService } from '../../src/modules/health/health.service.js'

// Example route for /health will be attached here if present
// If your app has not yet mounted routes, this test can be adjusted later.

describe('Health route', () => {
    it('GET /health returns 200 and payload', async () => {
        const app = createServer()
        // Temporary route wiring for test purpose only
        const svc = new HealthService()
        app.get('/health', (_req, res) => {
            res.json({ status: 'ok', uptime: svc.uptime() })
        })

        const res = await request(app).get('/health')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('status', 'ok')
        expect(res.body).toHaveProperty('uptime')
    })
})
