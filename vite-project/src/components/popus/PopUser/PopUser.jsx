import React from 'react';
import {
  PopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  PopUserSetBtn,
} from './PopUser.styled';

export const PopUser = ({ onClose, onExitClick }) => {
  return (
    <PopUserSet id="popUserSet">
      <PopUserSetName>Ivan Ivanov</PopUserSetName>
      <PopUserSetMail>ivan.ivanov@gmail.com</PopUserSetMail>
      <PopUserSetTheme>
        <p>Темная тема</p>
        <input type="checkbox" />
      </PopUserSetTheme>
      <PopUserSetBtn
        onClick={() => {
          onClose();
          onExitClick();
        }}
      >
        Выйти
      </PopUserSetBtn>
    </PopUserSet>
  );
};