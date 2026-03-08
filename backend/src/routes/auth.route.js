const {Router} = require('express')
const authRouter = Router()
const authController = require('../controller/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')


/* 
 *  @route POST /api/auth/register
 *  @desc Register a new user
 *  @access Public
*/
authRouter.post('/register', authController.registerController) 

/* 
 *  @route POST /api/auth/login
 *  @desc Login a user
 *  @access Public
*/
authRouter.post('/login', authController.loginController)

/* 
 *  @route POST /api/auth/logout
 *  @desc Logout a user
 *  @access Public
*/
authRouter.post('/logout', authController.logoutController) 

/* 
 *  @route GET /api/auth/get-me
 *  @desc Get current user details
 *  @access Private
*/
authRouter.get('/get-me', identifyUser, authController.getMeController)

module.exports = authRouter
