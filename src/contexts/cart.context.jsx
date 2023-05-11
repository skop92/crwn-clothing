import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    )
  }
  return [...cartItems, { ...productToAdd, quantity: 1}];
}

const countItems = (cartItems) => (
  cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  useEffect(() => {
    setItemCount(countItems(cartItems))
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, itemCount };

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}
