import React, {useState, useEffect} from 'react';
import {Calendar} from 'react-native-calendars';

export const ProfileCalendar = ({activeDays}: {activeDays: number[]}) => {
  const [markedDates, setMarkedDates] = useState<{[date: string]: any}>({});

  useEffect(() => {
    const generateMarkedDates = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const newMarkedDates: {[date: string]: any} = {};
      for (let i = 1; i <= 31; i++) {
        // Loop through all days of the month
        const date = new Date(currentYear, currentMonth - 1, i);
        const dateString = date.toISOString().split('T')[0];
        newMarkedDates[dateString] = {};

        // Mark the active days
        if (activeDays.includes(i)) {
          newMarkedDates[dateString] = {marked: true};
        }
      }

      // Mark the current day as selected and marked
      const currentDateString = currentDate.toISOString().split('T')[0];
      newMarkedDates[currentDateString] = {selected: true, marked: true};

      setMarkedDates(newMarkedDates);
    };

    generateMarkedDates();
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
