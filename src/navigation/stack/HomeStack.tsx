import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CategoryMoodScreen from '../screens/CategoryMoodScreen';

type HomeStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  DetailsScreen: undefined;
  CategoryMoodScreen: undefined;
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
          presentation: 'modal',
          // animation: 'slide_from_bottom',
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
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CategoryMoodScreen"
        component={CategoryMoodScreen}
        options={{
          headerShown: false,
          // ...Platform.select({
          //   android: {
          //     animation: 'slide_from_bottom',
          //     tabBarVisible: false,
          //   },
          //   ios: {
          //     presentation: 'modal',
          //   },
          // }),
          presentation: 'modal',
        }}
      />
    </HomeStack.Navigator>
  );
};
