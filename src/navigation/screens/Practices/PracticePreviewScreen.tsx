import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SvgBack from '../../../assets/BackIcon';
import BottomSheetComponentWithoutOverlay from '../../../components/bottomsheet/BottomSheetComponentWithoutOverlay';
import SvgClock from '../../../assets/Clock';
import SvgActivity from '../../../assets/Activity';
import SvgActivityActive from '../../../assets/ActivityActive';
import YoutubePlayer from 'react-native-youtube-iframe';
import SvgFlower from '../../../assets/Flower';

const PracticePreviewScreen = ({navigation}: any) => {
  const [playing, setPlaying] = useState(false);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <ImageBackground
        source={require('../../../assets/test.png')}
        style={styles.backgroundImage}> */}
      <View style={styles.topBackBtn}>
        <TouchableOpacity
          style={styles.goBackBtnStyle}
          onPress={() => navigation.goBack()}>
          <SvgBack stroke="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 100,
          marginBottom: 80,
        }}>
        <YoutubePlayer height={230} videoId={'reASzZP63HQ'} play={playing} />
        <View style={styles.flowerIcon}>
          <SvgFlower />
        </View>
      </View>
      {/* </ImageBackground> */}
      <BottomSheetComponentWithoutOverlay
        isVisible={true}
        snapPoints={['25%', '26%', '88%']}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomshtopCont}>
            <View>
              <Text style={styles.bottomshHeaderText}>Morning Yoga Flow</Text>
              <Text>with Elly</Text>
            </View>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../assets/test.png')}
            />
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={togglePlaying}>
            <Text style={styles.startBtnText}>
              {playing ? 'Stop' : 'Start Workout'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descWrapper}>
          <View style={styles.descFirst}>
            <View style={styles.descSubWrapper}>
              <SvgClock />
              <Text>10 min</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: '#d9d9d9',
              }}>
              <View style={styles.activityMain}>
                <View style={styles.activityDots}>
                  <SvgActivityActive />
                  <SvgActivity />
                  <SvgActivity />
                </View>
                <Text>Low intensity</Text>
              </View>
            </View>
          </View>
          <Text style={{marginHorizontal: 20, fontSize: 16}}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
            sequi nisi illum quisquam doloribus quasi ut, eos deleniti
            recusandae natus magnam, corporis quaerat commodi numquam
            blanditiis, nobis a impedit dolor. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.Namaste
          </Text>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={[styles.bottomshHeaderText, {paddingBottom: 15}]}>
              Workout Structure
            </Text>
            <View>
              <View style={styles.workoutSctruct}>
                <Text>🧘‍♀️ Workout</Text>
                <Text>10 min</Text>
              </View>
              <View style={styles.workoutSctruct}>
                <Text>😌 Shavasana meditation</Text>
                <Text>5 min</Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetComponentWithoutOverlay>
    </GestureHandlerRootView>
  );
};

export default PracticePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(229,222,255, 0.2)',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  goBackBtnStyle: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.2)',
    backgroundColor: 'rgba(129, 92, 255, 0.8)',
    padding: 8,
    marginLeft: 20,
  },
  topBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: Platform.OS === 'ios' ? 50 : 25,
    position: 'absolute',
    width: '100%',
  },
  bottomshHeaderText: {fontSize: 20, fontWeight: '600', paddingBottom: 8},
  bottomshtopCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startBtn: {
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: '#815cff',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
  },
  startBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
  descFirst: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    borderRadius: 20,
  },
  descWrapper: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '100%',
  },
  descSubWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  workoutSctruct: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityMain: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDots: {
    marginTop: 3,
    marginRight: 5,
    flexDirection: 'row',
    columnGap: -3,
  },
  flowerIcon: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: Platform.OS === 'ios' ? '-28%' : '-13%',
    left: 0,
    zIndex: -1,
  },
});
