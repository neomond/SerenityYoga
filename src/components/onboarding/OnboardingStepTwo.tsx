import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import SvgLogo from '../../assets/Logo';
import {RadioButton} from '../helpers/radiobuttons';

export const OnboardingStepTwo = ({
  userData,
  handleInputChange,
  handlePreviousStep,
  handleNextStep,
}: any) => {
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <View>
      <View style={styles.tinyLogo}>
        <SvgLogo />
      </View>
      <Text style={styles.secondaryContent}>What's your activity level?</Text>
      <View style={styles.thirdContent}>
        <View style={{rowGap: 15}}>
          <View style={styles.radioBtnWrapper}>
            <Text style={styles.radioText}>Very Active (daily exercise)</Text>
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
        </View>
        <View style={styles.step1btns}>
          {/* <TouchableOpacity style={styles.backBtn} onPress={handlePreviousStep}>
            <Text>Back</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
            <Text style={styles.textColor}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryContent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  thirdContent: {
    rowGap: 35,
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
    width: 150,
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
});
