import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import tracks from '../../models/tracks';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import SvgPauseRoad from '../../assets/SvgPauseRoad';
import SvgPlayRoad from '../../assets/PlayRoad';
import SvgCloseTrack from '../../assets/CloseTrack';

const AudioPlayer = ({selectedItem, onClose}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const {position, duration} = useProgress();

  useEffect(() => {
    async function loadAndPlayTrack() {
      await TrackPlayer.reset();

      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

      await TrackPlayer.add(randomTrack);
      await TrackPlayer.play();
    }

    loadAndPlayTrack();

    return () => {
      TrackPlayer.stop();
      TrackPlayer.reset();
    };
  }, []);

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <View
        style={{
          zIndex: 9,
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 70 : 80,
          left: Platform.OS === 'ios' ? -3 : -10,
          width: '100%',
        }}>
        <Slider
          style={{
            zIndex: 9,
            width: '110%',
          }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
          minimumTrackTintColor="#c47afb"
          maximumTrackTintColor="#BBB"
          thumbTintColor="#FFF"
        />
      </View>
      <LinearGradient
        colors={['#c47afb', '#A07AFA', '#8380fb']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.container}>
        <View style={styles.audioInfo}>
          <Image source={{uri: selectedItem.imageUrl}} style={styles.image} />
          <View style={styles.controls}>
            <Text style={styles.audioTitle}>{selectedItem.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 6,
              }}>
              <TouchableOpacity onPress={togglePlayback}>
                {isPlaying ? (
                  <Text style={styles.controlText}>
                    <SvgPauseRoad />
                  </Text>
                ) : (
                  <Text style={styles.controlText}>
                    <SvgPlayRoad />
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.controlText}>
                  <SvgCloseTrack />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  audioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  audioTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  audioDuration: {
    color: '#BBB',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'column',
  },
  controlText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default AudioPlayer;
