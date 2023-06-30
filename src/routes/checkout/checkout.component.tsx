import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectCartTotal);
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
      <PaymentForm />
    </CheckoutContainer>
  )
}

export default Checkout;
