import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrawnLogo } from '../../assets/crown.svg';
import { CartContext } from '../../contexts/cart.context';
// import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';

import { NavContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx';

const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser)
  const { isCartOpen } = useContext(CartContext);

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
            (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (
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
