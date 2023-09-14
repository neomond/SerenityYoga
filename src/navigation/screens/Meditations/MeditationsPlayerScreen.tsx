import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import tracks from '../../../models/tracks';
import SvgPlay from '../../../assets/PlayIcon';
import SvgPause from '../../../assets/PauseIcon';
import SvgRotateLeft from '../../../assets/RotateLeft';
import SvgRotateRight from '../../../assets/RotateRight';
import SvgBack from '../../../assets/BackIcon';
import {useNavigation} from '@react-navigation/native';

const MeditationsPlayerScreen = ({navigation, route}: any) => {
  const {selectedMeditation} = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);

  const progress = useProgress();
  const [pause, setPause] = useState('paused');

  useEffect(() => {
    let isMounted = true;

    const setUpPlayerFunc = async () => {
      if (!isMounted) return;

      const playerInitialized = await isPlayerInitialized();

      if (playerInitialized) {
        try {
          await TrackPlayer.add(tracks);
        } catch (error) {
          console.error('Error setting up player:', error);
        }
      }
    };

    const playRandomTrack = async () => {
      if (!isMounted) return;

      if (route.params.randomTrack) {
        try {
          const randomIndex = Math.floor(Math.random() * tracks.length);
          const randomTrack: any = tracks[randomIndex];

          await TrackPlayer.reset();
          await TrackPlayer.add([randomTrack]);
          await TrackPlayer.play();
          setPause('playing');
        } catch (error) {
          console.error('Error playing random track:', error);
        }
      }
    };

    setUpPlayerFunc();

    if (route.params.randomTrack) {
      playRandomTrack();
    }

    return () => {
      isMounted = false;
      TrackPlayer.stop();
    };
  }, [route.params.randomTrack]);

  async function isPlayerInitialized() {
    let isPlayerInitialized = false;

    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      isPlayerInitialized = true;
    } catch (e) {
      console.log(e, 'eeeerrror in music playerr');
    }

    return isPlayerInitialized;
  }
  const parentNavigation = useNavigation();
  const handleClosePlayer = () => {
    TrackPlayer.stop();
    parentNavigation.goBack();
  };

  const handleRotate = async (seconds: number) => {
    const newPosition = progress.position + seconds;
    const duration = progress.duration;

    const validPosition = Math.max(0, Math.min(newPosition, duration));
    await TrackPlayer.seekTo(validPosition);
  };

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
    if (event.type === Event.PlaybackQueueEnded) {
      await TrackPlayer.stop();
      setPause('paused');
    }
  });

  const togglePause = async () => {
    if (pause === 'paused') {
      await TrackPlayer.play();
      setPause('playing');
    } else {
      await TrackPlayer.pause();
      setPause('paused');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{
        uri: selectedMeditation?.imageUrl,
      }}>
      <View style={{zIndex: 999}}>
        <TouchableOpacity
          style={styles.goBackBtnStyle}
          onPress={handleClosePlayer}>
          <SvgBack stroke="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.dataCont}>
          <Text style={styles.title}>{selectedMeditation.title}</Text>
          <Text style={styles.subtitle}>
            {selectedMeditation.subtitle || selectedMeditation.description}
          </Text>
          <Text style={styles.authortext}>by Buddha</Text>
        </View>
        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="#815CFF"
          thumbTintColor="#FFF"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
            // TrackPlayer.play();
          }}
        />
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => handleRotate(-10)}
            style={[styles.playBtn, {width: 48, height: 48}]}>
            <SvgRotateLeft />
            <Text style={styles.timeRotate}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePause} style={styles.playBtn}>
            {pause === 'paused' ? <SvgPlay /> : <SvgPause />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRotate(10)}
            style={[styles.playBtn, {width: 48, height: 48}]}>
            <SvgRotateRight />
            <Text style={styles.timeRotate}>10</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MeditationsPlayerScreen;

const styles = StyleSheet.create({
  slider: {
    width: '90%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: '50%',
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 10,
  },
  authortext: {
    color: '#fff',
    marginBottom: '40%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    columnGap: 30,
  },
  playBtn: {
    backgroundColor: 'rgba(255,255,255, 0.4)',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
  },
  timeRotate: {
    position: 'absolute',
    fontSize: 9,
    color: '#fff',
    top: '41%',
  },
  goBackBtnStyle: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.3)',
    backgroundColor: 'rgba(255,255,255, 0.3)',
    padding: 10,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 25,
    left: 12,
    zIndex: 100,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    resizeMode: 'cover',
  },
  dataCont: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginHorizontal: 25,
    marginVertical: 40,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.3)',
  },
});
