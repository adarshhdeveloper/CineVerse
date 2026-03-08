import { useState, useEffect } from 'react'
import { backend } from '../../services/api'

function ManageUsers() {
    const [users, setUsers] = useState([])
    const [msg, setMsg] = useState('')

    const fetchUsers = async () => {
        try {
            const res = await backend.get('/api/admin/users')
            setUsers(res.data.users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { fetchUsers() }, [])

    const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

   const handleBan = async (id, isBanned) => {
    try {
        if (isBanned) {
            // already banned hai toh unban karo
            await backend.post(`/api/admin/users/${id}/unban`)
            showMsg('✅ User unbanned!')
        } else {
            // banned nahi hai toh ban karo
            await backend.post(`/api/admin/users/${id}/ban`)
            showMsg('✅ User banned!')
        }
        fetchUsers()
    } catch (err) {
        showMsg('❌ Error!')
    }
}
    const handleDelete = async (id) => {
        if (!confirm('Delete this user?')) return
        try {
            await backend.delete(`/api/admin/users/${id}`)
            showMsg('✅ User deleted!')
            fetchUsers()
        } catch (err) {
            showMsg('❌ Error!')
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] px-6 py-10">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-white text-3xl font-bold mb-8">👥 Manage Users</h1>

                {msg && <div className="mb-4 text-sm text-green-400 bg-green-900/20 border border-green-800 px-4 py-2 rounded-lg">{msg}</div>}

                <div className="flex flex-col gap-3">
                    {users.length === 0 && (
                        <p className="text-gray-500 text-center py-10">No users found.</p>
                    )}
                    {users.map((user) => (
                        <div key={user._id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
                            {/* Avatar */}
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-medium truncate">{user.name}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-[#2a2a2a] text-gray-400'}`}>
                                        {user.role}
                                    </span>
                                    {user.isBanned && <span className="text-xs px-2 py-0.5 rounded-full bg-red-900 text-red-400">Banned</span>}
                                </div>
                                <p className="text-gray-500 text-xs mt-0.5 truncate">{user.email}</p>
                            </div>

                            {/* Actions */}
                            {user.role !== 'admin' && (
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleBan(user._id, user.isBanned)}
                                        className={`px-3 py-1.5 rounded-lg text-xs transition text-white ${user.isBanned ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}
                                    >
                                        {user.isBanned ? 'Unban' : 'Ban'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ManageUsers