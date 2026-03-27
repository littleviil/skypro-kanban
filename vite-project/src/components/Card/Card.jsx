import React, { useContext } from 'react';
import { taskCategories } from '../../tasks';
import { ThemeContext } from '../../context/ThemeContext';
import { darkCategoryThemes, themes } from '../../themes';
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
  const { isDark } = useContext(ThemeContext);
  const categoryKey = task.topic || "Без категории";
  const colorKey = taskCategories[categoryKey] || 'gray';
  const categoryColor = isDark ? darkCategoryThemes[colorKey] || darkCategoryThemes.gray : colorKey;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id ?? task.id);
    e.dataTransfer.setData("taskStatus", task.status);
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  return (
    <CardsItem
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardsCard>
        <CardGroup>
          <CardTheme $category={categoryColor}>
            <p className={`_${task.topic}`}>{task.topic}</p>
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
