import styled from 'styled-components';

export const PopUserSet = styled.div`
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 60px;
  right: 0;
  width: 213px;
  padding: 34px;
  background: ${({ theme }) => theme.popupBg || '#ffffff'};
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.borderColor || 'transparent'};
  box-shadow: 0px 10px 39px 0px ${({ theme }) => theme.popupShadow || 'rgba(0, 0, 0, 0.1)'};
  z-index: 10000;
  transition: background-color 0.3s;
`;

export const PopUserSetName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor || '#000000'};
  margin-bottom: 10px;
`;

export const PopUserSetMail = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary || '#666666'};
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
    color: ${({ theme }) => theme.textColor || '#000000'};
  }

  input[type="checkbox"] {
    appearance: none;
    width: 24px;
    height: 13px;
    background: #EAEEF6;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    outline: none;

    &:before {
      content: '';
      position: absolute;
      width: 11px;
      height: 11px;
      background-color: #565EEF;
      border-radius: 50%;
      top: 1px;
      left: 1px;
      transition: 0.5s;
    }

    &:checked:before {
      left: 12px;
    }
  }
`;

export const PopUserSetBtn = styled.button`
  width: 72px;
  height: 30px;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.textColor || '#565EEF'};
  border: 1px solid ${({ theme }) => theme.textColor || '#565EEF'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
`;