const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    posterUrl: {
        type: String
    },
    movieId: {
        type: String
    },
    releaseDate: {
        type: String
    },
    trailerUrl: {
        type: String
    },
    genre: {
        type: String
    },
    category: {
        type: String
    }
},{ timestamps: true })

const movieModel = mongoose.model('movies', movieSchema)

module.exports = movieModel