import React, {useState} from 'react';
import {
  View,
  Button,
  TextInput,
  Platform,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({value, onChange}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || value;
    setShowPicker(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <Pressable onPress={showDatepicker}>
        <Text style={{left: 10, top: 0, zIndex: 100000}}>Age</Text>

        <TextInput
          placeholder="Age"
          style={styles.step1field}
          value={value?.toLocaleDateString() || ''}
          editable={false}
        />
        {showPicker && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </Pressable>
    </View>
  );
};

export default DatePicker;
const styles = StyleSheet.create({
  step1field: {
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingLeft: 15,
  },
});
