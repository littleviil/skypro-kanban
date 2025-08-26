import React, { useState, useEffect } from 'react';
import { MainPage, MainBlock } from './Main.styled';
import { Container } from '../../App.styled';
import { Column } from '../Column/Column';

export const Main = ({ tasks, loading, onBrowseClick }) => {
  const [showContent, setShowContent] = useState(false);
  const statuses = [
    'Без статуса',
    'Нужно сделать',
    'В работе',
    'Тестирование',
    'Готово',
  ];

  const statusMap = {
    'Без статуса': 'no-status',
    'Нужно сделать': 'todo',
    'В работе': 'in-progress',
    'Тестирование': 'testing',
    'Готово': 'done',
  };


  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [loading]);


  if (loading || !showContent) return <p></p>;

  return (
    <MainPage>
      <Container>
        <MainBlock>
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              onBrowseClick={onBrowseClick}
              tasks={tasks}
              statusMap={statusMap}
            />
          ))}
        </MainBlock>
      </Container>
    </MainPage>
  );
};

export default Main;