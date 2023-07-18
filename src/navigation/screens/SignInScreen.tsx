import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgFacebook from '../../assets/Facebook';
import SvgGoogle from '../../assets/Google';
import {Auth} from '../../models/Auth';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/slices/AuthSlice';
import {AppDispatch} from '../../redux';
import {Formik} from 'formik';
import {signInSchema, signInInitialValues} from '../../schema/authSchema';
import SvgViewEye from '../../assets/ViewEyeIcon';
import SvgHideEye from '../../assets/HideEyeIcon';
import SvgLogo from '../../assets/Logo';

const SignInScreen = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //const token = useSelector((state: RootState) => state.authSlice.token);

  const handleSignIn = (values: any) => {
    const {email, password} = values;
    const user: Auth = {
      email,
      password,
      confirmPassword: '',
    };

    dispatch(loginUser(user))
      .unwrap()
      .then(() => {
        navigation.navigate('HomeMain');
      })
      .catch((error: any) => {
        console.log('Login failed:', error);
        setError('User not found');
      });
  };

  // By using the .unwrap() method after dispatching the loginUser action,
  // you can access the fulfilled value of the action, or
  // catch any rejected value (in this case, the error from the server).
  // Inside the catch block, you can handle the rejected login request appropriately,
  // such as displaying an error message to the user or performing any other necessary actions.

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#8866ff', '#a177f8', '#c47afb', '#d287fe']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <Formik
          initialValues={signInInitialValues}
          validationSchema={signInSchema}
          onSubmit={handleSignIn}>
          {formik => (
            <View style={styles.primaryContent}>
              <View style={styles.tinyLogo}>
                <SvgLogo fontSize={24} />
              </View>
              <Text style={styles.primaryText}>Welcome!</Text>
              <Text style={styles.secondaryText}>
                Do not have an account yet?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpBtn}>Sign up</Text>
              </TouchableOpacity>
              <View>
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
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.togglePwdStyles}>
                    {showPassword ? <SvgViewEye /> : <SvgHideEye />}
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPwd')}>
                <Text style={styles.forgotPasswordBtn}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={formik.handleSubmit}
                style={[styles.signInBtn, {backgroundColor: '#8866ff'}]}>
                <Text style={styles.labelText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.borderContainer}>
                <View style={styles.border} />
                <Text style={styles.borderText}>Or With</Text>
                <View style={styles.border} />
              </View>
              <TouchableOpacity
                style={[styles.signInBtn, {backgroundColor: '#1977f2'}]}
                onPress={() => navigation.navigate('Onboarding')}>
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

export default SignInScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 80,
  },
  primaryContent: {
    flex: 1,
    alignItems: 'center',
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 35,
    paddingBottom: 110,
  },
  tinyLogo: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  primaryText: {
    fontSize: 28,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#bbbbbb',
    fontWeight: '500',
  },
  signUpBtn: {
    color: '#8866ff',
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 20,
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
  forgotPasswordBtn: {
    marginTop: 5,
    marginLeft: '60%',
    marginBottom: 20,
  },
  signInBtn: {
    marginBottom: 8,
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
});

//   const formik = useFormik({
//     initialValues: signInInitialValues,
//     validationSchema: signInSchema,
//     onSubmit: values => {
//       const user: Auth = {
//         email: values.email,
//         password: values.password,
//         confirmPassword: undefined,
//       };
//       dispatch(loginUser(user));
//       navigation.navigate('Onboarding');
//     },
//   });
