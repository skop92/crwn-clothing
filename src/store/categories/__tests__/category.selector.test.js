import {
  selectCategories,
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../category.selector';

const mockState = {
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
      {
        title: 'womens',
        items: [
          { id: 3, name: 'Test product 3' },
          { id: 4, name: 'Test product 4' },
        ],
      },
    ]
  }
}

describe('Category selectors', () => {
  test('selectCategories should return categoriesData', () => {
    const categoriesSlice = selectCategories(mockState)
    expect(categoriesSlice).toEqual(mockState.categories.categories)
  })

  test('selectCategoriesIsLoading should return isLoading state', () => {
    const isLoading = selectCategoriesIsLoading(mockState)
    expect(isLoading).toEqual(false)
  })

  test('selectCategoriesMap should convert the items array into the appropriate map', () => {
    const expectedCategoriesMap = {
      mens: [
        { id: 1, name: 'Test product 1' },
        { id: 2, name: 'Test product 2' },
      ],
      womens: [
        { id: 3, name: 'Test product 3' },
        { id: 4, name: 'Test product 4' },
      ]
    }
    const categoriesMap = selectCategoriesMap(mockState)
    expect(categoriesMap).toEqual(expectedCategoriesMap)
  })
})
