import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import SvgLogo from '../../../assets/Logo';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import SvgArrDown from '../../../assets/ArrowDown';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {setOnboardingData} from '../../../redux/slices/OnboardingSlice';

export const OnboardingStepThree = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const onboardingData = useSelector((state: RootState) => state.onboarding);

  const [weight, setWeight] = useState(onboardingData.weight || '');
  const [height, setHeight] = useState(onboardingData.height || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    onboardingData.birthdate ? new Date(onboardingData.birthdate) : null,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');

  const handleDateChange = (event: Event, date?: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      console.log('Selected Date:', date.toISOString());
    }
    setShowDatePicker(false);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleContinue = () => {
    if (weight && height && selectedDate) {
      const formattedDate = selectedDate.toISOString();
      dispatch(setOnboardingData({weight, height, birthdate: formattedDate}));
      navigation.navigate('HomeMain');
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleWeightChange = (text: string) => {
    setWeight(text);
    setError('');
    console.log('Weight:', text);
  };

  const handleHeightChange = (text: string) => {
    setHeight(text);
    setError('');
    console.log('Height:', text);
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
    setError('');
    console.log('Date picker opened');
  };
  return (
    <LinearGradient
      colors={['#68C3F6', '#70ADFB', '#739DFD', '#85AEFE']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeMain')}
        style={styles.skipOnbMain}>
        <Text style={styles.skipOnbText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.primaryContent}>
        <View>
          <View style={styles.tinyLogo}>
            <SvgLogo fontSize={24} />
          </View>
          <Text style={styles.secondaryContent}>
            Please, tell us more about yourself
          </Text>
          <View style={styles.thirdContent}>
            {showDatePicker && <TouchableOpacity onPress={closeDatePicker} />}
            <View>
              {selectedDate && !showDatePicker ? null : (
                <View style={styles.agePickerIcon}>
                  <SvgArrDown />
                </View>
              )}
              {showDatePicker ? (
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
              ) : (
                <TouchableOpacity
                  onPress={handleDatePress}
                  style={styles.agePicker}>
                  <Text>
                    {selectedDate ? selectedDate.toDateString() : 'Age'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              placeholder="Weight / kg"
              style={styles.step1field}
              value={weight}
              onChangeText={handleWeightChange}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Height / cm"
              style={styles.step1field}
              value={height}
              onChangeText={handleHeightChange}
              keyboardType="numeric"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.step1btns}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextBtn} onPress={handleContinue}>
                <Text style={styles.textColor}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  secondaryContent: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 80 : 50,
  },
  primaryContent: {
    rowGap: 8,
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 18,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  skipOnbMain: {marginBottom: 15, marginRight: 25, alignItems: 'flex-end'},
  skipOnbText: {color: '#fff', fontWeight: '400', fontSize: 16},
  thirdContent: {
    rowGap: 20,
  },
  step1field: {
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingLeft: 15,
  },
  step1btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginTop: Platform.OS === 'ios' ? '63%' : '50%',
  },
  nextBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 12,
    width: 150,
    backgroundColor: '#815CFF',
    borderColor: '#815CFF',
    alignItems: 'center',
  },
  textColor: {
    color: '#fff',
    fontWeight: '500',
  },
  backBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 12,
    width: 150,
    alignItems: 'center',
  },
  tinyLogo: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  agePicker: {
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  agePickerIcon: {
    position: 'absolute',
    right: 15,
    top: 18,
    zIndex: 1,
  },
  errorText: {
    color: 'tomato',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: -35,
  },
});
