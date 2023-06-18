import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {OTPStepOne} from '../../components/otp/OTPStepOne';
import {OTPStepTwo} from '../../components/otp/OTPStepTwo';
import {OTPStepThree} from '../../components/otp/OTPStepThree';

const ForgotPwdScreen = ({navigation}: any) => {
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
    navigation.navigate('HomeMain');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OTPStepOne
            userData={userData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <OTPStepTwo
            userData={userData}
            handleInputChange={handleInputChange}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <OTPStepThree
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
      colors={['#F7C076', '#FCAE7A', '#FCA879', '#FEB790']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.primaryContent}>{renderStep() as any}</View>
    </LinearGradient>
  );
};

export default ForgotPwdScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 100,
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
  skipOnbMain: {marginBottom: 15, marginRight: 25, alignItems: 'flex-end'},
  skipOnbText: {color: '#fff', fontWeight: '400', fontSize: 16},
});
