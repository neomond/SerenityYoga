import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export const OnboardingStepOne = ({
  userData,
  handleInputChange,
  handleNextStep,
}: any) => {
  return (
    <View style={styles.onboardingStep1Container}>
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
    paddingBottom: 50,
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
    marginTop: '100%',
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
  },
});
