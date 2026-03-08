const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    try {
        const {
            name,
            email,
            password
        } = req.body

        // Check if user already exists
        const existingUser = await userModel.findOne({
            email
        })
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })

        // Save user to database
        await user.save()

        // Generate JWT token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '5d'
        })

        res.cookie('token', token, { httpOnly: true }) // Set token in cookie
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

async function loginController(req, res) {
    try {
        const {
            email,
            password
        } = req.body

        // Check if user exists
        const user = await userModel.findOne({
            email
        })
        if (!user) {
            return res.status(404).json({
                message: 'Invalid credentials'
            })
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        // Generate JWT token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '5d'
        })
        
        res.cookie('token', token, { httpOnly: true }) // Set token in cookie
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function logoutController(req, res) {
    res.clearCookie('token') // Clear the token cookie
    res.status(200).json({
        message: 'Logout successful'
    })
}

async function getMeController(req, res) {
    try {
        const userId = req.user.id
        const user = await userModel.findById(userId)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMeController
}