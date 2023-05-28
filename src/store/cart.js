import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialCartState = {products: [], quantity:0, total: 0, loading: false, error: null, orderData: null}

export const checkout = createAsyncThunk('checkout/payment', async ({ tokenId, amount }) => {
    try {
        const res = await axios.post('http://localhost:5500/api/checkout/payment', { tokenId, amount })
        return res.data
    } catch (error) {
        console.error(error.message)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price*action.payload.quantity
        },
        removeProduct: (state, action) => {
            state.quantity -= 1
            const productIdx = state.products.findIndex(product => product._id === action.payload)
            state.total -= state.products[productIdx].price
             if (state.products[productIdx].quantity === 1) {
                state.products.splice(productIdx, 1)
            } else if (state.products[productIdx].quantity > 1) {
                state.products[productIdx].quantity -= 1
            } 
        },
        increaseProductQuantity: (state, action) => {
            state.quantity += 1
            const productIdx = state.products.findIndex(product => product._id === action.payload)
            state.products[productIdx].quantity += 1
            state.total += state.products[productIdx].price
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkout.fulfilled, (state, action) => {
                state.orderData = action.payload
                state.loading = false
                state.error = null
                state.products = []
                state.quantity = 0
                state.total = 0
            })
            .addCase(checkout.pending, (state, action) => {
                state.orderData = null
                state.orderData = null
                state.loading = true
            })
            .addCase(checkout.rejected, (state, action) => {
                state.loading = false
                state.error = 'error occurred'
            })
        }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer