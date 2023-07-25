import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgBack from '../../assets/BackIcon';
import SvgProfSettingsIcn from '../../assets/ProfSettingsIcn';
import BottomSheetComponent from '../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const ProfileScreen = ({navigation}: any) => {
  const [selectedDays, setSelectedDays] = useState(4);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [currentFill, setCurrentFill] = useState(0);
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

    animateProgress(selectedDays);

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
  const handleSelectDays = (days: number) => {
    setSelectedDays(days);
    toggleBottomSheet();
  };
  const handleBackdropPress = () => {
    setIsBottomSheetVisible(false);
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
              Complete a session on {selectedDays} days each week to achieve
              your goal
            </Text>
            <View style={styles.stepperContainer}>
              <AnimatedCircularProgress
                size={150}
                width={18}
                fill={(selectedDays / 7) * 100}
                tintColor="#815cff"
                lineCap="round"
                backgroundColor="#f5f5f5"
                padding={10}
                arcSweepAngle={280}
                rotation={220}>
                {fill => (
                  <View style={styles.circularProgressContent}>
                    <Text style={styles.progressText}>{selectedDays}</Text>
                    <Text style={styles.daysText}>Days</Text>
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
            <TouchableOpacity onPress={() => handleSelectDays(1)}>
              <Text>Monday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectDays(2)}>
              <Text>Tuesday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectDays(3)}>
              <Text>Wednesday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectDays(4)}>
              <Text>Thursday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectDays(5)}>
              <Text>Friday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectDays(6)}>
              <Text>Saturday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectDays(7)}>
              <Text>Sunday</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
    fontSize: 21,
    fontWeight: '600',
    color: '#815cff',
  },
  daysText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
});
