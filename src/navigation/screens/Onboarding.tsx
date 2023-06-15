import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {OnboardingStepOne} from '../../components/onboarding/OnboardingStepOne';
import {OnboardingStepTwo} from '../../components/onboarding/OnboardingStepTwo';
import {OnboardingStepThree} from '../../components/onboarding/OnboardingStepThree';

const Onboarding = ({navigation}: any) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    goal: '',
    age: '',
    weight: '',
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleInputChange = (field: any, value: any) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const renderStepFour = () => {
    // gather data
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStepOne
            userData={userData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <OnboardingStepTwo
            userData={userData}
            handleInputChange={handleInputChange}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <OnboardingStepThree
            userData={userData}
            handleInputChange={handleInputChange}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      case 4:
        return renderStepFour();
      default:
        return null;
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
        style={{marginBottom: 15, marginRight: 25, alignItems: 'flex-end'}}>
        <Text style={styles.textColor}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.primaryContent}>{renderStep() as any}</View>
    </LinearGradient>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 80,
  },
  primaryContent: {
    paddingHorizontal: 18,
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingBottom: 200,
    flexDirection: 'column',
    height: '100%',
  },
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
  },
  backBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 12,
    width: 150,
    alignItems: 'center',
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
});
