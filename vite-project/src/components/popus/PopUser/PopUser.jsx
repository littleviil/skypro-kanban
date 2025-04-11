import React from 'react';
import {
  PopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
} from './PopUser.styled';
import { Hover03 } from '../../../App.styled';

export const PopUser = ({ onClose }) => {
  return (
    <PopUserSet id="user-set-target">
      <PopUserSetName>Ivan Ivanov</PopUserSetName>
      <PopUserSetMail>ivan.ivanov@gmail.com</PopUserSetMail>
      <PopUserSetTheme>
        <p>Темная тема</p>
        <input type="checkbox" name="checkbox" />
      </PopUserSetTheme>
      <button type="button" as={Hover03} onClick={onClose}>
        Закрыть
      </button>
    </PopUserSet>
  );
};