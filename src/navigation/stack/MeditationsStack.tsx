import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MeditationsScreen from '../screens/MeditationsScreen';
import MeditationsCollectionScreen from '../screens/MeditationsCollectionScreen';
import MeditationsPlayerScreen from '../screens/MeditationsPlayerScreen';

type MeditationsStackParamList = {
  MeditationsMain: undefined;
  MeditationsCollection: undefined;
  MeditationsPlayer: undefined;
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
      <MeditationsStack.Screen
        name="MeditationsCollection"
        component={MeditationsCollectionScreen}
        options={{headerShown: false}}
      />
      <MeditationsStack.Screen
        name="MeditationsPlayer"
        component={MeditationsPlayerScreen}
        options={{headerShown: false}}
      />
    </MeditationsStack.Navigator>
  );
};
