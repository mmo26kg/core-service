import express from 'express'
import bodyParser from 'body-parser'

export function createServer() {
    const app = express()

    // middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    return app
}
