import { ProductDetails } from './pages/ProductDetails'
import { Home } from './pages/Home'
import { ProductList } from './pages/ProductList'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'

function App() {
  const user = true
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={user ? <Navigate to='/' /> : <Login/>}/>
        <Route path="/register" element={user ? <Navigate to='/' /> :<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
