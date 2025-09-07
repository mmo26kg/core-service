import express from 'express'
import bodyParser from 'body-parser'

export function createServer() {
    const app = express()

    // middleware
    // Minimal request logger (disabled in test)
    if (process.env.NODE_ENV !== 'test') {
        app.use((req, _res, next) => {
            console.info(`[REQ] ${req.method} ${req.url}`)
            next()
        })
    }
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    return app
}
