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
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color:#565EEF;
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
    margin-bottom: 20px;
    width: 248px;
  }

  .auth-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    height: 30px;
  }

  .auth-input:focus {
    outline: none;
    border-color:#565EEF;
  }

  .auth-input.error {
    border-color: #ff0000;
  }

  .button-enter {
    width: 248px;
    padding: 10px;
    background-color: #565EEF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

  }

  .button-enter:hover {
    background-color:#565EEF;
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
    color: #666;
  }

  .form-group a {
    color:#565EEF;
    text-decoration: none;
  }

  .form-group a:hover {
    text-decoration: underline;
  }
`;

export default GlobalAuthStyles;