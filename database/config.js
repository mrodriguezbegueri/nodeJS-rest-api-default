const mongoose = require('mongoose')

const { DB_HOST } = process.env

const dbConnection = async() => {
    try {
       await mongoose.connect(DB_HOST, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       })

       console.log('Data base online')
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexión de la db')
    }
}

module.exports = {
    dbConnection
}