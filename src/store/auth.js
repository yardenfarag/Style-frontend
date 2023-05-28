import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpService } from '../services/http.service'

export const signup = createAsyncThunk('auth/signup', async ({ name, lastName, username, email, password }) => {
    try {
        return await httpService.post('auth/signup', { name, lastName, username, email, password })
    } catch (error) {
        console.error(error.message)
    }
})
export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
    try {
        return await httpService.post('auth/login', {username, password})
    } catch (error) {
        console.error(error.message)
    }
})

const initialState = { user: null, isLoggedIn: false, loading: false, error: null }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null
            state.loading = false
            state.isLoggedIn = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoggedIn = true
                state.loading = false
                state.error = null
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.isLoggedIn = false
                state.error = 'error occurred'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoggedIn = true
                state.loading = false
                state.error = null
            })
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.isLoggedIn = false
                state.error = 'error occurred'
            })
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer
