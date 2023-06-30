import styled from 'styled-components';
import { Link, LinkProps, To } from 'react-router-dom';
import { FC } from 'react';

// type NavLinkProps = {
//   as?: string;
//   to?: string;
// } & LinkHTMLAttributes<LinkProps>;
// & AnchorHTMLAttributes<LinkProps>; // Somehow works as well

// type NavLinkProps = Omit<LinkHTMLAttributes<HTMLAnchorElement>, "to"> & {to?: To}
type NavLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
  as?: string;
}

export const NavContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink: FC<NavLinkProps> = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`
  