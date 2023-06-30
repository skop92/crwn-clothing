import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

export type DirectoryItemType = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
}

type DirectoryItemProps = {
  directory: Omit<DirectoryItemType, "id">;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ directory }) => {
  const { title, imageUrl, route } = directory;
  const navigate = useNavigate();
  const navigateToHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={navigateToHandler}>
      <BackgroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;
