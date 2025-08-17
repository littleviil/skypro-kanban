import React, { useState } from 'react';
import {
  CalendarPage,
  CalendarTtl,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  CalendarPeriod,
  CalendarP,
  DateControl,
} from './Calendar.styled';
import { Subttl } from '../../App.styled';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const Calendar = ({ value, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(value || Date.now()));

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

  const days = [];
  const firstDay = startOfMonth.getDay() || 7;
  let dayCounter = 1 - (firstDay - 1);

  for (let i = 0; i < 42; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayCounter);
    days.push(date);
    dayCounter++;
  }

  const handlePrev = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (date) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <CalendarPage>
      <CalendarTtl as={Subttl}>Даты</CalendarTtl>
      <CalendarBlock>
        <CalendarNav>
          <CalendarMonth>{format(currentMonth, 'LLLL yyyy', { locale: ru })}</CalendarMonth>
          <NavActions>
            <NavAction onClick={handlePrev}>&lt;</NavAction>
            <NavAction onClick={handleNext}>&gt;</NavAction>
          </NavActions>
        </CalendarNav>
        <CalendarContent>
          <CalendarDaysNames>
            {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day) => (
              <CalendarDayName key={day}>{day}</CalendarDayName>
            ))}
          </CalendarDaysNames>
          <CalendarCells>
            {days.map((date, idx) => {
              const isOtherMonth = date.getMonth() !== currentMonth.getMonth();
              const isActive = value && format(date, 'dd.MM.yyyy') === format(value, 'dd.MM.yyyy');
              return (
                <CalendarCell
                  key={idx}
                  $otherMonth={isOtherMonth}
                  $active={isActive}
                  onClick={() => handleSelectDate(date)}
                >
                  {date.getDate()}
                </CalendarCell>
              );
            })}
          </CalendarCells>
        </CalendarContent>
        <CalendarPeriod>
          <CalendarP className="date-end">
            Срок исполнения:{' '}
            <DateControl>
              {value ? format(value, 'dd.MM.yy') : '—'}
            </DateControl>
          </CalendarP>
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarPage>
  );
};

export default Calendar;