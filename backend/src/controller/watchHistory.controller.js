const watchHistoryModel = require('../models/watchHistory.model')
const mongoose = require('mongoose')

async function addToWatchHistory(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id)
        const {
            movieId,
            movieData
        } = req.body
        const watchHistoryEntry = new watchHistoryModel({
            userId,
            movieId,
            movieData
        })

        await watchHistoryEntry.save()

        res.status(201).json({
            message: 'Added to watch history'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function addToWatchHistory(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id)
        const { movieId, movieData } = req.body

        // Already exists check
        const existing = await watchHistoryModel.findOne({ userId, movieId })
        if (existing) {
            existing.watchedAt = Date.now()
            await existing.save()
            return res.status(200).json({ message: 'History updated' })
        }

        const watchHistoryEntry = new watchHistoryModel({ userId, movieId, movieData })
        await watchHistoryEntry.save()

        res.status(201).json({
            message: 'Added to watch history'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function getWatchHistory(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id)
        const watchHistory = await watchHistoryModel.find({ userId }).sort({ watchedAt: -1 })

        res.status(200).json({
            message: 'Watch history retrieved',
            history: watchHistory
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


// controller mein add karo
async function clearAllHistory(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id)
        await watchHistoryModel.deleteMany({ userId })
        res.status(200).json({ message: 'History cleared' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function deleteFromWatchHistory(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id)
        const { movieId } = req.params

        await watchHistoryModel.findOneAndDelete({ userId, movieId })

        res.status(200).json({
            message: 'Removed from watch history'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = {
    addToWatchHistory,
    getWatchHistory,
    deleteFromWatchHistory,
    clearAllHistory
}