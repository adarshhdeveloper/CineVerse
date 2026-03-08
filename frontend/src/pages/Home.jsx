import { useState, useEffect, useRef } from 'react'
import { tmdb } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [trending, setTrending] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [popularTv, setPopularTv] = useState([])
    const [loading, setLoading] = useState(true)
    const [heroIndex, setHeroIndex] = useState(0)
    const [fade, setFade] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingRes, moviesRes, tvRes] = await Promise.all([
                    tmdb.get('/trending/all/day'),
                    tmdb.get('/movie/popular'),
                    tmdb.get('/tv/popular')
                ])
                setTrending(trendingRes.data.results)
                setPopularMovies(moviesRes.data.results)
                setPopularTv(tvRes.data.results)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (trending.length === 0) return
        const interval = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setHeroIndex(prev => (prev + 1) % trending.length)
                setFade(true)
            }, 500)
        }, 5000)
        return () => clearInterval(interval)
    }, [trending])

    if (loading) return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <p className="text-white text-xl">Loading...</p>
        </div>
    )

    const hero = trending[heroIndex]

    return (
        <div className="bg-[#0f0f0f] min-h-screen">

            {/* HERO - full screen, navbar ke peeche jaata hai */}
           {/* HERO - desktop full screen, mobile normal */}
<div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 56vw, 100vh)' }}>
    <img
        src={hero?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${hero.backdrop_path}`
            : '/placeholder.jpg'}
        alt={hero?.title || hero?.name}
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent" />

    {/* Hero text */}
    <div
        className="absolute bottom-8 md:bottom-16 left-6 md:left-16 right-6 md:right-auto max-w-xl"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
    >
        <h1 className="text-white text-xl md:text-5xl font-bold mb-1 md:mb-3 drop-shadow-lg">
            {hero?.title || hero?.name}
        </h1>
        <p className="text-gray-300 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 drop-shadow hidden md:block">
            {hero?.overview}
        </p>
        <button
            onClick={() => navigate(`/movie/${hero?.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 md:px-8 md:py-3 rounded-lg transition text-xs md:text-base font-medium"
        >
            ▶ View Details
        </button>
    </div>
</div>

            {/* SECTIONS */}
            <Section title="🔥 Trending Today" items={trending} navigate={navigate} />
            <Section title="🎬 Popular Movies" items={popularMovies} navigate={navigate} />
            <Section title="📺 Popular TV Shows" items={popularTv} navigate={navigate} />

        </div>
    )
}

function Section({ title, items, navigate }) {
    const scrollRef = useRef(null)
    const scrollLeft = () => scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    const scrollRight = () => scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })

    return (
        <div className="px-4 md:px-8 py-4 md:py-6">
            <h2 className="text-white text-base md:text-2xl font-bold mb-3">{title}</h2>

            <div className="relative group">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-0 h-[calc(100%-24px)] z-10 w-8 md:w-14 flex items-center justify-center text-white text-2xl md:text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85), transparent)' }}
                >‹</button>

                <div
                    ref={scrollRef}
                    className="flex gap-2 md:gap-3 pb-3"
                    style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/movie/${item.id}`)}
                                className="cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0"
                                style={{ width: 'clamp(100px, 12vw, 160px)', minWidth: 'clamp(100px, 12vw, 160px)' }}
                            >
                                <img
                                    src={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '/placeholder.jpg'}
                                    alt={item.title || item.name}
                                    className="rounded-md w-full"
                                    style={{ height: 'clamp(150px, 18vw, 240px)', objectFit: 'cover' }}
                                />
                                <p className="text-gray-300 text-xs mt-1 truncate">{item.title || item.name}</p>
                            </div>
                        ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-0 h-[calc(100%-24px)] z-10 w-8 md:w-14 flex items-center justify-center text-white text-2xl md:text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.85), transparent)' }}
                >›</button>
            </div>
        </div>
    )
}

export default Home