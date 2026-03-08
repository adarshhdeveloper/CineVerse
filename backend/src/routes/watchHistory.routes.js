const {Router} = require('express')
const watchHistoryRouter = Router()
const watchHistoryController = require('../controller/watchHistory.controller')
const identifyUser = require('../middlewares/auth.middleware')


/*
 * @route POST /api/watch-history/add
* @desc Add a movie to watch history
* @access Private
*/
watchHistoryRouter.post('/add', identifyUser, watchHistoryController.addToWatchHistory)

/*
* @route GET /api/watch-history
* @desc Get user's watch history
* @access Private
*/
watchHistoryRouter.get('/', identifyUser, watchHistoryController.getWatchHistory)

/*
* @route DELETE /api/watch-history/remove/:movieId
* @desc Remove a movie from watch history
* @access Private
*/
watchHistoryRouter.delete('/remove/:movieId', identifyUser, watchHistoryController.deleteFromWatchHistory)

/*
* @route DELETE /api/watch-history/clear
* @desc Clear entire watch history
* @access Private
*/
watchHistoryRouter.delete('/clear', identifyUser, watchHistoryController.clearAllHistory)

module.exports = watchHistoryRouter