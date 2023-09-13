import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AuthStack from './AuthStack';

type ProfileStackParamList = {
  Profile: undefined;
  AuthMain: undefined;
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
        name="AuthMain"
        component={AuthStack}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};
