import styled from 'styled-components';
import { themes, theme } from '../../themes';

export const CardsItem = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const CardsCard = styled.div`
  width: 220px;
  height: 130px;
  padding: 10px 10px 10px 14px;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  padding-bottom: 10px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => `
    background-color: ${themes[theme].background};
    color: ${themes[theme].color};
  `}

  p {
    display: contents;
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
`;

export const CardBtn = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94A6BE;
  }
`;

export const CardContent = styled.div`
  height: 71px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardTitle = styled.div`
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 13px;
    height: 13px;
    margin-right: 6px;
  }

  p {
    font-size: 10px;
    line-height: 13px;
    color: #94A6BE;
    letter-spacing: 0.2px;
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Button = styled.button`
  background-color: ${theme.primaryButtonColor};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  &:hover {
    background-color: ${theme.hoverBgColor};
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;