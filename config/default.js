export default {
    app: {
        name: 'core-service',
        env: process.env.NODE_ENV || 'development',
    },
    server: {
        port: Number(process.env.PORT) || 3000,
    },
}
