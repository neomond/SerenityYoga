import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

type HomeStackParamList = {
  HomeScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
