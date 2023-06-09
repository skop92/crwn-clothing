import { createSelector } from 'reselect';

import { RootState } from '../store';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

// Initial selector
const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

// Memoi selector
// This does not run the callback if selectCategoryReducer has not changed
const selectCategories = createSelector(
  [selectCategoryReducer], // Input selector
  (categoriesSlice) => categoriesSlice.categories // Output selector
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

/*
When selectCategoriesMap is evaluated (in useSelector hook) it first checks,
if selectCategories has changed. That similarly triggers selectCategories to check,
if selectCategoryReducer (categories part of Redux store) gives a different output.

That means every time useSelector hook is triggered, initial selector runs.
If selectCategories (Memoi selector) does not find any changes in its input,
it doesn't run its output selector, but returns cached value of the output's
previous run.

Finally selectCategoriesMap may behave the same way. If its input hasn't changed,
it returns cached output, which means the useSelector will not cause its
component to re-render.


*/