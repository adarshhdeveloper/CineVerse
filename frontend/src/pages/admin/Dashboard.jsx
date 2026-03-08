import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { backend } from '../../services/api'

function Dashboard() {
    const [userCount, setUserCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await backend.get('/api/admin/users')
                setUserCount(res.data.users.length)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="min-h-screen bg-[#0f0f0f] px-8 py-10">
            <h1 className="text-white text-3xl font-bold mb-8">⚙️ Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex items-center gap-5">
                    <div className="bg-blue-600 p-4 rounded-xl text-2xl">👥</div>
                    <div>
                        <p className="text-gray-400 text-sm">Total Users</p>
                        <p className="text-white text-3xl font-bold">{loading ? '...' : userCount}</p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex items-center gap-5">
                    <div className="bg-purple-600 p-4 rounded-xl text-2xl">🎬</div>
                    <div>
                        <p className="text-gray-400 text-sm">Platform</p>
                        <p className="text-white text-xl font-bold">CineVerse Admin</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/admin/movies" className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-blue-600 rounded-xl p-6 transition group">
                    <div className="text-3xl mb-3">🎬</div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition">Manage Movies</h3>
                    <p className="text-gray-500 text-sm mt-1">Add, edit or delete movies</p>
                </Link>

                <Link to="/admin/users" className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-blue-600 rounded-xl p-6 transition group">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition">Manage Users</h3>
                    <p className="text-gray-500 text-sm mt-1">Ban, delete or view users</p>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard