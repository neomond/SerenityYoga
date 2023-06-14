import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React from 'react';
import SvgLogo from '../../assets/Logo';

export const OnboardingStepTwo = ({
  userData,
  handleInputChange,
  handlePreviousStep,
  handleNextStep,
}: any) => {
  return (
    <View>
      <View style={styles.tinyLogo}>
        <SvgLogo fontSize={24} />
      </View>
      <Text style={styles.secondaryContent}>What's your activity level?</Text>
      <View style={styles.thirdContent}>
        <TextInput
          placeholder="Name"
          style={styles.step1field}
          value={userData.name}
          onChangeText={value => handleInputChange('name', value)}
        />
        {/* <TextInput
          placeholder="Name"
          style={styles.step1field}
          value={userData.name}
          onChangeText={value => handleInputChange('name', value)}
        /> */}
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
    rowGap: 100,
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
    // marginTop: '100%',
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
