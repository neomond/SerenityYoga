import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SvgLogo from '../../../assets/Logo';
import {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const OTPStepTwo = ({navigation, route}: any) => {
  const [otp, setOtp] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [otpError, setOtpError] = useState('');

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

  const handleContinue = () => {
    const {email} = route.params;
    const enteredOtp = otp;

    const expectedOtp = route.params.otpCode;

    console.log('successsssssssss');
    console.log('Received OTP code:', enteredOtp);

    if (enteredOtp === expectedOtp) {
      navigation.navigate('OtpThird', {email, otpCode: enteredOtp});
    } else {
      setOtpError('Entered OTP is incorrect.');
    }
  };

  return (
    <LinearGradient
      colors={['#F7C076', '#FCAE7A', '#FCA879', '#FEB790']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.primaryContent}>
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
            {otpError && <Text style={styles.errorText}>{otpError}</Text>}
          </View>
          <View style={styles.step1btns}>
            <TouchableOpacity style={styles.nextBtn} onPress={handleContinue}>
              <Text style={styles.textColor}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  step1Container: {
    flex: 1,
  },
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
  errorText: {
    color: 'tomato',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
