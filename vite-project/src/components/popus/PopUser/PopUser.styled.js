import styled from 'styled-components';

export const PopUserSet = styled.div`
font-family: 'Roboto', Arial, Helvetica, sans-serif;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 60px;
  right: 0;
  width: 200px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10000;
`;

export const PopUserSetName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 10px;
`;

export const PopUserSetMail = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
`;

export const PopUserSetTheme = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

  p {
    font-size: 14px;
    color: #000000;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 40px;
    height: 20px;
    background: #ddd;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: 0.2s;
    }

    &:checked {
      background: #007bff;
    }

    &:checked:before {
      left: 22px;
    }
  }
`;

export const PopUserSetBtn = styled.button`
  width: 72px;
  padding: 10px;
  border-radius: 5px;
  background: #ffffff;
  color: #565EEF;
  border: 1px solid #565EEF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
`;