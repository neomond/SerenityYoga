import React, {useState} from 'react';
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BirthdayPicker: React.FC<{
  handleInputChange: (field: string, value: string) => void;
  selectedDate: Date | undefined;
  style?: object;
}> = ({handleInputChange, selectedDate, style}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  //   const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      handleInputChange('birthdate', date.toISOString());
    }
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Pressable onPress={handleShowDatePicker}>
        <Text>Age</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          style={styles.step1field}
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default BirthdayPicker;

const styles = StyleSheet.create({
  step1field: {
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingLeft: 15,
  },
});
