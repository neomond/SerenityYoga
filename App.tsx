import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import {Provider} from 'react-redux';
import store from './src/redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigator} from './src/navigation/stack/HomeStack';
import {ProfileStackNavigator} from './src/navigation/stack/ProfileStack';
import {SaveStackNavigator} from './src/navigation/stack/SaveStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SvgHomeIcon from './src/assets/HomeIcon';
import SvgSaveIcon from './src/assets/SaveIcon';
import SvgProfile from './src/assets/Profile';

type RootStackParamList = {
  AuthMain: undefined;
  HomeMain: undefined;
  ProfileMain: undefined;
  SaveMain: undefined;
};

type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Save: undefined;
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
      {/* <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}: any) => (
            <SvgProfile
              stroke={focused ? '#815CFF' : '#444444'}
              fill={focused ? '#E5DEFF' : '#fff'}
            />
          ),
        }}
        component={ProfileStackNavigator}
      /> */}
      <Tab.Screen
        name="Save"
        options={{
          tabBarIcon: ({focused}: any) => (
            <SvgSaveIcon
              stroke={focused ? '#815CFF' : '#444444'}
              fill={focused ? '#E5DEFF' : '#fff'}
            />
          ),
        }}
        component={SaveStackNavigator}
      />
    </Tab.Navigator>
  );
};
// Nazrin@test.com
// 123456

const App: React.FC = () => {
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
