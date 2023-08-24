import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {OtpStackNavigator} from './OtpStack';
import {OnboardingStackNavigator} from './OnboardingStack';

type AuthenticationStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPwd: undefined;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPwd"
        component={OtpStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
