import { useState, useEffect, useRef, useCallback } from 'react'
import { tmdb } from '../services/api'
import { useNavigate } from 'react-router-dom'

function TvShows() {
    const [shows, setShows] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const navigate = useNavigate()

    const fetchShows = async (pageNum) => {
        setLoading(true)
        try {
            const res = await tmdb.get('/tv/popular', { params: { page: pageNum } })
            setShows(prev => [...prev, ...res.data.results])
            setHasMore(pageNum < res.data.total_pages)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShows(page)
    }, [page])

    const lastShowRef = useCallback((node) => {
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
            <h1 className="text-white text-3xl font-bold mb-6">📺 Popular TV Shows</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {shows.map((show, index) => {
                    const isLast = index === shows.length - 1
                    return (
                        <div
                            ref={isLast ? lastShowRef : null}
                            key={show.id}
                            onClick={() => navigate(`/movie/${show.id}`)}
                            className="cursor-pointer hover:scale-105 transition"
                        >
                            <img
                                src={show.poster_path
                                    ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                                    : '/placeholder.jpg'}
                                alt={show.name}
                                className="rounded-lg w-full"
                            />
                            <p className="text-gray-300 text-sm mt-2 truncate">{show.name}</p>
                        </div>
                    )
                })}
            </div>

            {loading && (
                <div className="flex justify-center mt-8">
                    <p className="text-gray-400">Loading more shows...</p>
                </div>
            )}
        </div>
    )
}

export default TvShows