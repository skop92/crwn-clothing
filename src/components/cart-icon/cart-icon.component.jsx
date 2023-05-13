import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext);
  
  const dropdownToggler = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={dropdownToggler}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;
