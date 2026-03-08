import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-[#111111] border-t border-[#2a2a2a] py-10">
            <div className="max-w-7xl mx-auto px-8">

                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

                    {/* Brand - full width on mobile */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <img src="/favicon.svg" className="h-8 w-8" />
                            <span className="text-blue-500 text-xl font-bold">CineVerse</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Your ultimate destination for movies, TV shows, trailers and more.
                        </p>
                    </div>

                    {/* Discover */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm">Discover</h4>
                        <ul className="flex flex-col gap-2 text-gray-500 text-sm">
                            <li><Link to="/movies" className="hover:text-blue-400 transition">Movies</Link></li>
                            <li><Link to="/tv-shows" className="hover:text-blue-400 transition">TV Shows</Link></li>
                            <li><Link to="/search" className="hover:text-blue-400 transition">Search</Link></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm">Account</h4>
                        <ul className="flex flex-col gap-2 text-gray-500 text-sm">
                            <li><Link to="/login" className="hover:text-blue-400 transition">Login</Link></li>
                            <li><Link to="/register" className="hover:text-blue-400 transition">Register</Link></li>
                        </ul>
                    </div>

                    {/* Powered By */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm">Powered By</h4>
                        <div className="bg-[#1a1a1a] px-3 py-2 rounded-lg inline-block">
                            <p className="text-blue-400 text-sm font-semibold">TMDB API</p>
                        </div>
                        <p className="text-gray-600 text-xs mt-3">
                            Not endorsed by TMDB.
                        </p>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-[#2a2a2a] pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-gray-600 text-xs">© 2026 CineVerse. All rights reserved.</p>
                    <p className="text-gray-500 text-xs">
                        Made with ❤️ by <span className="text-blue-400 font-semibold">Adarsh Prajapati</span>
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer