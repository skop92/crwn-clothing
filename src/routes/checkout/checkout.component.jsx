import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

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
    <CheckoutContainer>
      <CheckoutHeader>
        {headers.map((header, index) => (
          <HeaderBlock key={`header-${index}`}>
            <span>{header}</span>
          </HeaderBlock>
        ))}
      </CheckoutHeader>
      {cartItems.map((item, index) => (
        <CheckoutItem key={`item-${index}`} cartItem={item} />
      ))}
      <Total>Total: ${totalCost}</Total>
    </CheckoutContainer>
  )
}

export default Checkout;
