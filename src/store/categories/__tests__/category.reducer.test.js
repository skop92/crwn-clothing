import {
  categoriesReducer,
  CATEGORIES_INITIAL_STATE,
} from '../category.reducer';

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from '../category.action';

describe('Category reducer tests', () => {
  test('fetchCategoriesStart', () => {
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    }

    expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart()))
      .toEqual(expectedState)
  })

  test('fetchCategoriesSuccess', () => {
    const mockData = [
      {
        title: 'mens',
        items: [
          { id: 1, name: 'Test product 1' },
          { id: 2, name: 'Test product 2' },
        ],
      },
      {
        title: 'womens',
        items: [
          { id: 3, name: 'Test product 3' },
          { id: 4, name: 'Test product 4' },
        ],
      },
    ]

    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    }

    expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData)))
      .toEqual(expectedState)
  })

  test('fetchCategoriesFailed', () => {
    const mockError = new Error('Fetching categories failed')

    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      error: mockError,
    }

    expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError)))
    .toEqual(expectedState)
  })
})