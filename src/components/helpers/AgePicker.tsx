import React, {useState} from 'react';
import {TextInput, View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AgePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const AgePicker: React.FC<AgePickerProps> = ({value, onChange}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleAgeChange = (event: Event, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const currentDate: string = selectedDate.toISOString().split('T')[0];
      onChange(currentDate);
    }
  };

  const showAgePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(value)}
          mode="date"
          display="default"
          onChange={handleAgeChange}
        />
      )}
      <TextInput
        placeholder="Age"
        value={value ? value.toString() : ''}
        onFocus={showAgePicker}
        keyboardType="numeric"
        editable={false} // Disable manual editing of age
      />
    </View>
  );
};

export default AgePicker;
