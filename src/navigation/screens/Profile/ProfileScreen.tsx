import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheetComponent from '../../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileCalendar} from '../../../components/calendar/ProfileCalendar';
import {ProfileHeader} from './Header';
import WeeklyGoal from './WeeklyGoal';
import {ProgressBar} from './ProgressBar';
import BottomSheetDays from './BottomSheetDays';
import {debounce} from 'lodash';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux';
import {signOut} from '../../../redux/slices/AuthSlice';
import HeaderAnimation from '../../../utils/HeaderAnimation';

// motivational words
const motivationalPhrases = [
  "Keep going! You're doing great!",
  "You're on your way to success!",
  'Each day brings you closer to your goal!',
  'Believe in yourself and stay committed!',
  'Superb!',
  'You rock!',
];

const ProfileScreen = ({navigation}: any) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);

  const [activeDays, setActiveDays] = useState(0);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [currentFill, setCurrentFill] = useState(0);
  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const snapPoints = ['25%', '85%'];
  const animationDuration = 1000;

  const animationRef = useRef<any>();

  const storeActiveDaysInLocalStorage = async (days: number) => {
    try {
      await AsyncStorage.setItem('@activeDays', JSON.stringify(days));
    } catch (error) {
      console.error('Error storing activeDays in local storage:', error);
    }
  };
  const loadActiveDaysFromLocalStorage = async () => {
    try {
      const storedActiveDays = await AsyncStorage.getItem('@activeDays');
      return storedActiveDays !== null ? JSON.parse(storedActiveDays) : null;
    } catch (error) {
      console.error('Error loading activeDays from local storage:', error);
      return null;
    }
  };

  // func to get the number of days that have passed in the current week
  const getDaysPassedInCurrentWeek = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // Sunday - 0, Monday - 1
    return dayOfWeek === 0 ? 7 : dayOfWeek; // if it's Sunday then it is the 7th day
  };

  // Use the calculated activeDays based on the real-world week
  useEffect(() => {
    // Load activeDays from local storage on component mount
    const loadStoredActiveDays = async () => {
      const storedActiveDays = await loadActiveDaysFromLocalStorage();
      if (storedActiveDays !== null) {
        // If activeDays is found in local storage, set it in the state
        setActiveDays(storedActiveDays);
      } else {
        // If activeDays is not found in local storage, set it based on the real-world week
        setActiveDays(getDaysPassedInCurrentWeek());
        // Also, store it in local storage for future use
        storeActiveDaysInLocalStorage(getDaysPassedInCurrentWeek());
      }
    };
    loadStoredActiveDays();
  }, []);

  const animateProgress = (targetFill: number) => {
    let startFill = currentFill;
    const startTime = Date.now();

    const animationFrame = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;

      if (deltaTime >= animationDuration) {
        setCurrentFill(targetFill);
      } else {
        const progress = deltaTime / animationDuration;
        const newFill = Math.floor(
          startFill + progress * (targetFill - startFill),
        );
        setCurrentFill(newFill);
        animationRef.current = requestAnimationFrame(animationFrame);
      }
    };
    animationRef.current = requestAnimationFrame(animationFrame);
  };

  useEffect(() => {
    animateProgress(selectedDays.length);
    setActiveDays(selectedDays.length);
    selectRandomMotivationalPhrase();
    updateActiveDays();
  }, [selectedDays]);

  const selectRandomMotivationalPhrase = () => {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    setMotivationalPhrase(motivationalPhrases[randomIndex]);
  };

  const handleSelectDays = debounce((day: number) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(selectedDay => selectedDay !== day)
        : [...prevSelectedDays, day],
    );

    // Store the updated selectedDays in AsyncStorage
    AsyncStorage.setItem('@selectedDays', JSON.stringify(selectedDays))
      .then(() => {
        console.log('Selected Days Stored:', selectedDays);
      })
      .catch(error => {
        console.error('Error storing selected days:', error);
      });
  }, 200);

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(prevState => !prevState);
  };

  const updateActiveDays = () => {
    setActiveDays(selectedDays.length);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    dispatch(signOut());
    navigation.navigate('Login');
  };

  // Load selectedDays from local storage on component mount
  useEffect(() => {
    const loadSelectedDays = async () => {
      try {
        const storedSelectedDays = await AsyncStorage.getItem('@selectedDays');
        if (storedSelectedDays !== null) {
          setSelectedDays(JSON.parse(storedSelectedDays));
        } else {
          setSelectedDays([]);
        }
      } catch (error) {
        console.error('Error loading selected days:', error);
      }
    };

    loadSelectedDays();
  }, []);

  // Save selectedDays to local storage whenever it changes
  useEffect(() => {
    const saveSelectedDays = async () => {
      try {
        await AsyncStorage.setItem(
          '@selectedDays',
          JSON.stringify(selectedDays),
        );
      } catch (error) {
        console.error('Error storing selected days:', error);
      }
    };

    saveSelectedDays();
  }, [selectedDays]);

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={['#62CBF7', '#6FBBFE', '#6DB9FE']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <ProfileHeader
          navigation={navigation}
          onLogout={() => handleLogout()}
          isLogoutModalVisible={isLogoutModalVisible}
          toggleLogoutModal={() =>
            setIsLogoutModalVisible(!isLogoutModalVisible)
          }
        />
        <View style={styles.primaryContent}>
          <HeaderAnimation duration={2000}>
            <WeeklyGoal
              activeDays={activeDays}
              selectedDays={selectedDays}
              toggleBottomSheet={toggleBottomSheet}
              CircularProgress={AnimatedCircularProgress}
            />
            <Text style={[styles.firstSectionHeadtext, {paddingBottom: -20}]}>
              Calendar
            </Text>
            <ProfileCalendar activeDays={selectedDays} />
          </HeaderAnimation>
        </View>
        <BottomSheetComponent
          isVisible={isBottomSheetVisible}
          toggleBottomSheet={toggleBottomSheet}
          showHandleIndicator={false}
          snapPoints={snapPoints}>
          <View>
            <View>
              <Text style={[styles.firstSectionHeadtext, {paddingTop: 8}]}>
                Set your weekly goal!
              </Text>
              <Text
                style={[
                  styles.firstSectionSubHeadtext,
                  {paddingHorizontal: 10},
                ]}>
                To keep you motivated, now you can set your personal goal for
                your week. Edit your goal anytime later.
              </Text>
            </View>
            <ProgressBar selectedDays={selectedDays} />
            <View style={styles.motivationalPhraseContainer}>
              {selectedDays.length > 0 && (
                <View style={styles.motivsubtext}>
                  <Text>🚀</Text>
                  <Text style={styles.motivationalPhraseText}>
                    {motivationalPhrase}
                  </Text>
                </View>
              )}
            </View>
            <BottomSheetDays
              selectedDays={selectedDays}
              handleSelectDays={handleSelectDays}
            />
          </View>
          <TouchableOpacity
            onPress={toggleBottomSheet}
            style={styles.continueBtn}>
            <Text style={styles.closeButton}>Done</Text>
          </TouchableOpacity>
        </BottomSheetComponent>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  continueBtn: {
    backgroundColor: '#8F6FFE',
    marginHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
  },
  primaryContent: {
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logOutBtn: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%',
    marginTop: 20,
  },
  firstSectionHeadtext: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 15,
  },
  firstSectionSubHeadtext: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 20,
  },
  motivationalPhraseContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  motivationalPhraseText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
  motivsubtext: {
    alignItems: 'center',
    rowGap: 8,
    position: 'absolute',
    top: -40,
  },
});
