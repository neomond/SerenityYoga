import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgBack from '../../assets/BackIcon';
import SvgProfSettingsIcn from '../../assets/ProfSettingsIcn';
import BottomSheetComponent from '../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const ProfileScreen = ({navigation}: any) => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedFill, setSelectedFill] = useState(0);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [currentFill, setCurrentFill] = useState(0);

  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  const snapPoints = ['25%', '85%'];
  const animationDuration = 1000;

  useEffect(() => {
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
          requestAnimationFrame(animationFrame);
        }
      };

      requestAnimationFrame(animationFrame);
    };
    animateProgress(selectedDays.length);
    return () => {
      setCurrentFill(0);
    };
  }, [selectedDays]);

  // to not show bottom bar in this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);
  /////////////////////////////

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(prevState => !prevState);
  };

  const isDaySelected = (day: number) => {
    return selectedDays.includes(day);
  };

  // motivational words
  const motivationalPhrases = [
    "Keep going! You're doing great!",
    "You're on your way to success!",
    'Each day brings you closer to your goal!',
    'Believe in yourself and stay committed!',
    'Superb!',
    'You rock!',
  ];

  const selectRandomMotivationalPhrase = () => {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    setMotivationalPhrase(motivationalPhrases[randomIndex]);
  };

  const handleSelectDays = (day: number) => {
    setSelectedDays(prevSelectedDays => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(selectedDay => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
    selectRandomMotivationalPhrase();
  };

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={['#62CBF7', '#6EC3FA', '#6DB9FE', '#6EBAFE']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <View style={styles.iconsHeader}>
          <TouchableOpacity
            style={styles.favoritesMainContent}
            onPress={() => navigation.goBack()}>
            <SvgBack stroke="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerText}>Profile</Text>
          <View style={styles.favoritesMainContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgProfSettingsIcn stroke="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.primaryContent}>
          <View>
            <Text style={styles.firstSectionHeadtext}>Weekly Goal</Text>
            <Text style={styles.firstSectionSubHeadtext}>
              Complete a session on {selectedDays.length} days each week to
              achieve your goal
            </Text>
            <View style={styles.stepperContainer}>
              <AnimatedCircularProgress
                size={150}
                width={18}
                fill={(selectedDays.length / 7) * 100}
                tintColor="#815cff"
                lineCap="round"
                backgroundColor="#f5f5f5"
                padding={10}
                arcSweepAngle={280}
                rotation={220}>
                {fill => (
                  <View style={styles.circularProgressContent}>
                    <Text style={styles.progressText}>1</Text>
                    <Text style={styles.daysText}>
                      / {selectedDays.length} days
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>

            <TouchableOpacity onPress={toggleBottomSheet}>
              <Text style={styles.editWeeklyGoalBtn}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.firstSectionHeadtext}>Calendar</Text>
          </View>
          <TouchableOpacity style={styles.logOutBtn}>
            <Text>Log Out</Text>
          </TouchableOpacity>
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
            <View style={styles.stepperContainer}>
              <AnimatedCircularProgress
                size={200}
                width={25}
                fill={(selectedDays.length / 7) * 100}
                tintColor="#815cff"
                lineCap="round"
                backgroundColor="#f5f5f5"
                padding={10}
                arcSweepAngle={280}
                rotation={220}>
                {fill => (
                  <View style={styles.circularProgressContent}>
                    <Text style={[styles.progressText, {fontSize: 28}]}>
                      {selectedDays.length}
                    </Text>
                    <Text style={styles.daysText}>days / week</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
              <View style={styles.motivationalPhraseContainer}>
                {selectedDays.length > 0 && (
                  <View style={styles.motivsubtext}>
                    <Text style={{fontSize: 18}}>🚀</Text>
                    <Text style={styles.motivationalPhraseText}>
                      {motivationalPhrase}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.bottomsheetDaysWrapper}>
              <TouchableOpacity
                style={
                  isDaySelected(1)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(1)}>
                <Text
                  style={
                    isDaySelected(1)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Mon
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isDaySelected(2)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(2)}>
                <Text
                  style={
                    isDaySelected(2)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Tue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isDaySelected(3)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(3)}>
                <Text
                  style={
                    isDaySelected(3)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Wed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isDaySelected(4)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(4)}>
                <Text
                  style={
                    isDaySelected(4)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Thu
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isDaySelected(5)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(5)}>
                <Text
                  style={
                    isDaySelected(5)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Fri
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isDaySelected(6)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(6)}>
                <Text
                  style={
                    isDaySelected(6)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Sat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isDaySelected(7)
                    ? styles.bottomsheetDayBtnAct
                    : styles.bottomsheetDayBtn
                }
                onPress={() => handleSelectDays(7)}>
                <Text
                  style={
                    isDaySelected(7)
                      ? styles.bottomsheetDayTextAct
                      : styles.bottomsheetDayText
                  }>
                  Sun
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 60,
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
  iconsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryContent: {
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: '100%',
  },
  handleIndicator: {
    height: 4,
    width: 50,
    borderRadius: 2,
    marginTop: 15,
  },
  favoritesMainContent: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.3)',
    backgroundColor: 'rgba(229,222,255, 0.3)',
    padding: 5,
  },
  headerText: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 20,
    marginRight: 10,
  },
  logOutBtn: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40%',
  },
  firstSectionHeadtext: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 15,
  },
  firstSectionSubHeadtext: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 20,
  },
  editWeeklyGoalBtn: {
    color: '#815cff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 20,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // styles for Circular Progress Bar
  stepperContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  circularProgressContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  daysText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginTop: 5,
  },

  // bottomsheet items
  bottomsheetDaysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    alignItems: 'center',
    columnGap: 10,
    rowGap: 15,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  bottomsheetDayBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    width: 60,
  },
  bottomsheetDayText: {
    color: '#909090',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomsheetDayBtnAct: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#815cff',
    borderColor: '#815cff',
    width: 60,
  },
  bottomsheetDayTextAct: {
    color: '#f5f5f5',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  // motivational words
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
