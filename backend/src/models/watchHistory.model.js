const mongoose = require('mongoose')

const watchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    movieId: {
        type: String
    },
    movieData: {
        title: String,
        posterUrl: String,
        description: String,
        releaseDate: String,
        trailerUrl: String,
        genre: String,
        category: String
    },
    watchedAt: {
        type: Date,
        default: Date.now
    }
})

const watchHistoryModel = mongoose.model('watchHistories', watchHistorySchema)

module.exports = watchHistoryModel