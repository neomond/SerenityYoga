import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SvgLogo from '../../../assets/Logo';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux';
import {sendOtp} from '../../../redux/slices/AuthSlice';
import {useState} from 'react';

export const OTPStepOne = ({navigation}: any) => {
  console.log('Rendering OTPStepOne');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSendOtp = async () => {
    if (!email) {
      setError('Email field is required');
      return;
    }
    try {
      console.log('Sending OTP for email:', email);
      const sendOtpParams = {email};
      const response: any = await dispatch(sendOtp(sendOtpParams));

      console.log('Response from sendOtp:', response);
      if (response.payload.errors && response.payload.errors.length > 0) {
        setError('Email not found in the database');
      } else {
        setError('');
        navigation.navigate('OtpSecond', {email});
      }
    } catch (err) {
      console.log('Error sending OTP:', err);
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
            <Text style={styles.secondaryContent}>Forgot Password</Text>
            <Text style={styles.textSecondary}>
              Enter your email so we can send you a password
            </Text>
            <TextInput
              placeholder="Email"
              style={styles.step1field}
              value={email}
              onChangeText={setEmail}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View style={styles.step1btns}>
            <TouchableOpacity style={styles.nextBtn} onPress={handleSendOtp}>
              <Text style={styles.textColor}>Send a code</Text>
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
    marginBottom: 20,
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
    marginTop: 5,
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
  errorText: {
    color: 'tomato',
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 15,
    marginTop: -10,
  },
});
