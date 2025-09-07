import { Router } from 'express'

export function buildUsersRouter(controller) {
    const router = Router()

    // Basic routes

    router.get('/', (_req, res) => {
        res.json(controller.list())
    })

    router.post('/', (req, res) => {
        const created = controller.create(req.body)
        res.status(201).json(created)
    })

    return router
}
