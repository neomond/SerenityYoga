import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgFacebook from '../../assets/Facebook';
import SvgGoogle from '../../assets/Google';
import {Auth} from '../../models/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/slices/AuthSlice';
import {AppDispatch, RootState} from '../../redux';
import {Formik} from 'formik';
import {signInSchema, signInInitialValues} from '../../schema/authSchema';

const SignInScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  //const token = useSelector((state: RootState) => state.authSlice.token);

  const handleSignIn = (values: any) => {
    const {email, password} = values;
    const user: Auth = {
      email,
      password,
      confirmPassword: '',
    };

    dispatch(loginUser(user)).then(() => {
      navigation.navigate('Home');
    });
  };

  return (
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
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
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
              onPress={() => navigation.navigate('Register')}>
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
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 100,
  },
  primaryContent: {
    alignItems: 'center',
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingBottom: 200,
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
