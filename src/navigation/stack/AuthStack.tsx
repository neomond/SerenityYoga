import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Onboarding from '../screens/Onboarding';
import HomeScreen from '../screens/HomeScreen';

type AuthenticationStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* <Stack.Screen
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
        component={Onboarding}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
