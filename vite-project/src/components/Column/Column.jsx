import React from 'react';
import { MainColumn, ColumnTitle } from './Column.styled';
import { Cards } from '../Card/Card.styled';
import { Card } from '../Card/Card';

export const Column = ({ status, onBrowseClick, tasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <MainColumn>
      <ColumnTitle>
        <p>{status}</p>
      </ColumnTitle>
      <Cards>
        {filteredTasks.map((task) => (
          <Card key={task.id} task={task} onBrowseClick={onBrowseClick} />
        ))}
      </Cards>
    </MainColumn>
  );
};

export default Column;