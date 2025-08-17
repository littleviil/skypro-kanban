import React, { useEffect, useState } from 'react';
import {
  PopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  PopUserSetBtn,
} from './PopUser.styled';

const PopUser = ({ onClose, onExitClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('name') || 'Пользователь');
    setEmail(localStorage.getItem('email') || 'неизвестно');
  }, []);

  return (
    <PopUserSet id="popUserSet">
      <PopUserSetName>{name}</PopUserSetName>
      <PopUserSetMail>{email}</PopUserSetMail>
      <PopUserSetTheme>
        <p>Темная тема</p>
        <input type="checkbox" />
      </PopUserSetTheme>
      <PopUserSetBtn
        onClick={() => {
          onExitClick();
          onClose();
        }}
      >
        Выйти
      </PopUserSetBtn>
    </PopUserSet>
  );
};

export default PopUser;
