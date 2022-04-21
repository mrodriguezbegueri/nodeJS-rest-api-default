const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
    name: {
        type: String,
        required: [true, "The name of role is required"],
        unique: true
    }
})

module.exports = model('Role', RoleSchema)