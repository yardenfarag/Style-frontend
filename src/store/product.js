import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import { productService } from '../services/product.service'

export const query = createAsyncThunk('product', async () => {
    try {
        const res = await axios.get('http://localhost:5500/api/product')
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})

export const getById = createAsyncThunk('product/:id', async (productId) => {
    try {
        const res = await axios.get('http://localhost:5500/api/product/' + productId)
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})

const initialProductState = { currProduct: null, products: null, loading: false, error: null, filter: null }

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
                state.currProduct = null
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