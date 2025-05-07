import { createGlobalStyle } from 'styled-components';

const GlobalAuthStyles = createGlobalStyle`
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #EAEEF6;
  }

  .modal {
    background: #FFFFFF;
    padding: 50px 60px;
    border-radius: 10px;
    box-shadow: 0 4px 67px -12px rgba(0, 0, 0, 0.13);
    border: 0.7px solid #D4DBE5;
    width: 100%;
    max-width: 368px;
    height: 329px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #565EEF;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 368px;
    height: 329px;
  }

  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-wrapper {
    width: 248px;
  }

  .auth-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #94A6BE66;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    height: 30px;
    box-sizing: border-box;
  }

  .auth-input::placeholder {
    color: #94A6BE66;
    opacity: 1;
  }

  .auth-input:focus {
    outline: none;
    border-color: #565EEF;
    color: #565EEF;
    border: 1px solid #94A6BE66;
  }

  .auth-input:focus::placeholder {
    color: transparent;
  }

  .auth-input.error {
    border-color: #ff0000;
    color: #ff0000;
  }

  .auth-input.error::placeholder {
    color: #ff0000;
    opacity: 1;
  }

  .button-enter {
    width: 248px;
    background-color: #565EEF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    height: 30px;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .button-enter:hover {
    background-color: #565EEF;
  }

  .error {
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
  }

  .form-group {
    margin-top: 20px;
    text-align: center;
  }

  .form-group p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    color: #94A6BE66;
  }

  .form-group a {
    color:#94A6BE66;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
  }

  .form-group a:hover {
    text-decoration: underline;
  }
`;

export default GlobalAuthStyles;