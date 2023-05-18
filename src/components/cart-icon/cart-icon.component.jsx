import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const dropdownToggler = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={dropdownToggler}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;
