import LoginPage from "./components/login/login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./components/Products/products";
import Register from "./components/register/Register";
import ProductsList from "./components/ProductsList/ProductsList";
import Cart from "./components/Cart/Cart"; 
import Navbar from "./components/Navbar/Navbar"; 
import { CartProvider } from "./components/context/CartContext"; 
import Checkout from "./components/Checkout/Checkout";



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:id" element={<Products />} /> 
          <Route path="/category/:category" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/Checkout" element={<Checkout/>}></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
