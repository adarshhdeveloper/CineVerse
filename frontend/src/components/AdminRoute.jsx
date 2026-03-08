import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
    const { isLoggedIn, user } = useSelector((state) => state.auth)

    if (!isLoggedIn) return <Navigate to='/login' />
    if (user?.role !== 'admin') return <Navigate to='/' />

    return children
}

export default AdminRoute