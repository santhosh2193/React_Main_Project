import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decrementFromCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (!existing) return prev;

      if (existing.qty <= 1) {
        return prev.filter((item) => item.id !== productId);
      }

      return prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decrementFromCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
