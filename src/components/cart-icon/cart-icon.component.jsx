import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as CartBagIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext);
  
  const dropdownToggler = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container' onClick={dropdownToggler}>
      <CartBagIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  )
}

export default CartIcon;
