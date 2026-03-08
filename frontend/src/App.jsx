import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVShows from './pages/TvShows'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import WatchHistory from './pages/Watchhistory'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, logoutSuccess } from './redux/slices/authSlice'
import { backend } from './services/api'
import AdminRoute from './components/AdminRoute'
import Dashboard from './pages/admin/Dashboard'
import ManageMovies from './pages/admin/ManageMovies'
import ManageUsers from './pages/admin/ManageUsers'

function PageWrapper({ children }) {
    const location = useLocation()
    const isHome = location.pathname === '/'
    return (
        <div className={isHome ? '' : 'pt-16 bg-[#0f0f0f] min-h-screen'}>
            {children}
        </div>
    )
}

function AppContent() {
    const dispatch = useDispatch()
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await backend.get('/api/auth/get-me')
                dispatch(setUser(res.data.user))
            } catch (err) {
                dispatch(logoutSuccess())
            } finally {
                setAuthLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (authLoading) return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        </div>
    )

    return (
        <>
            <Navbar />
            <PageWrapper>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv-shows' element={<TVShows />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/movie/:id' element={<MovieDetail />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/watch-history' element={<WatchHistory />} />
                    <Route path='/admin' element={<AdminRoute><Dashboard /></AdminRoute>} />
                    <Route path='/admin/movies' element={<AdminRoute><ManageMovies /></AdminRoute>} />
                    <Route path='/admin/users' element={<AdminRoute><ManageUsers /></AdminRoute>} />
                </Routes>
            </PageWrapper>
            <Footer />
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App