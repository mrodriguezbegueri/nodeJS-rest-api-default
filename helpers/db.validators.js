const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async(role = '') => {
    const roleExists = await Role.findOne({
        name: role
    })

    if (!roleExists) {
        throw new Error(`the role ${role} is invalid`)
    }
}

const isEmailValid = async(email = '') => {
    const emailExists = await User.findOne({
        email
    })
    
    if (emailExists) {
        throw new Error(`the email ${email} is invalid`)
    }
    
}


const existsUserById = async(id = '') => {
    
    const existsUser = await User.findById(id)
    
    if (!existsUser || !existsUser.estado) {
        throw new Error(`the user with id ${id} not exists`)
    }
    
}

module.exports = {
    isRoleValid,
    isEmailValid,
    existsUserById
}