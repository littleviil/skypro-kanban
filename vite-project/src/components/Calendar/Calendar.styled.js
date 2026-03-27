import styled from 'styled-components';

export const CalendarPage = styled.div`
  width: 182px;
  margin-bottom: 20px;
`;

export const CalendarTtl = styled.div`
  margin-bottom: 14px;
  padding: 0 7px;
`;

export const CalendarP = styled.p`
  color: ${({ theme }) => theme.textSecondary || '#94A6BE'};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${({ theme }) => theme.textColor || '#000000'};
  }
`;

export const DateEnd = styled(CalendarP)`
`;

export const DateControl = styled.span`
  color: ${({ theme }) => theme.textColor || '#000000'};
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarMonth = styled.div`
  color: #94A6BE;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

export const CalendarDaysNames = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const CalendarDayName = styled.div`
  color: #94A6BE;
  font-size: 10px;
  font-weight: 500;
`;

export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
`;

export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A6BE;
  font-size: 10px;
  cursor: pointer;

  ${({ $otherMonth }) => {
    if ($otherMonth) {
      return 'opacity: 0;';
    }
    return '';
  }}

  ${({ $active }) => {
    if ($active) {
      return `
        background-color: #94A6BE;
        color: #FFFFFF;
      `;
    }
    return '';
  }}

  ${({ $current }) => {
    if ($current) {
      return 'font-weight: 700;';
    }
    return '';
  }}

  &:hover {
    color: ${({ theme }) => theme.textSecondary || '#94A6BE'};
    background-color: ${({ theme }) => theme.cardHoverBg || '#EAEEF6'};
  }
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #94A6BE;
  }
`;