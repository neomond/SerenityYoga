import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PracticesScreen from '../screens/PracticesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PracticePreviewScreen from '../screens/PracticePreviewScreen';
import PracticeVideoScreen from '../screens/PracticeVideoScreen';
import PracticesCollectionScreen from '../screens/PracticeCollectionScreen';

type PracticesStackParamList = {
  PracticesMain: undefined;
  PracticeCollection: undefined;
  Settings: undefined;
  PracticePreview: undefined;
  PracticeVideo: undefined;
};

const PracticesStack = createNativeStackNavigator<PracticesStackParamList>();

export const PracticesStackNavigator: React.FC = () => {
  return (
    <PracticesStack.Navigator>
      <PracticesStack.Screen
        name="PracticesMain"
        component={PracticesScreen}
        options={{headerShown: false}}
      />
      <PracticesStack.Screen
        name="PracticeCollection"
        component={PracticesCollectionScreen}
        options={{headerShown: false}}
      />
      <PracticesStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <PracticesStack.Screen
        name="PracticePreview"
        component={PracticePreviewScreen}
        options={{headerShown: false}}
      />
      <PracticesStack.Screen
        name="PracticeVideo"
        component={PracticeVideoScreen}
        options={{headerShown: false}}
      />
    </PracticesStack.Navigator>
  );
};
