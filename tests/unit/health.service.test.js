import { describe, it, expect } from '@jest/globals'
import { HealthService } from '../../src/modules/health/health.service.js'

describe('HealthService', () => {
    it('uptime returns a non-negative integer (seconds)', () => {
        const svc = new HealthService()
        const value = svc.uptime()
        expect(typeof value).toBe('number')
        expect(value).toBeGreaterThanOrEqual(0)
    })
})
