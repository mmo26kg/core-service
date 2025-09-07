import { describe, it, expect } from '@jest/globals'
import request from 'supertest'
import { createServer } from '../../src/server.js'
import { UsersModule } from '../../src/modules/users/users.module.js'

// Lightweight app mounting just the UsersModule routes
function mountUsersOnly() {
    const app = createServer()
    const mod = new UsersModule({ logger: console })
    mod.registerRoutes(app)
    return app
}

describe('Users routes', () => {
    it('POST /users and GET /users', async () => {
        const app = mountUsersOnly()

        const createRes = await request(app)
            .post('/users')
            .send({ name: 'Bob', email: 'b@example.com' })
            .expect(201)

        expect(createRes.body).toHaveProperty('id')

        const listRes = await request(app).get('/users').expect(200)
        expect(Array.isArray(listRes.body)).toBe(true)
        expect(listRes.body.length).toBeGreaterThanOrEqual(1)
    })
})
