const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'user'
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const userModel = mongoose.model('users',userSchema)

module.exports = userModel