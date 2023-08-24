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

export const OnboardingStepOne = ({navigation}: any) => {
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
        <View style={styles.onboardingStep1Container}>
          <View style={styles.tinyLogo}>
            <SvgLogo fontSize={24} />
          </View>
          <Text style={styles.secondaryContent}>Hey, What's your name?</Text>
          <View style={styles.thirdContent}>
            <TextInput
              placeholder="Name"
              style={styles.step1field}
              // value={userData.name}
              // onChangeText={value => handleInputChange('name', value)}
            />
            <View style={styles.step1btns}>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => navigation.navigate('OnboardingStepTwo')}>
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
