const userModel = require('../models/user.model')

async function isAdmin(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id)
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. Admins only.'
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            message: 'Server error.'
        })
    }
}

module.exports = isAdmin