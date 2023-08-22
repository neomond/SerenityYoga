import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SvgLogo from '../../assets/Logo';
import {useRef, useState} from 'react';

export const OTPStepTwo = ({
  userData,
  handleInputChange,
  handleNextStep,
}: any) => {
  const [otp, setOtp] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    setOtp(prevOtp => {
      const otpArray = prevOtp.split('');
      otpArray[index] = value;
      return otpArray.join('');
    });

    if (index < 3 && value !== '') {
      const nextIndex = index + 1;
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <View style={styles.step1Container}>
      <View style={styles.tinyLogo}>
        <SvgLogo fontSize={24} />
      </View>
      <View style={{marginTop: 100}}>
        <Text style={styles.secondaryContent}>Enter Code</Text>
        <Text style={styles.textSecondary}>
          Enter the code we sent you by email
        </Text>
        <View style={styles.container}>
          <TextInput
            ref={ref => (inputRefs.current[0] = ref)}
            style={styles.input}
            maxLength={1}
            value={otp[0]}
            onChangeText={value => handleOtpChange(0, value)}
            keyboardType="numeric"
          />
          <TextInput
            ref={ref => (inputRefs.current[1] = ref)}
            style={styles.input}
            maxLength={1}
            value={otp[1]}
            onChangeText={value => handleOtpChange(1, value)}
            keyboardType="numeric"
          />
          <TextInput
            ref={ref => (inputRefs.current[2] = ref)}
            style={styles.input}
            maxLength={1}
            value={otp[2]}
            onChangeText={value => handleOtpChange(2, value)}
            keyboardType="numeric"
          />
          <TextInput
            ref={ref => (inputRefs.current[3] = ref)}
            style={styles.input}
            maxLength={1}
            value={otp[3]}
            onChangeText={value => handleOtpChange(3, value)}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.step1btns}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => handleNextStep(otp)}>
          <Text style={styles.textColor}>Continue</Text>
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
    color: '#979797',
    fontSize: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    columnGap: 5,
    paddingBottom: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 20,
  },
});
