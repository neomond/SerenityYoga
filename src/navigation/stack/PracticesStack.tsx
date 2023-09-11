import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PracticesScreen from '../screens/Practices/PracticesScreen';
import PracticePreviewScreen from '../screens/Practices/PracticePreviewScreen';
import PracticesCollectionScreen from '../screens/Practices/PracticeCollectionScreen';

type PracticesStackParamList = {
  PracticesMain: undefined;
  PracticeCollection: undefined;
  Settings: undefined;
  PracticePreview: undefined;
};

const PracticesStack = createNativeStackNavigator<PracticesStackParamList>();

export const PracticesStackNavigator: React.FC = () => {
  return (
    <PracticesStack.Navigator screenOptions={{headerShown: false}}>
      <PracticesStack.Screen
        name="PracticesMain"
        component={PracticesScreen}
        options={{headerShown: false}}
      />
      <PracticesStack.Screen
        name="PracticeCollection"
        component={PracticesCollectionScreen}
        options={{
          headerShown: false,
          // animation: 'slide_from_bottom',
          presentation: 'modal',
          // ...Platform.select({
          //   android: {
          //     animation: 'slide_from_bottom',
          //     tabBarVisible: false,
          //   },
          //   ios: {
          //     // presentation: 'modal',
          //     animation: 'slide_from_bottom',
          //     tabBarVisible: false,
          //   },
          // }),
        }}
      />
      <PracticesStack.Screen
        name="PracticePreview"
        component={PracticePreviewScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </PracticesStack.Navigator>
  );
};
