import { createSlice } from '@reduxjs/toolkit'
import { productService } from '../services/product.service'

const initialProductState = {products: null, currProductId: null, filter: null}

const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        setFilter: async (state, action) => {
            state.filter = action.payload
            state.products = await productService.query(state.filter)
        },
        setCurrProductId (state, action) {
            state.currProductId = action.payload
        }
    }
})

export const productActions = productSlice.actions

export default productSlice.reducer