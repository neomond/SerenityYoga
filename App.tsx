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
import {Text, View} from 'react-native';
import {OnboardingStackNavigator} from './src/navigation/stack/OnboardingStack';

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
              }}>
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
        }}
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
        name="Favorites"
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
