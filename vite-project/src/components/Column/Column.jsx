import React from 'react';
import { MainColumn, ColumnTitle } from './Column.styled';
import { Cards } from '../Card/Card.styled';
import { Card } from '../Card/Card';
import { tasks } from '../../tasks';

export const Column = ({ status }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <MainColumn>
      <ColumnTitle>
        <p>{status}</p>
      </ColumnTitle>
      <Cards>
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            title={task.title}
            category={task.category}
            date={task.date}
          />
        ))}
      </Cards>
    </MainColumn>
  );
};