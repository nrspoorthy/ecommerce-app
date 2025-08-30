import LoginPage from './components/login/login'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Products from './components/Products/products'
import Register from './components/register/Register'
import ProductsList from './components/ProductsList/ProductsList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} ></Route>
        <Route path="/login" element={<LoginPage />} ></Route>
        <Route path="/Products" element={<Products />} ></Route>
        <Route path="/products" element={<ProductsList />}></Route>
        <Route path="/category/:category" element={<ProductsList />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
