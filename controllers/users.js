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

const getUsers = async(req = request, res = response) => {

    const { limit = 5, from = 0  } = req.query

    const query = {
        estado: true
    }

    const requests = []

    const usersRequest = User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    requests.push(usersRequest)

    const totalRequest = User.countDocuments(query)
    requests.push(totalRequest)

    const [ users, total] = await Promise.all(requests)

    res.json({
        users,
        total
    })
}

const updateUser = async (req = request, res = response) => {

    const { id } = req.params
    const { _id, password, google, ...rest } = req.body

    
    if (password) {
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }
    
    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user)
}

const patchUser = (req = request, res = response) => {
    res.json({
        msg: 'patchUser API - controller'
    })
}

const deleteUser = async(req = request, res = response) => {
    const { id } = req.params

    // const deletedUser = await User.findOneAndDelete(id)

    const deletedUser = await User.findByIdAndUpdate(id, {
        estado: false
    })

    res.json(deletedUser)
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    patchUser
}