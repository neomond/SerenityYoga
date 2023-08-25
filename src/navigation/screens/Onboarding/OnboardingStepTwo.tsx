import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import React, {useState} from 'react';
import SvgLogo from '../../../assets/Logo';
import {RadioButton} from '../../../components/helpers/radiobuttons';
import LinearGradient from 'react-native-linear-gradient';
import {AppDispatch} from '../../../redux';
import {useDispatch} from 'react-redux';
import {setOnboardingData} from '../../../redux/slices/OnboardingSlice';

export const OnboardingStepTwo = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedOption, setSelectedOption] = useState<any>('');
  const [error, setError] = useState('');

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
    setError('');
  };

  const handleContinue = () => {
    if (selectedOption) {
      console.log('Selected option:', selectedOption);
      dispatch(setOnboardingData({activityLevel: selectedOption}));
      navigation.navigate('OnboardingStepThree');
    } else {
      setError('Please select an option.');
    }
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
            <SvgLogo />
          </View>
          <Text style={styles.secondaryContent}>
            What's your activity level?
          </Text>
          <View style={styles.thirdContent}>
            <View style={{rowGap: 15}}>
              <View style={styles.radioBtnWrapper}>
                <Text style={styles.radioText}>
                  Very Active (daily exercise)
                </Text>
                <RadioButton
                  selected={selectedOption === 'option1'}
                  onPress={() => handleOptionChange('option1')}
                />
              </View>
              <View style={styles.radioBtnWrapper}>
                <Text style={styles.radioText}>
                  Active (exercise 3 times a week)
                </Text>
                <RadioButton
                  selected={selectedOption === 'option2'}
                  onPress={() => handleOptionChange('option2')}
                />
              </View>
              <View style={styles.radioBtnWrapper}>
                <Text style={styles.radioText}>
                  Intermittent (exercise once a week)
                </Text>
                <RadioButton
                  selected={selectedOption === 'option3'}
                  onPress={() => handleOptionChange('option3')}
                />
              </View>
              <View style={styles.radioBtnWrapper}>
                <Text style={styles.radioText}>Not at all</Text>
                <RadioButton
                  selected={selectedOption === 'option4'}
                  onPress={() => handleOptionChange('option4')}
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

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
    rowGap: Platform.OS === 'ios' ? 90 : 40,
  },
  step1field: {
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingLeft: 15,
  },
  step1btns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  nextBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#815CFF',
    borderColor: '#815CFF',
    alignItems: 'center',
  },
  textColor: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  backBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  tinyLogo: {
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  radioBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f6f6',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  radioText: {fontSize: 16, fontWeight: '400'},
  errorText: {
    color: 'tomato',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: -35,
  },
});
