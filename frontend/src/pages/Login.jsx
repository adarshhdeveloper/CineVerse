import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginSuccess } from '../redux/slices/authSlice'
import { backend } from '../services/api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await backend.post('/api/auth/login', { email, password })
            dispatch(loginSuccess({ user: res.data.user, token: res.data.token }))
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl w-full max-w-md">
                <h1 className="text-white text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-6">Login to CineVerse</p>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#2a2a2a] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#2a2a2a] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                <p className="text-gray-400 mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login