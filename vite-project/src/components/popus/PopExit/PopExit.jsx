import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  PopExitPage,
  PopExitContainer,
  PopExitBlock,
  PopExitTtl,
  PopExitFormGroup,
  PopExitYes,
  PopExitNo,
} from "./PopExit.styled";

const PopExit = ({ isOpen, onClose }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <PopExitPage $isOpen={isOpen}>
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTtl>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTtl>
          <PopExitFormGroup>
            <PopExitYes onClick={handleLogout}>Да</PopExitYes>
            <PopExitNo onClick={onClose}>Нет</PopExitNo>
          </PopExitFormGroup>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitPage>
  );
};

export default PopExit;