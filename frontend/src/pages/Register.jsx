import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { backend } from '../services/api'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async () => {
        setLoading(true)
        try {
            await backend.post('/api/auth/register', { name, email, password })
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl w-full max-w-md">
                <h1 className="text-white text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-400 mb-6">Join CineVerse today</p>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#2a2a2a] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                        onClick={handleRegister}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </div>

                <p className="text-gray-400 mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register