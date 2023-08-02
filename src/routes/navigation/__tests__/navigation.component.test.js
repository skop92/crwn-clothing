import { screen, fireEvent } from '@testing-library/react';

import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { signOutStart } from '../../../store/user/user.action';

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

describe('Navigation tests', () => {
  test('It should render sign in and not sign out if there is no currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    })

    const signInLinkElement = screen.getByText(/sign in/i)
    expect(signInLinkElement).toBeInTheDocument()

    const signOutLinkElement = screen.queryByText(/sign out/i)
    expect(signOutLinkElement).toBeNull()
  })

  test('It should render sign out and not sign in if there is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    })

    const signOutLinkElement = screen.getByText(/sign out/i)
    expect(signOutLinkElement).toBeInTheDocument()

    const signInLinkElement = screen.queryByText(/sign in/i)
    expect(signInLinkElement).toBeNull()
  })

  test('it should render dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    })

    const cartDropdownElement = screen.getByText(/your cart is empty/i)
    expect(cartDropdownElement).toBeInTheDocument()
  })

  test('it should not render dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    })

    const cartDropdownElement = screen.queryByText(/your cart is empty/i)
    expect(cartDropdownElement).toBeNull()
  })

  test('it should dispatch signOutStart action when clicking on the Sign Out link', async () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    })

    const signOutLinkElement = screen.getByText(/sign out/i)
    expect(signOutLinkElement).toBeInTheDocument()

    await fireEvent.click(signOutLinkElement)
    expect(mockDispatch).toHaveBeenCalled()

    const signOutAction = signOutStart()
    expect(mockDispatch).toHaveBeenCalledWith(signOutAction)

    mockDispatch.mockClear()
  })
})
