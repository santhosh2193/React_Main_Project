
import Login from "./Components/Main_Files_jsx/login"
import Products from "./Components/Main_Files_jsx/products"
import Register from "./Components/Main_Files_jsx/register"
import './Components/CSS_Styles/style.css'
import { Routes,Route } from 'react-router-dom'
import Single_product from "./Components/Main_Files_jsx/single_product"
// import { CartProvider } from "./Components/Main_Files_jsx/cart_context"
import Cart from "./Components/Main_Files_jsx/cart"
import { CartProvider } from "./Components/Main_Files_jsx/cart_context"
import Navbar_Route from "./Components/Main_Files_jsx/Navbar"
import Checkout from "./Components/Main_Files_jsx/checkout"
import PlaceOrder from "./Components/Main_Files_jsx/placeorder"

const App = () => {
  return (
    <CartProvider>
      <div className="Main">
        <Navbar_Route /> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<div className="no-style"><Products /></div>} />
          <Route path="/singleproduct/:id" element={<div className="no-style"><Single_product /></div>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App