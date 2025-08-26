import React from 'react';
import { taskCategories } from '../../tasks';
import {
  CardsItem,
  CardsCard,
  CardGroup,
  CardTheme,
  CardBtn,
  CardContent,
  CardTitle,
  CardDate,
} from './Card.styled';

export const Card = ({ task, onBrowseClick }) => {
  const categoryKey = task.categoryUi || "Без категории";
  const categoryColor = taskCategories[categoryKey] || 'gray';
  console.log(task);

  return (
    <CardsItem>
      <CardsCard>
        <CardGroup>
          <CardTheme theme={categoryColor}>
            <p>{categoryKey}</p>
          </CardTheme>
          <CardBtn onClick={() => onBrowseClick(task)}>
            <div></div><div></div><div></div>
          </CardBtn>
        </CardGroup>
        <CardContent>
          <CardTitle as="h3">{task.title}</CardTitle>
          <CardDate>
            <p>
              {task.date
                ? new Date(task.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })
                : ''}
            </p>
          </CardDate>
        </CardContent>
      </CardsCard>
    </CardsItem>
  );
};

export default Card;
