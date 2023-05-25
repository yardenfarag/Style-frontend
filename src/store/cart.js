import { createSlice } from "@reduxjs/toolkit"

const initialCartState = {products: [], quantity:0, total: 0}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price*action.payload.quantity
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer