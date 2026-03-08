import { useState, useEffect } from 'react'
import { tmdb } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Debouncing — 500ms baad search hoga
    useEffect(() => {
        if (!query) {
            setResults([])
            return
        }
        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await tmdb.get('/search/multi', {
                    params: { query }
                })
                setResults(res.data.results)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(timer) // cleanup — naya type kiya toh purana timer cancel
    }, [query])

    return (
        <div className="bg-[#0f0f0f] min-h-screen px-6 py-8">
            <h1 className="text-white text-3xl font-bold mb-6">🔍 Search</h1>

            <input
                type="text"
                placeholder="Search movies, tv shows, people..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mb-8"
            />

            {loading && <p className="text-gray-400 mb-4">Searching...</p>}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => navigate(`/movie/${item.id}`)}
                        className="cursor-pointer hover:scale-105 transition"
                    >
                        <img
                            src={item.poster_path || item.profile_path
                                ? `https://image.tmdb.org/t/p/w300${item.poster_path || item.profile_path}`
                                : '/placeholder.jpg'}
                            alt={item.title || item.name}
                            className="rounded-lg w-full"
                        />
                        <p className="text-gray-300 text-sm mt-2 truncate">{item.title || item.name}</p>
                        <p className="text-gray-500 text-xs capitalize">{item.media_type}</p>
                    </div>
                ))}
            </div>

            {results.length === 0 && query && !loading && (
                <p className="text-gray-400 text-center mt-8">No results found for "{query}"</p>
            )}
        </div>
    )
}

export default Search