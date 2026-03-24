import React, { useContext } from "react";
import { CartContext } from "./cart_context";
import { Link } from "react-router-dom";
import "../CSS_Styles/checkout.css";

function Checkout() {
  const { cart } = useContext(CartContext);

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {cart.length === 0 ? (
        <div className="checkout-empty">Your cart is empty</div>
      ) : (
        <>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.title} × {item.qty} = ${(item.price * item.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-actions">
            <Link to="/placeorder" className="place-order-btn">Place Order</Link>
            <Link to="/cart" className="back-to-cart">← Back to Cart</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
