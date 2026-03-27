import { createGlobalStyle } from 'styled-components';

const GlobalAuthStyles = createGlobalStyle`
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${({ theme }) => theme.bg || '#EAEEF6'};
    transition: background-color 0.3s;
  }

  .modal {
    background: ${({ theme }) => theme.modalBg || '#FFFFFF'};
    padding: 50px 60px;
    border-radius: 10px;
    box-shadow: 0 4px 67px -12px ${({ theme }) => theme.popupShadow || 'rgba(0, 0, 0, 0.13)'};
    border: 0.7px solid ${({ theme }) => theme.borderColor || '#D4DBE5'};
    transition: background-color 0.3s;
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
    color: ${({ theme }) => theme.textColor || '#333'};
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
    border: 1px solid ${({ theme }) => theme.borderColor || '#94A6BE66'};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    height: 30px;
    box-sizing: border-box;
    background: ${({ theme }) => theme.inputBg || '#FFFFFF'};
    color: ${({ theme }) => theme.textColor || '#000000'};
  }

  .auth-input::placeholder {
    color: #94A6BE66;
    opacity: 1;
  }

  .auth-input:focus {
    outline: none;
    border-color: #94A6BE66;
    color: #000000;
    border: 1px solid #94A6BE66;
  }

  .auth-input:focus::placeholder {
    color: transparent;
  }

  .auth-input.error {
    border-color: #F84D4D;
    color: #F84D4D;
  }

  .auth-input.error::placeholder {
    color: #F84D4D;
    opacity: 1;
  }

  .error-message {
    position: absolute;
    top: 100%;
    left: 0;
    color: #F84D4D;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    margin-top: 5px;
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

  .button-enter:disabled {
    background-color: #94A6BE; 
    cursor: not-allowed;
    opacity: 0.6;
  }

  .button-enter:hover:not(:disabled) {
    background-color: #565EEF;
  }

  .error {
    color: #F84D4D;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    text-align: center;
    width: 248px;
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