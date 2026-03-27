import styled from 'styled-components';

export const MainPage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg || '#EAEEF6'};
  transition: background-color 0.3s;
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 40px 0 49px;
  display: flex;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const MainColumn = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;
  flex: 1;
  min-width: 250px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
`;

export const MainColumns = styled.div`
  display: flex;
  gap: 20px;
`;