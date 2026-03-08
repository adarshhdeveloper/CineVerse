const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
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
    }
})

const favoriteModel = mongoose.model('favorites', favoriteSchema)

module.exports = favoriteModel