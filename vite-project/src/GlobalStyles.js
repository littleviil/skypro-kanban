import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #EAEEF6
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    color: #000000;
  }
  
  ._hover01:hover {
    background-color: ${theme.hoverBgColor};
  }

  ._hover03:hover {
    background-color: ${theme.hoverBgColor};
    color: #FFFFFF;

    a {
      color: #FFFFFF;
    }
  }

  ._orange {
    background-color: #FFE4C2;
    color: #FF6D00;
  }

  ._green {
    background-color: #B4FDD1;
    color: #06B16E;
  }

  ._purple {
    background-color: #E9D4FF;
    color: #9A48F1;
  }

  ._gray {
    background: #94A6BE;
    color: #FFFFFF;
  }

  ._active-category {
    opacity: 1 !important;
  }
`;

export default GlobalStyles;