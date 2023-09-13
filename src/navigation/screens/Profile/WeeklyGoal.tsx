import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

export const WeeklyGoal = ({
  selectedDays,
  activeDays,
  toggleBottomSheet,
  CircularProgress,
}: any) => {
  const [isCongratsModalVisible, setIsCongratsModalVisible] = useState(false);
  const isAllDaysSelected = selectedDays.length === 7;

  useEffect(() => {
    if (isAllDaysSelected) {
      setIsCongratsModalVisible(true);
    } else {
      setIsCongratsModalVisible(false);
    }
  }, [selectedDays]);

  return (
    <View>
      <Text style={styles.firstSectionHeadtext}>Weekly Goal</Text>
      <Text style={styles.firstSectionSubHeadtext}>
        Complete a session on {selectedDays.length} days each week to achieve
        your goal
      </Text>
      <View style={styles.stepperContainer}>
        <CircularProgress
          size={170}
          width={20}
          fill={(activeDays / 7) * 100}
          tintColor="#815cff"
          lineCap="round"
          backgroundColor="#f5f5f5"
          padding={10}
          arcSweepAngle={280}
          rotation={220}>
          {(fill: any) => (
            <View style={styles.circularProgressContent}>
              <Text style={styles.progressText}>{activeDays}</Text>
              <Text style={styles.daysText}>/ {selectedDays.length} days</Text>
            </View>
          )}
        </CircularProgress>
      </View>
      <TouchableOpacity onPress={toggleBottomSheet}>
        <Text style={styles.editWeeklyGoalBtn}>Edit</Text>
      </TouchableOpacity>

      <Modal
        visible={isCongratsModalVisible && isAllDaysSelected}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Congrats!</Text>
            <Text style={styles.modalSubText}>
              You have completed your goal for the week!
            </Text>
            <LottieView
              style={{width: 320, height: 300, marginBottom: 30}}
              source={require('../../../assets/lottie/congrats.json')}
              autoPlay
            />
            <TouchableOpacity
              onPress={() => {
                setIsCongratsModalVisible(false);
              }}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  editWeeklyGoalBtn: {
    color: '#815cff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    position: 'absolute',
    top: -25,
    left: '47%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    color: '#815cff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WeeklyGoal;
