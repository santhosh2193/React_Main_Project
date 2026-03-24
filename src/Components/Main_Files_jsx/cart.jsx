import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart_context";
import '../CSS_Styles/cart.css'

function Cart() {
  const { cart, addToCart, decrementFromCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒Your Cart</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">No items in cart</div>
      ) : (
        <>
          <div className="cart-items-grid">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                {item.image && <img className="cart-item-image" src={item.image} alt={item.title} />}
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button className="qty-btn" onClick={() => decrementFromCart(item.id)}>-</button>
                  <span className="qty-count">{item.qty}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Grand total</span>
            <span>${cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}</span>
          </div>
        </>
      )}

      <div className="cart-total">
          <span>Grand total</span>
          <span>${cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}</span>
    </div>

    <div className="cart-bottom-controls">
        <Link to="/checkout" className="checkout-button">Proceed to Checkout →</Link><br />
        <h1> </h1>
        <h1>&nbsp;</h1>
        <Link to="/products" className="back-button">← Back to Products</Link>
    </div>


    </div>
  );
}

export default Cart;
