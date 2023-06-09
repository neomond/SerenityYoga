import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SvgLogo from '../../assets/Logo';

export const OTPStepOne = ({
  userData,
  handleInputChange,
  handleNextStep,
}: any) => {
  return (
    <View style={styles.step1Container}>
      <View style={styles.tinyLogo}>
        <SvgLogo fontSize={24} />
      </View>
      <View style={{marginTop: 100}}>
        <Text style={styles.secondaryContent}>Forgot Password</Text>
        <Text style={styles.textSecondary}>
          Enter your email so we can send you a password
        </Text>

        <TextInput
          placeholder="Email"
          style={styles.step1field}
          value={userData.name}
          onChangeText={value => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.step1btns}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
          <Text style={styles.textColor}>Send a code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  step1Container: {
    flex: 1,
  },
  secondaryContent: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  thirdContent: {
    rowGap: 100,
  },
  step1field: {
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 25,
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
  tinyLogo: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  textSecondary: {
    textAlign: 'center',
    marginBottom: 35,
    color: '#979797',
    fontSize: 15,
  },
});
