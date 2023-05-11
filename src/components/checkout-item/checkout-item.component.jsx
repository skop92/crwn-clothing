import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  const { increaseQuantity, decreaseQuantity, clearItemFromCart } = useContext(CartContext);

  const increaseHandler = () => increaseQuantity(cartItem);
  const decreaseHandler = () => decreaseQuantity(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <span className='arrow' onClick={decreaseHandler}>&#10094;</span>
        <span className='value'>{quantity}</span>
        <span className='arrow' onClick={increaseHandler}>&#10095;</span>
      </span>
      <span className='price'>${price}</span>
      <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem;
