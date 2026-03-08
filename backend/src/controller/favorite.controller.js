
const favoriteModel = require('../models/favorite.model')
const mongoose = require('mongoose')

async function addFavorite(req, res) {
    try {
        const userId = req.user.id
        const { movieId, movieData } = req.body

        // Already exists check
        const existing = await favoriteModel.findOne({ userId, movieId })
        if (existing) {
            return res.status(409).json({
                message: 'Already in favorites'
            })
        }

        // Save
        const favorite = new favoriteModel({ userId, movieId, movieData })
        await favorite.save()

        res.status(201).json({
            message: 'Added to favorites'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

    async function removeFavorite(req, res) {
        try {
            const userId = new mongoose.Types.ObjectId(req.user.id)
            const { movieId } = req.params

            await favoriteModel.findOneAndDelete({ userId, movieId })

            res.status(200).json({
                message: 'Removed from favorites'
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

async function getFavorites(req, res) {
    try {
        const userId = req.user.id

        const favorites = await favoriteModel.find({ userId })

        res.status(200).json({ favorites })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}
module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
}