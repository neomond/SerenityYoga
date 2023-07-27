import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export const ProgressBar = ({selectedDays}: any) => {
  return (
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});
