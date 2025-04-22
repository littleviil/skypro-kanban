import styled from 'styled-components';

export const MainColumn = styled.div`
  width: 344px;
  margin-right: 30px;
  padding-right: 19px;
  &:last-child {
    margin-right: 0;
  }
`;

export const ColumnTitle = styled.div`
  margin-bottom: 30px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  p {
    color: #94A6BE;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }
`;