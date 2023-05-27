import { ProductDetails } from './pages/ProductDetails'
import { Home } from './pages/Home'
import { ProductList } from './pages/ProductList'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import { Success } from './pages/Success'
import { useSelector } from 'react-redux'
import { ToastyMessage } from './components/ToastyMessage'

function App() {
  const user = useSelector(state => state.auth.user)
  return (
    <Router>
      <ToastyMessage/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products" element={!user ? <Navigate to='/login'/> : <ProductList/>}/>
        <Route path="/product/:id" element={!user ? <Navigate to='/login'/> : <ProductDetails/>}/>
        <Route path="/cart" element={!user ? <Navigate to='/login'/> : <Cart/>}/>
        <Route path="/login" element={user ? <Navigate to='/' /> : <Login/>}/>
        <Route path="/register" element={user ? <Navigate to='/' /> :<Register/>}/>
        <Route path="/success" element={!user ? <Navigate to='/login'/> : <Success/>}/>
      </Routes>
    </Router>
  )
}

export default App
