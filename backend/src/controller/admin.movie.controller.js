const movieModel = require('../models/movie.model')

async function addMovieController(req, res) {
    try {
        const { title, description, posterUrl, movieId, releaseDate, trailerUrl, genre, category } = req.body
        
        // Check if movie already exists
        const existingMovie = await movieModel.findOne({ movieId })
        if (existingMovie) {
            return res.status(409).json({
                message: 'Movie already exists'
            })
        }
        
        const movie = new movieModel({ title, description, posterUrl, movieId, releaseDate, trailerUrl, genre, category })
        
        await movie.save()
        
        res.status(201).json({
            message : 'movie added successfully',
            movie
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error.' })
    }
}

async function getAllMoviesController(req, res) {
    try {
        const movies = await movieModel.find()
        res.status(200).json({
            message: 'Movies retrieved successfully',
            movies
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error.' })
    }
}

async function deleteMovieController(req, res) {
    try {
        const { id } = req.params

        const movie = await movieModel.findOneAndDelete(id)
        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }

        res.status(200).json({
            message: 'Movie deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error.' })
    }
}

async function updateMovieController(req, res) {
    try {
        const { id } = req.params
        const { title, description, posterUrl, releaseDate, trailerUrl, genre, category } = req.body

        const movie = await movieModel.findOneAndUpdate({ movieId: id }, { title, description, posterUrl, releaseDate, trailerUrl, genre, category }, { new: true })
        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }

        res.status(200).json({
            message: 'Movie updated successfully',
            movie
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' })
    }
}

module.exports = { addMovieController, getAllMoviesController, deleteMovieController, updateMovieController }