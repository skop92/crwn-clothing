import { call } from 'typed-redux-saga/macro';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';

import { fetchCategoriesFailed, fetchCategoriesSuccess } from '../category.action';

import {
  fetchCategoriesAsync,
  onFetchCategories,
  categoriesSaga,
} from '../category.saga';

import { CATEGORY_ACTION_TYPES } from '../category.types';

describe('Category saga tests', () => {
  test('categoriesSaga', () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  })

  test('onFetchCategories', () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  })

  test('fetchCategoriesAsync success', () => {
    const mockCategoriesArray = [
      { id: 3, name: 'Test category 3' },
      { id: 4, name: 'Test category 4' },
    ]

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .run()
  })

  test('fetchCategoriesAsync failure', () => {
    const mockError = new Error('ErrRror')

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
      .put(fetchCategoriesFailed(mockError))
      .run()
  })
})
