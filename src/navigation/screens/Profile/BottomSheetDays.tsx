import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomSheetDays = ({selectedDays, handleSelectDays}: any) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.bottomsheetDaysWrapper}>
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={
            selectedDays.includes(index + 1)
              ? styles.bottomsheetDayBtnAct
              : styles.bottomsheetDayBtn
          }
          onPress={() => handleSelectDays(index + 1)}>
          <Text
            style={
              selectedDays.includes(index + 1)
                ? styles.bottomsheetDayTextAct
                : styles.bottomsheetDayText
            }>
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomsheetDaysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    alignItems: 'center',
    columnGap: 10,
    rowGap: 15,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  bottomsheetDayBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    width: 60,
  },
  bottomsheetDayText: {
    color: '#909090',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomsheetDayBtnAct: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#815cff',
    borderColor: '#815cff',
    width: 60,
  },
  bottomsheetDayTextAct: {
    color: '#f5f5f5',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BottomSheetDays;
