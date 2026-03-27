import styled from 'styled-components';

export const MainColumn = styled.div`
  width: 344px;
  margin-right: 20px;
  min-height: 200px;

  &:last-child {
    margin-right: 0;
  }
`;

export const ColumnTitle = styled.div`
  margin-bottom: 20px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  p {
    color: ${({ theme }) => theme.textSecondary || '#94A6BE'};
    font-size: 14px;
    font-weight: 600;
    line-height: 100%;
  }
`;