const userModel = require('../models/user.model')

// Get all users   
async function getAllUsersController(req, res) {
    try {
        const users = await userModel.find()
        res.status(200).json({
            message: 'Users retrieved successfully',
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' })
    }
}

// Additional user management functions (e.g., ban/unban user, change role) can be added here in the future
async function banUserController(req, res) {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        user.isBanned = true
        await user.save()
        res.status(200).json({ message: 'User banned successfully.' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' })
    }
}

//unban user
async function unbanUserController(req, res) {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        user.isBanned = false
        await user.save()
        res.status(200).json({ message: 'User unbanned successfully.' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' })
    }
}

//delete user 
async function deleteUserController(req, res) {
    try {
        const { id } = req.params
        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        res.status(200).json({ message: 'User deleted successfully.' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' })
    }
}

module.exports = { getAllUsersController, banUserController , deleteUserController, unbanUserController }