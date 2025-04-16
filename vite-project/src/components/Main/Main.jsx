import React from 'react';
import { MainPage, MainBlock } from './Main.styled';
import { Container } from '../../App.styled';
import { Column } from '../Column/Column';

export const Main = ({ onBrowseClick }) => {
  const statuses = [
    'Без статуса',
    'Нужно сделать',
    'В работе',
    'Тестирование',
    'Готово',
  ];

  return (
    <MainPage>
      <Container>
        <MainBlock>
          {statuses.map((status, index) => (
            <Column key={index} status={status} onBrowseClick={onBrowseClick} />
          ))}
        </MainBlock>
      </Container>
    </MainPage>
  );
};

export default Main;