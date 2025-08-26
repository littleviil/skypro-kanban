import React from 'react';
import { MainColumn, ColumnTitle } from './Column.styled';
import { Cards } from '../Card/Card.styled';
import { Card } from '../Card/Card';

export const Column = ({ status, onBrowseClick, tasks = [], statusMap }) => {
  const filteredTasks = tasks.filter(
    (task) => task.statusApi === statusMap[status]
  );

  return (
    <MainColumn>
      <ColumnTitle>
        <p>{status}</p>
      </ColumnTitle>
      <Cards>
        {filteredTasks.map((task, index) => (
          <Card key={task.id ?? task._id ?? index} task={task} onBrowseClick={onBrowseClick} />
        ))}
      </Cards>
    </MainColumn>
  );
};

export default Column;