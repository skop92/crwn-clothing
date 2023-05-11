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

const changeQuantity = (cartItems, product, change) => {
  return cartItems.map((cartItem) => {
    if (cartItem.id === product.id) {
      let qt = cartItem.quantity + change;
      if (qt <= 0) qt = 1;
      return { ...cartItem, quantity: qt}
    } else {
      return cartItem;
    }
  })
}

const clearCartItem = (cartItems, productToClear) => (
  cartItems.filter(item => item.id !== productToClear.id)
)

const countItems = (cartItems) => (
  cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
)

const countTotalCost = (cartItems) => (
  cartItems.reduce((totalCost, item) => totalCost + (item.price * item.quantity), 0)
)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemCount: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearItemFromCart: () => {},
  totalCost: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(countTotalCost(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setItemCount(countItems(cartItems));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
  const increaseQuantity = (product) => setCartItems(changeQuantity(cartItems, product, 1));
  const decreaseQuantity = (product) => setCartItems(changeQuantity(cartItems, product, -1));
  const clearItemFromCart = (productToClear) => setCartItems(clearCartItem(cartItems, productToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    itemCount,
    increaseQuantity,
    decreaseQuantity,
    clearItemFromCart,
    totalCost
  };

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}
