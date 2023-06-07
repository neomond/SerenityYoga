import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Onboarding = () => {
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

  const OnboardingStepOne = () => {
    return (
      <View>
        <Text style={styles.secondaryContent}>Hey, What's your name?</Text>
        <View style={styles.thirdContent}>
          <TextInput
            placeholder="Name"
            style={styles.step1field}
            value={userData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <View style={styles.step1btns}>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
              <Text style={styles.textColor}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const OnboardingStepTwo = () => {
    return (
      <View>
        <Text style={styles.secondaryContent}>Hey, What's your name?</Text>
        <View style={styles.thirdContent}>
          <TextInput
            placeholder="Name"
            style={styles.step1field}
            value={userData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <TextInput
            placeholder="Name"
            style={styles.step1field}
            value={userData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <View style={styles.step1btns}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={handlePreviousStep}>
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

  const OnboardingStepThree = () => {
    return (
      <View>
        <Text style={styles.secondaryContent}>Hey, What's your name?</Text>
        <View style={styles.thirdContent}>
          <TextInput
            placeholder="Name"
            style={styles.step1field}
            value={userData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <TextInput
            placeholder="Name"
            style={styles.step1field}
            value={userData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <TextInput
            placeholder="Name"
            style={styles.step1field}
            value={userData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <View style={styles.step1btns}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={handlePreviousStep}>
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

  const renderStepFour = () => {
    // gather data
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return OnboardingStepOne();
      case 2:
        return OnboardingStepTwo();
      case 3:
        return OnboardingStepThree();
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
      <View style={styles.primaryContent}>{renderStep() as any}</View>
    </LinearGradient>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 100,
  },
  primaryContent: {
    paddingHorizontal: 20,
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingBottom: 200,
    flexDirection: 'column',
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
    // marginTop: '100%',
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
