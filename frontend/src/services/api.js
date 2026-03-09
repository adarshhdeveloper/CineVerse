// import axios from 'axios'

// const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
// const TMDB_BASE = 'https://api.themoviedb.org/3'

// // TMDB API
// export const tmdb = axios.create({
//     baseURL: TMDB_BASE,
//     params: {
//         api_key: TMDB_KEY
//     }
// })

// // Backend API
// export const backend = axios.create({
//     baseURL: BACKEND_URL,
//     withCredentials: true
// })
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// TMDB API — ab backend proxy se jayega
export const tmdb = axios.create({
    baseURL: `${BACKEND_URL}/api/tmdb`,
})

// Backend API
export const backend = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})