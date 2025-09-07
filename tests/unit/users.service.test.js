import { describe, it, expect } from '@jest/globals'
import { UsersService } from '../../src/modules/users/users.service.js'

describe('UsersService', () => {
    it('creates and lists users', () => {
        const svc = new UsersService()
        const created = svc.create({ name: 'Alice', email: 'a@example.com' })
        expect(created.id).toBeDefined()
        expect(svc.findAll()).toHaveLength(1)
        expect(svc.findById(created.id)).toMatchObject({ name: 'Alice' })
    })
})
