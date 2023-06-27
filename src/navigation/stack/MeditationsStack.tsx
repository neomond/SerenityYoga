import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MeditationsScreen from '../screens/MeditationsScreen';

type MeditationsStackParamList = {
  MeditationsMain: undefined;
};

const MeditationsStack =
  createNativeStackNavigator<MeditationsStackParamList>();

export const MeditationsStackNavigator: React.FC = () => {
  return (
    <MeditationsStack.Navigator>
      <MeditationsStack.Screen
        name="MeditationsMain"
        component={MeditationsScreen}
        options={{headerShown: false}}
      />
    </MeditationsStack.Navigator>
  );
};
