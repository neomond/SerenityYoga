import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import SvgLogo from '../../assets/Logo';

export const OnboardingStepOne = ({
  userData,
  handleInputChange,
  handleNextStep,
}: any) => {
  return (
    <View style={styles.onboardingStep1Container}>
      <View style={styles.tinyLogo}>
        <SvgLogo fontSize={24} />
      </View>
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

const styles = StyleSheet.create({
  onboardingStep1Container: {
    // marginTop: 40,
  },
  secondaryContent: {
    textAlign: 'center',
    fontSize: 22,
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
    marginTop: Platform.OS === 'ios' ? '80%' : '65%',
  },
  nextBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 15,
    width: 250,
    backgroundColor: '#815CFF',
    borderColor: '#815CFF',
    alignItems: 'center',
  },
  textColor: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  tinyLogo: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
