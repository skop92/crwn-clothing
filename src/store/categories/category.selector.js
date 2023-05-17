import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// This does not run the callback if selectCategoryReducer has not changed
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
