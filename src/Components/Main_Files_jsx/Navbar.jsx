import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "./cart_context";
// import "../CSS_Styles/navbar.css";

function Navbar_Route() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="navbar">
      {/* <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart" className="position-relative">
        🛒 Cart
        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
          {totalItems}
        </span>
      </NavLink>
      <NavLink to="/">Logout</NavLink> */}
    </div>
  );
}

export default Navbar_Route;
