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

export const PopExit = () => {
  return (
    <PopExitPage id="popExit">
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTtl>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTtl>
          <form id="formExit" action="#">
            <PopExitFormGroup>
              <PopExitYes id="exitYes">
                <a href="modal/signin.html">Да, выйти</a>
              </PopExitYes>
              <PopExitNo id="exitNo">
                <a href="main.html">Нет, остаться</a>
              </PopExitNo>
            </PopExitFormGroup>
          </form>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitPage>
  );
};