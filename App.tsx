import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store from './src/redux';
import SplashScreen from 'react-native-splash-screen';
import SvgHomeIcon from './src/assets/HomeIcon';
import SvgMeditations from './src/assets/MeditationsIcon';
import SvgPractices from './src/assets/VideosIcon';
import SvgLiked from './src/assets/LikedIcon';
import {HomeStackNavigator} from './src/navigation/stack/HomeStack';
import {PracticesStackNavigator} from './src/navigation/stack/PracticesStack';
import {MeditationsStackNavigator} from './src/navigation/stack/MeditationsStack';
import {SaveStackNavigator} from './src/navigation/stack/SaveStack';
import AuthStack from './src/navigation/stack/AuthStack';
import {View} from 'react-native';
import {OnboardingStackNavigator} from './src/navigation/stack/OnboardingStack';

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FocusedText} from './src/utils/FocusedTextAnimation';

type RootStackParamList = {
  AuthMain: undefined;
  HomeMain: undefined;
  ProfileMain: undefined;
  SaveMain: undefined;
  Onboarding: undefined;
};

type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Favorites: undefined;
  Meditations: undefined;
  Practices: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeTabNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <LottieView
          style={{width: 200, height: 200}}
          source={require('./src/assets/lottie/loading.json')}
          autoPlay
        />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: '#815CFF',
        tabBarInactiveTintColor: '#444444',
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: focused ? '#E5DEFF' : 'transparent',
                borderRadius: focused ? 25 : 0,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginLeft: 20,
              }}>
              <SvgHomeIcon
                stroke={focused ? '#815CFF' : '#444444'}
                fill={focused ? '#E5DEFF' : '#fff'}
              />
              {focused ? <FocusedText focused={focused} label="Home" /> : null}
            </View>
          ),
        }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="Practices"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: focused ? '#E5DEFF' : 'transparent',
                borderRadius: focused ? 25 : 0,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginLeft: 20,
              }}>
              <SvgPractices stroke={focused ? '#815CFF' : '#444444'} />
              {focused ? <FocusedText focused={focused} label="Yoga" /> : null}
            </View>
          ),
        }}
        component={PracticesStackNavigator}
      />
      <Tab.Screen
        name="Meditations"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: focused ? '#E5DEFF' : 'transparent',
                borderRadius: focused ? 25 : 0,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginLeft: 20,
              }}>
              <SvgMeditations stroke={focused ? '#815CFF' : '#444444'} />
              {focused ? <FocusedText focused={focused} label="Medi" /> : null}
            </View>
          ),
        }}
        component={MeditationsStackNavigator}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: focused ? '#E5DEFF' : 'transparent',
                borderRadius: focused ? 25 : 0,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}>
              <SvgLiked
                stroke={focused ? '#815CFF' : '#444444'}
                fill={focused ? '#E5DEFF' : '#fff'}
              />
              {focused ? <FocusedText focused={focused} label="Favs" /> : null}
            </View>
          ),
        }}
        component={SaveStackNavigator}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    SplashScreen.hide();
    AsyncStorage.getItem('token').then(token => {
      console.log('Retrieved token:', token);
      if (token) {
        setInitialRoute('HomeMain');
        console.log('Initial route set to HomeMain');
      } else {
        setInitialRoute('AuthMain');
        console.log('Initial route set to AuthMain');
      }
    });
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute as keyof RootStackParamList}>
          <Stack.Screen
            name="AuthMain"
            component={AuthStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingStackNavigator}
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
