import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

import { ReactComponent as CrawnLogo } from '../../assets/crown.svg';

import { NavContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavContainer>
        <LogoContainer to='/'>
          <CrawnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ?
            (<NavLink as='span' onClick={handleSignOut}>SIGN OUT</NavLink>) : (
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
