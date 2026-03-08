const {Router} = require('express')
const favoriteRouter = Router()
const identifyUser = require('../middlewares/auth.middleware')
const favoriteController = require('../controller/favorite.controller')


/*
* @route POST /api/favorites/add
* @desc Add a movie to favorites
* @access Private
*/
favoriteRouter.post('/add', identifyUser, favoriteController.addFavorite)

/*
* @route DELETE /api/favorites/remove/:movieId
* @desc Remove a movie from favorites
* @access Private
*/
favoriteRouter.delete('/remove/:movieId', identifyUser, favoriteController.removeFavorite)

/*
* @route GET /api/favorites
* @desc Get all favorite movies
* @access Private
*/
favoriteRouter.get('/', identifyUser, favoriteController.getFavorites)

module.exports = favoriteRouter