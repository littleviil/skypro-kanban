import styled from "styled-components";
import { theme } from "../../../themes";

export const PopExitPage = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const PopExitContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const PopExitBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.modalBg || '#ffffff'};
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.borderColor || '#d4dbe5'};
  box-shadow: 0px 4px 67px -12px ${({ theme }) => theme.popupShadow || 'rgba(0, 0, 0, 0.13)'};
  transition: background-color 0.3s;

  @media only screen and (max-width: 375px) {
    padding: 50px 20px;
  }
`;

export const PopExitTtl = styled.div`
  h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textColor || '#000000'};
  }
`;

export const PopExitFormGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 375px) {
    display: block;
  }
`;

export const PopExitYes = styled.button`
  width: 153px;
  height: 30px;
  background-color: ${theme.primaryButtonColor};
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  margin-right: 10px;

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }

  &:hover {
    background-color: ${theme.hoverBgColor};
  }
`;

export const PopExitNo = styled.button`
  width: 153px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid ${({ theme }) => theme.textColor || theme.primaryButtonColor};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.textColor || theme.primaryButtonColor};

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
  }
`;