import { configureStore } from '@reduxjs/toolkit'

import productReducer from './product'
import authReducer from './auth'
import cartReducer from './cart'

const store = configureStore({
    reducer: {product: productReducer, auth: authReducer, cart: cartReducer}
})

export default store