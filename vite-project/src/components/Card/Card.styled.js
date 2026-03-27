import styled from 'styled-components';
import { themes } from '../../themes';

export const CardsItem = styled.div`
  width: 100%;
  margin-bottom: 10px;
  cursor: grab;
  transition: opacity 0.2s;

  &:active {
    cursor: grabbing;
  }
`;

export const CardsCard = styled.div`
  width: 220px;
  height: 130px;
  padding: 10px 10px 10px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.cardBg || '#ffffff'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.cardHoverBg || '#f5f5f5'};
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
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${({ $category }) => {
    let selectedTheme = { color: '#333333' };

    if (themes) {
      if (typeof $category === 'string' && themes[$category]) {
        selectedTheme = themes[$category];
      } else if (typeof $category === 'object' && $category !== null && $category.background && $category.color) {
        selectedTheme = $category;
      }
    }

    return `
      background-color: ${selectedTheme.background};
      color: ${selectedTheme.color};
    `;
  }}

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
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
  color: ${({ theme }) => theme.textColor || '#000000'};
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
    color: ${({ theme }) => theme.textSecondary || '#94A6BE'};
    letter-spacing: 0.2px;
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;