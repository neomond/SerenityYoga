import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
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
import CustomTabBar from './src/utils/customTabBar';
import {Text, View} from 'react-native';

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
        tabBarShowLabel: false,
      })}
      // tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        options={({route}: any) => ({
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            console.log(routeName);
            if (
              routeName === 'CategoryMoodScreen' ||
              routeName === 'DetailsScreen'
            ) {
              return {display: 'none'};
            }
            return;
          })(route),
          tabBarIcon: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgHomeIcon
                stroke={focused ? '#815CFF' : '#444444'}
                fill={focused ? '#E5DEFF' : '#fff'}
              />
              {focused ? (
                <Text style={{marginLeft: 5, fontSize: 12, color: '#815CFF'}}>
                  Home
                </Text>
              ) : null}
            </View>
          ),
        })}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="Practices"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgPractices stroke={focused ? '#815CFF' : '#444444'} />
              {focused ? (
                <Text style={{marginLeft: 5, fontSize: 12, color: '#815CFF'}}>
                  Practices
                </Text>
              ) : null}
            </View>
          ),
        }}
        component={PracticesStackNavigator}
      />
      <Tab.Screen
        name="Meditations"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgMeditations stroke={focused ? '#815CFF' : '#444444'} />
              {focused ? (
                <Text style={{marginLeft: 5, fontSize: 12, color: '#815CFF'}}>
                  Meditations
                </Text>
              ) : null}
            </View>
          ),
        }}
        component={MeditationsStackNavigator}
      />
      <Tab.Screen
        name="Liked"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgLiked
                stroke={focused ? '#815CFF' : '#444444'}
                fill={focused ? '#E5DEFF' : '#fff'}
              />
              {focused ? (
                <Text style={{marginLeft: 5, fontSize: 12, color: '#815CFF'}}>
                  Liked
                </Text>
              ) : null}
            </View>
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
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthMain">
          <Stack.Screen
            name="AuthMain"
            component={AuthStack}
            options={{headerShown: false}}
          />
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
