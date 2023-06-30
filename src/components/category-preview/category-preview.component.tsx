import { FC } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';
import { Category } from '../../store/categories/category.types';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

type CategoryPreviewProps = Omit<Category, "imageUrl">

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, items }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link to={title}>
          <Title>
            {title.toUpperCase()}
          </Title>
        </Link>
      </h2>
      <Preview>
        {
          items
            .filter((_, idx) => idx < 4) /* element/item is not needed to filter, just index */
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;
