const {Router} = require('express')
const adminRoutes = Router()
const adminMovieController = require('../controller/admin.movie.controller')
const adminUserController = require('../controller/admin.user.controller')
const isAdmin = require('../middlewares/admin.middleware')
const identifyUser = require('../middlewares/auth.middleware')



//Movie management routes 
/*
*    @route POST /api/admin/movies
*    @desc Add a new movie (Admin only)
*    @access Private (Admin)
*/
adminRoutes.post('/movies', identifyUser,isAdmin, adminMovieController.addMovieController)

/*
*    @route GET /api/admin/movies
*    @desc Get all movies (Admin only)
*    @access Private (Admin)
*/
adminRoutes.get('/movies', identifyUser,isAdmin, adminMovieController.getAllMoviesController)

/*
*    @route DELETE /api/admin/movies/:id
*    @desc Delete a movie by ID (Admin only)
*    @access Private (Admin)
*/
adminRoutes.delete('/movies/:id', identifyUser,isAdmin, adminMovieController.deleteMovieController)

/*
*    @route PUT /api/admin/movies/:id
*    @desc Update a movie by ID (Admin only)
*    @access Private (Admin)
*/
adminRoutes.put('/movies/:id', identifyUser,isAdmin, adminMovieController.updateMovieController)




// User management routes *********************************************************************************

/*
*    @route GET /api/admin/users
*    @desc Get all users (Admin only)
*    @access Private (Admin)
*/
adminRoutes.get('/users', identifyUser,isAdmin, adminUserController.getAllUsersController)

/*
*    @route POST /api/admin/users/:id/ban
*    @desc Ban a user by ID (Admin only)
*    @access Private (Admin)
*/
adminRoutes.post('/users/:id/ban', identifyUser,isAdmin, adminUserController.banUserController)

/*
*    @route POST /api/admin/users/:id/unban
*    @desc Unban a user by ID (Admin only)
*    @access Private (Admin)
*/
adminRoutes.post('/users/:id/unban', identifyUser,isAdmin, adminUserController.unbanUserController)

/*
*    @route DELETE /api/admin/users/:id
*    @desc Delete a user by ID (Admin only)
*    @access Private (Admin)
*/
adminRoutes.delete('/users/:id', identifyUser,isAdmin, adminUserController.deleteUserController)


module.exports = adminRoutes
