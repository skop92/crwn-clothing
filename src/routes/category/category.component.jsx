import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

const Category = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products && /* Safe guard from mapping an empty array. It's empty since it's async */
          products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </Fragment>
  )
}

export default Category;
