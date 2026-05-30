import React from "react";
import {
  PopExitPage,
  PopExitContainer,
  PopExitBlock,
  PopExitTtl,
  PopExitFormGroup,
  PopExitYes,
  PopExitNo,
} from "./PopExit.styled";

const PopExit = ({ isOpen, onClose, onLogout }) => {
  return (
    <PopExitPage $isOpen={isOpen}>
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTtl>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTtl>
          <PopExitFormGroup>
            <PopExitYes onClick={onLogout}>Да</PopExitYes>
            <PopExitNo onClick={onClose}>Нет</PopExitNo>
          </PopExitFormGroup>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitPage>
  );
};

export default PopExit;