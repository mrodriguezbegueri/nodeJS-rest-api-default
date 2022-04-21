const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const createUser = async(req = request, res = response) => {
    try {
        const { name, email, password, role } = req.body

        const user = new User({
            name,
            email,
            password,
            role
        })

        const emailExists = User.findOne({
            email
        })

        if (emailExists) {
            return res.status(400).json({
                msg: 'El correo ya existe'
            })
        }
        
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)

        await user.save()

        res.json({
            user
        })
    } catch(error) {
        console.log(error)
    }
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