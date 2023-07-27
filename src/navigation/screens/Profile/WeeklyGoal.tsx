import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export const WeeklyGoal = ({
  selectedDays,
  activeDays,
  toggleBottomSheet,
  CircularProgress,
}: any) => {
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
});

export default WeeklyGoal;
