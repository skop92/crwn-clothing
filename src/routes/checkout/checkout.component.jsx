import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, totalCost } = useContext(CartContext);
  const headers = [
    'Product',
    'Description',
    'Quantity',
    'Price',
    'Remove',
  ];

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        {headers.map((header, index) => (
          <div>
            <span key={`header-${index}`} className='header-block'>{header}</span>
          </div>
        ))}
      </div>
      {cartItems.map((item, index) => (
        <CheckoutItem key={`item-${index}`} cartItem={item} />
      ))}
      <div className='total'>Total: ${totalCost}</div>
    </div>
  )
}

export default Checkout;
