import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        token: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logoutSuccess: (state) => {
            state.user = null
            state.token = null
            state.isLoggedIn = false
        },
        setUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        }
    }
})

export const { loginSuccess, logoutSuccess, setUser } = authSlice.actions
export default authSlice.reducer