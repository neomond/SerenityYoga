import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgFacebook from '../../assets/Facebook';
import SvgGoogle from '../../assets/Google';
import {AppDispatch, RootState} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {Auth} from '../../models/Auth';
import {signupUser} from '../../redux/slices/AuthSlice';
import {signUpInitialValues, signUpSchema} from '../../schema/authSchema';
import {useState} from 'react';
import SvgViewEye from '../../assets/ViewEyeIcon';
import SvgHideEye from '../../assets/HideEyeIcon';
import SvgLogo from '../../assets/Logo';
import SvgCheckBoxFill from '../../assets/CheckBoxiconFilled';
import SvgCheckBox from '../../assets/CheckBoxicon';

const SignUpScreen = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  //for password secure entry

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.authSlice.error);

  //for password secure entry
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // terms & conditions
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = (values: any) => {
    const {email, password, confirmPassword} = values;
    const user: Auth = {
      email,
      password,
      confirmPassword,
    };
    dispatch(signupUser(user))
      .unwrap()
      .then((data: any) => {
        console.log('Signup successful:', data);
        navigation.navigate('Onboarding');
      })
      .catch((error: any) => {
        console.log('Signup failed:', error);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#8866ff', '#a177f8', '#c47afb', '#d287fe']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <Formik
          initialValues={signUpInitialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}>
          {formik => (
            <View style={styles.primaryContent}>
              <View style={styles.tinyLogo}>
                <SvgLogo fontSize={24} />
              </View>
              <Text style={styles.primaryText}>Welcome!</Text>
              <Text style={styles.secondaryText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signUpBtn}>Sign in</Text>
              </TouchableOpacity>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text style={styles.errorText}>{formik.errors.email}</Text>
                )}
                {error && <Text style={styles.errorText}>{error.error}</Text>}
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Text style={styles.errorText}>
                      {formik.errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.togglePwdStyles}>
                    {showPassword ? <SvgViewEye /> : <SvgHideEye />}
                  </TouchableOpacity>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    value={formik.values.confirmPassword}
                    onChangeText={formik.handleChange('confirmPassword')}
                    onBlur={formik.handleBlur('confirmPassword')}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {formik.errors.confirmPassword}
                      </Text>
                    )}
                  <TouchableOpacity
                    onPress={toggleConfirmPasswordVisibility}
                    style={styles.togglePwdStyles}>
                    {showConfirmPassword ? <SvgViewEye /> : <SvgHideEye />}
                  </TouchableOpacity>
                </View>
                <View style={styles.checkboxContainer}>
                  <View style={styles.privacyTextCont}>
                    <Pressable onPress={handleToggle}>
                      {isChecked ? (
                        <>
                          <Text style={styles.selectedItem}>✓</Text>
                          <SvgCheckBoxFill />
                        </>
                      ) : (
                        <SvgCheckBox />
                      )}
                    </Pressable>
                    <Text style={styles.checkboxLabel}>I agree with</Text>
                    <Text>Privacy&Policy</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={formik.handleSubmit}
                style={[styles.signInBtn, {backgroundColor: '#8866ff'}]}>
                <Text style={styles.labelText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.borderContainer}>
                <View style={styles.border} />
                <Text style={styles.borderText}>Or With</Text>
                <View style={styles.border} />
              </View>
              <TouchableOpacity
                style={[styles.signInBtn, {backgroundColor: '#1977f2'}]}>
                <SvgFacebook style={{marginRight: 50}} />
                <Text style={styles.labelTextSocial}>Login With Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.signInBtn,
                  {backgroundColor: '#fff', borderWidth: 0.5},
                ]}
                onPress={() => navigation.navigate('Register')}>
                <SvgGoogle style={{marginRight: 60}} />
                <Text style={styles.labelTextSocialSecond}>
                  Login With Google
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </LinearGradient>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 80 : 30,
  },
  tinyLogo: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  primaryContent: {
    alignItems: 'center',
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 35,
    paddingBottom: 40,
  },
  primaryText: {
    fontSize: 28,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#bbbbbb',
    fontWeight: '400',
    fontSize: 16,
  },
  signUpBtn: {
    color: '#8866ff',
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 10,
  },
  input: {
    width: 355,
    height: 55,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  inputs: {
    marginBottom: 20,
  },
  forgotPasswordBtn: {
    marginTop: 5,
    marginLeft: '60%',
    marginBottom: 20,
  },
  signInBtn: {
    marginBottom: Platform.OS === 'ios' ? 8 : 3,
    width: 355,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
  labelText: {
    color: '#fff',
    fontWeight: '500',
  },
  labelTextSocial: {
    marginRight: 80,
    color: '#fff',
    fontWeight: '500',
  },
  labelTextSocialSecond: {
    marginRight: 85,
    fontWeight: '500',
  },
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 20,
  },
  border: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#bbbbbb',
  },
  borderText: {
    color: '#bbbbbb',
    marginHorizontal: 8,
    marginBottom: 5,
  },
  errorText: {
    color: 'tomato',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 15,
  },
  togglePwdStyles: {
    position: 'absolute',
    top: 28,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginTop: 12,
  },
  checkboxLabel: {
    color: '#585858',
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DADADA',
  },
  privacyTextCont: {flexDirection: 'row', columnGap: 4, alignItems: 'center'},
  checkboxItem: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    marginBottom: 12,
  },
  selectedItem: {
    position: 'absolute',
    left: 7,
    top: Platform.OS === 'ios' ? 3 : 1,
    zIndex: 999,
    color: '#fff',
  },
});
