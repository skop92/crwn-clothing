import { FC } from 'react';

import { CartItemContainer, ItemDetails, Name } from './cart-item.styles';
import { CartItem as CartItemType} from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>{quantity} x ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;
