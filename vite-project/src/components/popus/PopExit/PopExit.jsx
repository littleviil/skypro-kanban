import React from 'react';
import {
  PopExitPage,
  PopExitContainer,
  PopExitBlock,
  PopExitTtl,
  PopExitFormGroup,
  PopExitYes,
  PopExitNo,
} from './PopExit.styled';

export const PopExit = ({ onClose, onLogout }) => {
  return (
    <PopExitPage id="popExit">
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTtl>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTtl>
          <form id="formExit" action="#">
            <PopExitFormGroup>
              <PopExitYes id="exitYes" onClick={(e) => { e.preventDefault(); onLogout(); onClose(); }}>
                <a href="#">Да, выйти</a>
              </PopExitYes>
              <PopExitNo id="exitNo" onClick={(e) => { e.preventDefault(); onClose(); }}>
                <a href="#">Нет, остаться</a>
              </PopExitNo>
            </PopExitFormGroup>
          </form>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitPage>
  );
};