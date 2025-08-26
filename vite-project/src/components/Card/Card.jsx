import React from 'react';
import { taskCategories } from '../../tasks';
import {
  CardsItem, CardsCard, CardGroup, CardTheme, CardBtn, CardContent, CardTitle, CardDate,
} from './Card.styled';

export const Card = ({ task, onBrowseClick }) => {
  console.log(task);
  const getCategoryKey = (topic) => {
    if (!topic) return "Без категории";
    const normalized = topic.trim().toLowerCase();
    switch (normalized) {
      case "web design": return "Web Design";
      case "research": return "Research";
      case "copywriting": return "Copywriting";
      default: return "Без категории";
    }
  };

  const categoryKey = getCategoryKey(task.topic);
  const categoryColor = taskCategories[categoryKey] || 'gray';
  console.log(task);

  return (
    <CardsItem>
      <CardsCard>
        <CardGroup>
          <CardTheme theme={categoryColor}>
            <p>{task.topic}</p>
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
