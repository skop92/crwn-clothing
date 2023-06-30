import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart
} from '../../store/cart/cart.action';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseColumn,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

type CheckoutItemProps = {
  cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const increaseHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const decreaseHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseColumn>{name}</BaseColumn>
      <Quantity>
        <Arrow onClick={decreaseHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseColumn>${price}</BaseColumn>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;
