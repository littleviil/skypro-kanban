import styled from 'styled-components';
import { themes } from '../../themes';

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;

  ${({ theme }) => `
    background-color: ${themes[theme].background};
    color: ${themes[theme].color};
  `}

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;