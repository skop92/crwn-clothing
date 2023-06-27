import { CategoryItem } from '../categories/category.types';
import {
  CART_ACTION_TYPES,
  CartItem,
} from './cart.types';

import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  };

  return [...cartItems, { ...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => (
  cartItems.filter(item => item.id !== productToClear.id)
);

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart =
  (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
  };

export const removeItemFromCart =
  (cartItems: CartItem[], productToRemove: CartItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
  };

export const clearItemFromCart =
  (cartItems: CartItem[], productToClear: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return setCartItems(newCartItems);
  };

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);
