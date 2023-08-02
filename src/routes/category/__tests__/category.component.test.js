import { screen } from '@testing-library/react';

import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test/test.utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  })
}))

describe('Category tests', () => {
  test('Should render Spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    })

    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toBeInTheDocument()
  })

  test('Should render products and not spinner if isLoading is false', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                { id: 1, name: 'Test product 1' },
                { id: 2, name: 'Test product 2' },
              ],
            },
          ],
        },
      },
    })

    const spinnerElement = screen.queryByTestId('spinner')
    expect(spinnerElement).toBeNull()

    const productElement = screen.getByText(/test product 1/i)
    expect(productElement).toBeInTheDocument()
  })
})
