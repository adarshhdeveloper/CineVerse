const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')   

// Create Express app
const app = express()

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

// auth routes
const authRouter = require('./routes/auth.route')
app.use('/api/auth', authRouter)

// Favorite routes
const favoriteRouter = require('./routes/favorite.routes')
app.use('/api/favorites', favoriteRouter)

// Watch history routes
const watchHistoryRouter = require('./routes/watchHistory.routes')
app.use('/api/watch-history', watchHistoryRouter)

//admin routes
const adminRouter = require('./routes/admin.routes')
app.use('/api/admin', adminRouter)

module.exports = app