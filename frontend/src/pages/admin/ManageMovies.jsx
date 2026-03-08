import { useState, useEffect } from 'react'
import { backend } from '../../services/api'

const emptyForm = {
    title: '', description: '', posterUrl: '', movieId: '',
    releaseDate: '', trailerUrl: '', genre: '', category: ''
}

function ManageMovies() {
    const [movies, setMovies] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [msg, setMsg] = useState('')

    const fetchMovies = async () => {
        try {
            const res = await backend.get('/api/admin/movies')
            setMovies(res.data.movies)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { fetchMovies() }, [])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            if (editingId) {
                await backend.put(`/api/admin/movies/${editingId}`, form)
                setMsg('✅ Movie updated!')
            } else {
                await backend.post('/api/admin/movies', form)
                setMsg('✅ Movie added!')
            }
            setForm(emptyForm)
            setEditingId(null)
            setShowForm(false)
            fetchMovies()
        } catch (err) {
            setMsg('❌ Error occurred!')
        } finally {
            setLoading(false)
            setTimeout(() => setMsg(''), 3000)
        }
    }

    const handleEdit = (movie) => {
        setForm({
            title: movie.title,
            description: movie.description,
            posterUrl: movie.posterUrl,
            movieId: movie.movieId,
            releaseDate: movie.releaseDate?.slice(0, 10),
            trailerUrl: movie.trailerUrl,
            genre: movie.genre,
            category: movie.category
        })
        setEditingId(movie.movieId)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (movieId) => {
        if (!confirm('Delete this movie?')) return
        try {
            await backend.delete(`/api/admin/movies/${movieId}`)
            setMsg('✅ Movie deleted!')
            fetchMovies()
        } catch (err) {
            setMsg('❌ Error!')
        }
        setTimeout(() => setMsg(''), 3000)
    }

    const fields = [
        { key: 'title', label: 'Title', placeholder: 'Movie title' },
        { key: 'movieId', label: 'Movie ID (TMDB)', placeholder: 'e.g. 123456' },
        { key: 'genre', label: 'Genre', placeholder: 'e.g. Action, Drama' },
        { key: 'category', label: 'Category', placeholder: 'e.g. movie / tv' },
        { key: 'releaseDate', label: 'Release Date', placeholder: 'YYYY-MM-DD' },
        { key: 'posterUrl', label: 'Poster URL', placeholder: 'https://...' },
        { key: 'trailerUrl', label: 'Trailer URL', placeholder: 'https://youtube.com/...' },
    ]

    return (
        <div className="min-h-screen bg-[#0f0f0f] px-6 py-10">
            <div className="max-w-5xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-white text-3xl font-bold">🎬 Manage Movies</h1>
                    <button
                        onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditingId(null) }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                    >
                        {showForm ? '✕ Cancel' : '+ Add Movie'}
                    </button>
                </div>

                {msg && <div className="mb-4 text-sm text-green-400 bg-green-900/20 border border-green-800 px-4 py-2 rounded-lg">{msg}</div>}

                {/* Form */}
                {showForm && (
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-8">
                        <h2 className="text-white font-semibold text-lg mb-5">{editingId ? 'Edit Movie' : 'Add New Movie'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map(f => (
                                <div key={f.key}>
                                    <label className="text-gray-400 text-xs mb-1 block">{f.label}</label>
                                    <input
                                        value={form[f.key]}
                                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                        placeholder={f.placeholder}
                                        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            ))}
                            <div className="md:col-span-2">
                                <label className="text-gray-400 text-xs mb-1 block">Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    placeholder="Movie description..."
                                    rows={3}
                                    className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 resize-none"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : editingId ? 'Update Movie' : 'Add Movie'}
                        </button>
                    </div>
                )}

                {/* Movies List */}
                <div className="flex flex-col gap-3">
                    {movies.length === 0 && (
                        <p className="text-gray-500 text-center py-10">No movies added yet.</p>
                    )}
                    {movies.map((movie) => (
                        <div key={movie.movieId} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
                            <img
                                src={movie.posterUrl || '/placeholder.jpg'}
                                alt={movie.title}
                                className="h-16 w-12 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{movie.title}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{movie.genre} • {movie.category} • {movie.releaseDate?.slice(0, 10)}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => handleEdit(movie)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-lg text-xs transition">Edit</button>
                                <button onClick={() => handleDelete(movie.movieId)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs transition">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ManageMovies