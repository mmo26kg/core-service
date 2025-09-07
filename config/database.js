// Tạo config DB với các biến môi trường từ .env
import 'dotenv/config'
import { Sequelize } from 'sequelize'

// Hàm khởi tạo sequelize
function createSequelize(logger) {
    const sequelize = new Sequelize(
        process.env.DB_NAME || 'katchx_core',
        process.env.DB_USER || 'katchx_user',
        process.env.DB_PASSWORD || 'katchx123',
        {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            dialect: process.env.DB_DIALECT || 'postgres',
            pool: {
                max: 5,
                min: 0,
            },
            logging: process.env.NODE_ENV === 'development' ? (msg) => console.log(msg) : false,
        }
    )
    logger?.info(`Sequelize instance created for DB ${process.env.DB_NAME || 'katchx'}`)

    return sequelize
}

function authenticateSequelize(sequelize, logger) {
    return sequelize
        .authenticate()
        .then(() => {
            logger?.info(`Database connection has been established successfully.`)
        })
        .catch((err) => {
            logger?.error(`Unable to connect to the database:`, err)
            process.exit(1)
        })
}

function syncSequelize(sequelize, logger) {
    return sequelize
        .sync({ alter: process.env.ENV_NODE === 'development' }) // Sử dụng alter cho phát triển, migrate cho sản xuất
        .then(() => {
            logger?.info(`Database synchronized successfully.`)
        })
        .catch((err) => {
            logger?.error(`Error synchronizing the database:`, err)
            process.exit(1)
        })
}

function closeSequelize(sequelize, logger) {
    return sequelize
        .close()
        .then(() => {
            logger?.info(`Database connection closed.`)
        })
        .catch((err) => {
            logger?.error(`Error closing the database connection:`, err)
        })
}

export const dbConfig = {
    createSequelize,
    authenticateSequelize,
    syncSequelize,
    closeSequelize,
}
