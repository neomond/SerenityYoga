import React, {useMemo} from 'react';
import {Calendar} from 'react-native-calendars';

export const ProfileCalendar = ({activeDays}: {activeDays: number[]}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const markedDates = useMemo(() => {
    const newMarkedDates: {[date: string]: any} = {};

    for (let i = currentDay; i <= 31; i++) {
      const date = new Date(currentYear, currentMonth - 1, i);
      const dateString = date.toISOString().split('T')[0];

      if (activeDays.includes(i - currentDay + 1)) {
        newMarkedDates[dateString] = {marked: true};
      } else {
        newMarkedDates[dateString] = {};
      }
    }

    const currentDateString = currentDate.toISOString().split('T')[0];
    newMarkedDates[currentDateString] = {selected: true, marked: true};

    return newMarkedDates;
  }, [activeDays, currentYear, currentMonth, currentDay]);

  return (
    <Calendar
      markedDates={markedDates}
      markingType="dot"
      markingColor="#815cff"
      theme={{
        arrowColor: '#815cff',
        todayTextColor: '#000',
        selectedDayBackgroundColor: '#815cff',
      }}
      enableSwipeMonths={true}
    />
  );
};

export default ProfileCalendar;
