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
  State,
  Event,
  usePlaybackState,
  RepeatMode,
  useProgress,
  useTrackPlayerEvents,
  PlaybackState,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import tracks from '../../../models/tracks';
import SvgPlay from '../../../assets/PlayIcon';
import SvgPause from '../../../assets/PauseIcon';
import SvgRotateLeft from '../../../assets/RotateLeft';
import SvgRotateRight from '../../../assets/RotateRight';
import SvgBack from '../../../assets/BackIcon';

const setUpPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add(tracks);
};

const MeditationsPlayerScreen = ({navigation}: any) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);

  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [pause, setPause] = useState('paused');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setUpPlayer();
  }, []);
  const togglePause = () => {
    if (pause == 'paused') {
      TrackPlayer.play();
      setPause('playing');
    } else {
      TrackPlayer.pause();
      setPause('paused');
    }
  };

  const handleClosePlayer = () => {
    setSelectedItem(null);
    TrackPlayer.stop();
    navigation.goBack();
  };

  // const handleRotate = async (seconds: number) => {
  //   const newPosition = Math.max(0, progress.position + seconds);
  //   await TrackPlayer.seekTo(newPosition);
  // };
  const handleRotate = async (seconds: number) => {
    const newPosition = progress.position + seconds;
    const duration = progress.duration;

    const validPosition = Math.max(0, Math.min(newPosition, duration));
    await TrackPlayer.seekTo(validPosition);
  };

  const handlePlay = async (item: any) => {
    setSelectedItem(item);
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.play();
    setPause('playing');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
      }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBackBtnStyle}
          onPress={handleClosePlayer}>
          <SvgBack stroke="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Best Self</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          ipsum odio nesciunt.
        </Text>
        <Text style={styles.authortext}>by Steve Muscara</Text>

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
            {pause == 'paused' ? <SvgPlay /> : <SvgPause />}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: '50%',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    width: '76%',
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
  closeButton: {
    fontSize: 18,
    color: 'black',
    marginHorizontal: 20,
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
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
