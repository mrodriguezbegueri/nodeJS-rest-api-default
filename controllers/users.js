const { response, request } = require('express')

const createUser = (req = request, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        msg: 'createUser API - controller',
        nombre,
        edad
    })
}

const getUsers = (req = request, res = response) => {

    const { name } = req.query

    res.json({
        msg: 'getUsers API - controller',
        name
    })
}

const updateUser = (req = request, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'updateUser API - controller',
        id
    })
}

const patchUser = (req = request, res = response) => {
    res.json({
        msg: 'patchUser API - controller'
    })
}

const deleteUser = (req = request, res = response) => {
    res.json({
        msg: 'deleteUser API - controller'
    })
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    patchUser
}