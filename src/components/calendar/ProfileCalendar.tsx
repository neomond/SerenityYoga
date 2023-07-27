import React, {useMemo} from 'react';
import {Calendar} from 'react-native-calendars';

export const ProfileCalendar = ({activeDays}: {activeDays: number[]}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Memoize the marked dates to avoid unnecessary re-renders
  const markedDates = useMemo(() => {
    const newMarkedDates: {[date: string]: any} = {};

    for (let i = 1; i <= 31; i++) {
      const date = new Date(currentYear, currentMonth - 1, i);
      const dateString = date.toISOString().split('T')[0];
      newMarkedDates[dateString] = {};

      if (activeDays.includes(i)) {
        newMarkedDates[dateString] = {marked: true};
      }
    }

    const currentDateString = currentDate.toISOString().split('T')[0];
    newMarkedDates[currentDateString] = {selected: true, marked: true};

    return newMarkedDates;
  }, [activeDays]);

  return (
    <Calendar
      markedDates={markedDates}
      markingType="dot"
      markingColor="#f5f5f5"
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
