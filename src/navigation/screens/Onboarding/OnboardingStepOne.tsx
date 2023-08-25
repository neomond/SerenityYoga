import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import SvgLogo from '../../../assets/Logo';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux';
import {useState} from 'react';
import {setOnboardingData} from '../../../redux/slices/OnboardingSlice';

export const OnboardingStepOne = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (text: string) => {
    setName(text);
    setError('');
  };

  const handleContinue = () => {
    if (name.trim() === '') {
      setError('Please enter your name before proceeding.');
      return;
    }
    console.log('Entered Name:', name);
    dispatch(setOnboardingData({name}));

    navigation.navigate('OnboardingStepTwo');
  };

  return (
    <LinearGradient
      colors={['#68C3F6', '#70ADFB', '#739DFD', '#85AEFE']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeMain')}
        style={styles.skipOnbMain}>
        <Text style={styles.skipOnbText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.primaryContent}>
        <View>
          <View style={styles.tinyLogo}>
            <SvgLogo fontSize={24} />
          </View>
          <Text style={styles.secondaryContent}>Hey, What's your name?</Text>
          <View style={styles.thirdContent}>
            <TextInput
              placeholder="Name"
              style={styles.step1field}
              value={name}
              onChangeText={handleNameChange}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.step1btns}>
              <TouchableOpacity style={styles.nextBtn} onPress={handleContinue}>
                <Text style={styles.textColor}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 80 : 50,
  },
  skipOnbMain: {marginBottom: 15, marginRight: 25, alignItems: 'flex-end'},
  skipOnbText: {color: '#fff', fontWeight: '400', fontSize: 16},
  primaryContent: {
    rowGap: 8,
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 18,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },

  secondaryContent: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  thirdContent: {
    rowGap: 20,
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
    marginTop: Platform.OS === 'ios' ? '95%' : '75%',
  },
  nextBtn: {
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 15,
    width: 250,
    backgroundColor: '#815CFF',
    borderColor: '#815CFF',
    alignItems: 'center',
    marginTop: 30,
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
  errorText: {
    color: 'tomato',
    fontSize: 14,
    position: 'absolute',
    top: '19%',
    left: '12%',
  },
});
