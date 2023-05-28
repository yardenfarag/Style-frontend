import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { httpService } from '../services/http.service'

export const query = createAsyncThunk('product', async () => {
    try {
        return await httpService.get('product')
    } catch (error) {
        console.error(error.message)
    }
})

export const getById = createAsyncThunk('product/:id', async (productId) => {
    try {
        return await httpService.get(`product/${productId}`)
    } catch (error) {
        console.error(error.message)
    }
})

const initialProductState = { currProduct: '', products: [], loading: false, error: null, filter: null }

export const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        }

    }, extraReducers: (builder) => {
        builder
            .addCase(query.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(query.pending, (state, action) => {
                state.loading = true
            })
            .addCase(query.rejected, (state, action) => {
                state.loading = false
                state.error = 'error occurred'
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.currProduct = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getById.pending, (state, action) => {
                state.currProduct = ''
                state.loading = true
            })
            .addCase(getById.rejected, (state, action) => {
                state.loading = false
                state.error = 'error occurred'
            })
    }
})

export const productActions = productSlice.actions

export default productSlice.reducer