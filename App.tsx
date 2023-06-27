import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import {Provider, useSelector} from 'react-redux';
import store, {RootState} from './src/redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigator} from './src/navigation/stack/HomeStack';
import {SaveStackNavigator} from './src/navigation/stack/SaveStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SvgHomeIcon from './src/assets/HomeIcon';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import MeditationsScreen from './src/navigation/screens/MeditationsScreen';
import SvgMeditations from './src/assets/MeditationsIcon';
import SvgPractices from './src/assets/VideosIcon';
import SvgLiked from './src/assets/LikedIcon';
import {PracticesStackNavigator} from './src/navigation/stack/PracticesStack';
import {MeditationsStackNavigator} from './src/navigation/stack/MeditationsStack';

type RootStackParamList = {
  AuthMain: undefined;
  HomeMain: undefined;
  ProfileMain: undefined;
  SaveMain: undefined;
};

type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Liked: undefined;
  Meditations: undefined;
  Practices: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#815CFF',
        tabBarInactiveTintColor: '#444444',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}: any) => (
            <SvgHomeIcon
              stroke={focused ? '#815CFF' : '#444444'}
              fill={focused ? '#E5DEFF' : '#fff'}
            />
          ),
        }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="Practices"
        options={{
          tabBarIcon: ({focused}: any) => (
            <SvgPractices stroke={focused ? '#815CFF' : '#444444'} />
          ),
        }}
        component={PracticesStackNavigator}
      />

      <Tab.Screen
        name="Liked"
        options={{
          tabBarIcon: ({focused}: any) => (
            <SvgLiked
              stroke={focused ? '#815CFF' : '#444444'}
              fill={focused ? '#E5DEFF' : '#fff'}
            />
          ),
        }}
        component={SaveStackNavigator}
      />
      <Tab.Screen
        name="Meditations"
        options={{
          tabBarIcon: ({focused}: any) => (
            <SvgMeditations stroke={focused ? '#815CFF' : '#444444'} />
          ),
        }}
        component={MeditationsStackNavigator}
      />
    </Tab.Navigator>
  );
};

// Nazrin@test.com
// 123456

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthMain">
          {/* <Stack.Screen
            name="AuthMain"
            component={AuthStack}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="HomeMain"
            component={HomeTabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
