import React from 'react';
import {
  PopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  PopUserSetBtn,
} from './PopUser.styled';

const PopUser = ({ onClose, onExitClick }) => {
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