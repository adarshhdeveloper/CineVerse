const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')   

// Create Express app
const app = express()

//middleware
app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
]

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
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