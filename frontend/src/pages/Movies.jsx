import { useState, useEffect, useRef, useCallback } from 'react'
import { tmdb } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Movies() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const navigate = useNavigate()

    const fetchMovies = async (pageNum) => {
        setLoading(true)
        try {
            const res = await tmdb.get('/movie/popular', { params: { page: pageNum } })
            setMovies(prev => [...prev, ...res.data.results])
            setHasMore(pageNum < res.data.total_pages)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(page)
    }, [page])

    // Infinite Scroll
    const lastMovieRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <div className="bg-[#0f0f0f] min-h-screen px-6 py-8">
            <h1 className="text-white text-3xl font-bold mb-6">🎬 Popular Movies</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie, index) => {
                    if (index === movies.length - 1) {
                        return (
                            <div
                                ref={lastMovieRef}
                                key={movie.id}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                className="cursor-pointer hover:scale-105 transition"
                            >
                                <img
                                    src={movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                        : '/placeholder.jpg'}
                                    alt={movie.title}
                                    className="rounded-lg w-full"
                                />
                                <p className="text-gray-300 text-sm mt-2 truncate">{movie.title}</p>
                            </div>
                        )
                    }
                    return (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="cursor-pointer hover:scale-105 transition"
                        >
                            <img
                                src={movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                    : '/placeholder.jpg'}
                                alt={movie.title}
                                className="rounded-lg w-full"
                            />
                            <p className="text-gray-300 text-sm mt-2 truncate">{movie.title}</p>
                        </div>
                    )
                })}
            </div>

            {loading && (
                <div className="flex justify-center mt-8">
                    <p className="text-gray-400">Loading more movies...</p>
                </div>
            )}
        </div>
    )
}

export default Movies