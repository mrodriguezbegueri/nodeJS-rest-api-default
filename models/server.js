const express = require('express')
const cors = require('cors')
const constants = require('../constants/constants')
const userRoutes = require('../routes/users')

const { dbConnection } = require('../database/config')

const { USERS_ROUTES_PATH } = constants

const { PORT } = process.env

class Server {

    constructor() {
        this.app = express()
        this.port = PORT

        // DB connection
        this.connectDB()

        // MiddleWares
        this.middlewares()

        // Routes API
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {

        this.app.use(cors())

        this.app.use(express.json())

        this.app.use(express.static('public'))

    }

    routes() {
        this.app.use(USERS_ROUTES_PATH, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in ${this.port}`)
        })
    }
}

module.exports = Server