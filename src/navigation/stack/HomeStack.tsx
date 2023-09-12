import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CategoryMoodScreen from '../screens/CategoryMoodScreen';
import PracticePreviewScreen from '../screens/Practices/PracticePreviewScreen';
import MeditationsPlayerScreen from '../screens/Meditations/MeditationsPlayerScreen';

type HomeStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  DetailsScreen: undefined;
  CategoryMoodScreen: undefined;
  MeditationsPlayer: undefined;
  PracticePreview: undefined;
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
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          // ...Platform.select({
          //   android: {
          //     animation: 'slide_from_bottom',
          //     tabBarVisible: false,
          //   },
          //   ios: {
          //     // presentation: 'modal',
          //     animation: 'slide_from_bottom',
          //   },
          // }),
        }}
      />
      <HomeStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <HomeStack.Screen
        name="MeditationsPlayer"
        component={MeditationsPlayerScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <HomeStack.Screen
        name="PracticePreview"
        component={PracticePreviewScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <HomeStack.Screen
        name="CategoryMoodScreen"
        component={CategoryMoodScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'modal',
          // ...Platform.select({
          //   android: {
          //     animation: 'slide_from_bottom',
          //     tabBarVisible: false,
          //   },
          //   ios: {
          //     presentation: 'modal',
          //   },
          // }),
          // presentation: 'modal',
        }}
      />
    </HomeStack.Navigator>
  );
};
