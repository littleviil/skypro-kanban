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
import { Hover01, Hover03 } from '../../../App.styled';

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
              <PopExitYes as={Hover01} id="exitYes">
                <a href="modal/signin.html">Да, выйти</a>
              </PopExitYes>
              <PopExitNo as={Hover03} id="exitNo">
                <a href="main.html">Нет, остаться</a>
              </PopExitNo>
            </PopExitFormGroup>
          </form>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitPage>
  );
};