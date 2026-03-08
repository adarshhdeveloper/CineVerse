import { useState, useEffect } from 'react'
import { backend } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function WatchHistory() {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const { isLoggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) return navigate('/login')
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        try {
            const res = await backend.get('/api/watch-history')
            setHistory(res.data.history)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (movieId) => {
        try {
            await backend.delete(`/api/watch-history/remove/${movieId}`)
            setHistory(prev => prev.filter(h => h.movieId !== movieId))
        } catch (err) {
            console.log(err)
        }
    }

    const handleClearAll = async () => {
        try {
            await backend.delete('/api/watch-history/clear')
            setHistory([])
        } catch (err) {
            console.log(err)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <p className="text-white text-xl">Loading...</p>
        </div>
    )

    return (
        <div className="bg-[#0f0f0f] min-h-screen px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-white text-3xl font-bold">🕐 Watch History</h1>
                {history.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <p className="text-gray-400 text-center mt-16">No watch history yet!</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {history.map((item) => (
                        <div key={item._id} className="relative">
                            <img
                                src={item.movieData?.posterUrl
                                    ? `https://image.tmdb.org/t/p/w300${item.movieData.posterUrl}`
                                    : '/placeholder.jpg'}
                                alt={item.movieData?.title}
                                onClick={() => navigate(`/movie/${item.movieId}`)}
                                className="rounded-lg w-full cursor-pointer hover:scale-105 transition"
                            />
                            <p className="text-gray-300 text-sm mt-2 truncate">{item.movieData?.title}</p>
                            <p className="text-gray-500 text-xs mt-1">
                                {new Date(item.watchedAt).toLocaleDateString()}
                            </p>
                            <button
                                onClick={() => handleRemove(item.movieId)}
                                className="mt-1 w-full bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded-lg transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WatchHistory