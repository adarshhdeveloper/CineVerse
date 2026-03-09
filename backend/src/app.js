const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser') 
const axios = require('axios')  

// Create Express app
const app = express()

//middleware
app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://cine-verse-eta.vercel.app'
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

// TMDB proxy route
app.use('/api/tmdb', async (req, res) => {
  try {
    const tmdbPath = req.path
    const response = await axios.get(`https://api.themoviedb.org/3${tmdbPath}`, {
      params: {
        ...req.query,
        api_key: process.env.TMDB_API_KEY
      }
    })
    res.json(response.data)
  } catch (error) {
    console.error('TMDB Error:', error.message)  // ← yeh add karo
    res.status(500).json({ error: error.message })  // ← yeh bhi
  }
})

//health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

module.exports = app