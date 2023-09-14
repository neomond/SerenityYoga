import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';

type ProfileStackParamList = {
  Profile: undefined;
  Login: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Login"
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};
