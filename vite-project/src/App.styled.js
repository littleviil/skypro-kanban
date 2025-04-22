import { styled, css } from 'styled-components';
import { themes } from './themes';

export const hover01 = css`
        &:hover {
            background-color: ${({ theme }) => theme.hoverBgColor};
        }
   `;
   
export const hover02 = css`
        &:hover {
            color: ${({ theme }) => theme.hoverBgColor};
        }
   `;

export const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #EAEEF6;
`;

export const Loading = styled.div`
font-family: 'Roboto', Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media screen and (max-width: 495px) {
    width: 100%;
    padding: 0 16px;
  }
`;

export const Hover01 = styled.div`
  &:hover {
    background-color: #33399b;
  }
`;

export const Hover02 = styled.div`
  &:hover {
    color: #33399b;

    &::after {
      border-left-color: #33399b;
      border-bottom-color: #33399b;
    }
  }
`;

export const Hover03 = styled.div`
  &:hover {
    background-color: #33399b;
    color: #FFFFFF;

    a {
      color: #FFFFFF;
    }
  }
`;

export const ActiveCategory = styled.div`
  opacity: 1 !important;
`;

export const PopWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

export const FormNewBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormNewInput = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin: 20px 0;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94A6BE;
    letter-spacing: -0.14px;
  }
`;

export const FormNewArea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  max-width: 370px;
  margin-top: 14px;
  height: 200px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94A6BE;
    letter-spacing: -0.14px;
  }

  @media screen and (max-width: 495px) {
    max-width: 100%;
    height: 34px;
  }
`;

export const FormNewCreate = styled.button`
  width: 132px;
  height: 30px;
  background-color: #565EEF;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #FFFFFF;
  float: right;

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
  }
`;

export const Subttl = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const Categories = styled.div`
  margin-bottom: 20px;
`;

export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CategoriesP = styled.p`
  margin-bottom: 14px;
`;

export const CategoriesTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 0.4;

  ${({ theme }) => theme && `
    background-color: ${themes[theme].background};
    color: ${themes[theme].color};
  `}

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
  }
`;

export const Status = styled.div`
  margin-bottom: 11px;
`;

export const StatusP = styled.p`
  margin-bottom: 14px;
`;

export const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StatusTheme = styled.div`
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94A6BE;
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
  }
`;

export const BtnBor = styled.button`
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565EEF);
  outline: none;
  background: transparent;
  color: #565EEF;

  a {
    color: #565EEF;
  }
`;

export const BtnBg = styled.button`
  border-radius: 4px;
  background: #565EEF;
  border: none;
  outline: none;
  color: #FFFFFF;

  a {
    color: #FFFFFF;
  }
`;

export const Hide = styled.div`
  display: none;
`;

export const Dark = styled.div`
  display: none;
`;