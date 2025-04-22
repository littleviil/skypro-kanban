import styled from 'styled-components';
import { theme } from '../../themes';

export const HeaderPage = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const HeaderLogo = styled.div`
  img {
    width: 85px;
  }
`;

export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderBtnMainNew = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${theme.primaryButtonColor};
  color: #fff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${theme.hoverBgColor};
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
 }
`;

export const HeaderUser = styled.a`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${theme.primaryButtonColor};

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-left: 1.5px solid #000;
    border-bottom: 1.5px solid #000;
    transform: rotate(-45deg);
    margin-left: 8px;
    margin-top: 2px;
  }

  &:hover {
    color: ${theme.hoverBgColor};

    &::after {
      border-left-color: ${theme.hoverBgColor};
      border-bottom-color: ${theme.hoverBgColor};
    }
  }
  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
 }
`;