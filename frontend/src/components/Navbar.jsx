import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/slices/authSlice'
import { backend } from '../services/api'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { isLoggedIn, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        await backend.post('/api/auth/logout')
        dispatch(logoutSuccess())
        navigate('/login')
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300"
            style={{
                background: isHome && !scrolled
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)'
                    : 'rgba(10,10,10,0.98)'
            }}
        >
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-blue-500 text-xl font-bold flex-shrink-0">
                    <img src="/favicon.svg" alt="logo" className="h-8 w-8" />
                    CineVerse
                </Link>

                <div className="hidden md:flex items-center gap-6 ml-10">
                    <Link to="/" className="text-gray-300 hover:text-white text-sm transition">Home</Link>
                    <Link to="/movies" className="text-gray-300 hover:text-white text-sm transition">Movies</Link>
                    <Link to="/tv-shows" className="text-gray-300 hover:text-white text-sm transition">TV Shows</Link>
                    <Link to="/search" className="text-gray-300 hover:text-white text-sm transition">Search</Link>
                </div>

                <div className="hidden md:flex items-center gap-4 ml-auto">
                    {isLoggedIn ? (
                        <>
                            <span className="text-gray-400 text-sm">Hi, <span className="text-white font-medium">{user?.name}</span></span>
                            <Link to="/favorites" className="text-gray-300 hover:text-white text-sm transition">Favorites</Link>
                            <Link to="/watch-history" className="text-gray-300 hover:text-white text-sm transition">History</Link>
                            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md transition text-sm font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white text-sm transition">Login</Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition text-sm font-medium">Register</Link>
                        </>
                    )}

                    {isLoggedIn && user?.role === 'admin' && (
                    <Link to="/admin" className="text-purple-400 hover:text-purple-300 text-sm transition font-medium">
                     ⚙️ Admin
                    </Link>
                    )}
                </div>

                <button className="md:hidden text-white text-2xl ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col gap-3 px-4 py-4 mt-2 rounded-lg" style={{ background: 'rgba(10,10,10,0.98)' }}>
                    <Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link>
                    <Link to="/movies" className="text-gray-300 hover:text-white text-sm">Movies</Link>
                    <Link to="/tv-shows" className="text-gray-300 hover:text-white text-sm">TV Shows</Link>
                    <Link to="/search" className="text-gray-300 hover:text-white text-sm">Search</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/favorites" className="text-gray-300 hover:text-white text-sm">Favorites</Link>
                            <Link to="/watch-history" className="text-gray-300 hover:text-white text-sm">History</Link>
                            <button onClick={handleLogout} className="text-red-500 text-left text-sm">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-blue-400 text-sm">Login</Link>
                            <Link to="/register" className="text-blue-400 text-sm">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar