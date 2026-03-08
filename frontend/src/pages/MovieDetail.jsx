import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { tmdb, backend } from '../services/api'

function MovieDetail() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [trailerKey, setTrailerKey] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false)
    const [loading, setLoading] = useState(true)
    const { isLoggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const [movieRes, videoRes] = await Promise.all([
                    tmdb.get(`/movie/${id}`),
                    tmdb.get(`/movie/${id}/videos`)
                ])
                setMovie(movieRes.data)

                // Trailer dhundo
                const trailer = videoRes.data.results.find(
                    (v) => v.type === 'Trailer' && v.site === 'YouTube'
                )
                setTrailerKey(trailer?.key || null)

                // Watch History mein save karo
                if (isLoggedIn) {
                    await backend.post('/api/watch-history/add', {
                        movieId: String(movieRes.data.id),
                        movieData: {
                            title: movieRes.data.title,
                            posterUrl: movieRes.data.poster_path,
                            description: movieRes.data.overview,
                            releaseDate: movieRes.data.release_date,
                            genre: movieRes.data.genres?.[0]?.name || '',
                            category: 'Movie'
                        }
                    })
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [id])

    const handleAddFavorite = async () => {
        if (!isLoggedIn) return navigate('/login')
        try {
            await backend.post('/api/favorites/add', {
                movieId: String(movie.id),
                movieData: {
                    title: movie.title,
                    posterUrl: movie.poster_path,
                    description: movie.overview,
                    releaseDate: movie.release_date,
                    genre: movie.genres?.[0]?.name || '',
                    category: 'Movie'
                }
            })
            alert('Added to favorites!')
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong')
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <p className="text-white text-xl">Loading...</p>
        </div>
    )

    return (
        <div className="bg-[#0f0f0f] min-h-screen">

            {/* Backdrop */}
            <div className="relative h-[50vh]">
                <img
                    src={movie?.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        : '/placeholder.jpg'}
                    alt={movie?.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent" />
            </div>

            {/* Details */}
            <div className="px-6 py-8 flex flex-col md:flex-row gap-8">

                {/* Poster */}
                <img
                    src={movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : '/placeholder.jpg'}
                    alt={movie?.title}
                    className="rounded-xl w-48 h-auto self-start"
                />

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-white text-4xl font-bold mb-2">{movie?.title}</h1>
                    <p className="text-gray-400 text-sm mb-4">{movie?.release_date} • ⭐ {movie?.vote_average?.toFixed(1)}</p>
                    <p className="text-gray-300 mb-6">{movie?.overview || 'Description not available'}</p>

                    <div className="flex gap-4 flex-wrap">
                        {/* Trailer Button */}
                        <button
                            onClick={() => trailerKey ? setShowTrailer(true) : alert('Trailer not available')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            ▶ Watch Trailer
                        </button>

                        {/* Favorite Button */}
                        <button
                            onClick={handleAddFavorite}
                            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-6 py-2 rounded-lg transition"
                        >
                            ❤️ Add to Favorites
                        </button>
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl px-4">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute -top-10 right-4 text-white text-2xl"
                        >
                            ✕
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            className="w-full aspect-video rounded-xl"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieDetail