import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import {Provider} from 'react-redux';
import store from './src/redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigator} from './src/navigation/stack/HomeStack';
import {ProfileStackNavigator} from './src/navigation/stack/ProfileStack';
import {SaveStackNavigator} from './src/navigation/stack/SaveStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SvgHome from './src/assets/HomeIcon';

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Profile: undefined;
  Save: undefined;
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
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Save" component={SaveStackNavigator} />
    </Tab.Navigator>
  );
};
// Nazrin@test.com
// 123456

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeTabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
