import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import SvgLogo from '../../assets/Logo';
import AgePicker from '../helpers/AgePicker';

export const OnboardingStepThree = ({
  userData,
  handleInputChange,
  handlePreviousStep,
  handleNextStep,
}: any) => {
  const [age, setAge] = useState<string>('');
  const handleAgeChange = (value: string) => {
    setAge(value);
  };
  return (
    <View>
      <View style={styles.tinyLogo}>
        <SvgLogo fontSize={24} />
      </View>
      <Text style={styles.secondaryContent}>
        Please, tell us more about yourself
      </Text>
      <View style={styles.thirdContent}>
        {/* <AgePicker value={age} onChange={handleAgeChange} /> */}
        <AgePicker value={age} onChange={handleAgeChange} />

        <TextInput
          placeholder="Weight"
          style={styles.step1field}
          value={userData.name}
        />
        <TextInput
          placeholder="Height"
          style={styles.step1field}
          value={userData.name}
          keyboardType="numeric"
        />
        <View style={styles.step1btns}>
          <TouchableOpacity style={styles.backBtn} onPress={handlePreviousStep}>
            <Text>Back</Text>
          </TouchableOpacity>
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
    marginTop: '50%',
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
});
