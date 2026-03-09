import axios from 'axios'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_KEY = process.env.TMDB_API_KEY

export const tmdbProxy = async (req, res) => {
  try {
    const tmdbPath = req.params[0]
    const response = await axios.get(`${TMDB_BASE}/${tmdbPath}`, {
      params: {
        ...req.query,
        api_key: TMDB_KEY
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'TMDB fetch failed' })
  }
}