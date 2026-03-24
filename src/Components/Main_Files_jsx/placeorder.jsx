import React from "react";
import { Link } from "react-router-dom";
import "../CSS_Styles/placeorder.css";

function PlaceOrder() {
  return (
    <div className="placeorder-page">
      <h2 className="placeorder-title">Order Placed Successfully 🎉</h2>
      <p className="placeorder-message">
        Thank you for shopping with us! Your order has been confirmed.
      </p>

      <div className="placeorder-actions">
        <Link to="/products" className="continue-shopping">
          ← Continue Shopping
        </Link>
        <Link to="/cart" className="view-cart">
          View Cart
        </Link>
      </div>
    </div>
  );
}

export default PlaceOrder;
