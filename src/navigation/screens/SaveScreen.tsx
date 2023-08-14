import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgLikeIcon from '../../assets/LikeIcon';
import SvgDownload from '../../assets/DownloadIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {
  addItem,
  clearLikedItems,
  getLikes,
  loadLikedItems,
  removeItem,
} from '../../redux/slices/LikedItemsSlice';
import SvgFlower from '../../assets/Flower';
import SvgDuration from '../../assets/DurationIcon';
// import {DataItem} from '../../redux/slices/CategoriesSlice';
import SvgCloseIcon from '../../assets/CloseIcon';
import LinearGradient from 'react-native-linear-gradient';
import SvgPause from '../../assets/PauseIcon';
import Slider from '@react-native-community/slider';

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
import tracks from '../../models/tracks';
import SvgPlay from '../../assets/PlayIcon';
import {Session} from '../../models/Session';

const SaveScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const likedItems = useSelector((state: RootState) => getLikes(state));

  useEffect(() => {
    dispatch(loadLikedItems());
  }, [dispatch]);

  const isItemLiked = (item: Session) => {
    return likedItems.some(likedItem => likedItem._id === item._id);
  };

  const handleLikeItem = (item: Session) => {
    if (isItemLiked(item)) {
      dispatch(removeItem(item._id));
    } else {
      dispatch(addItem(item));
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <View key={item._id} style={styles.favoritesItem}>
        <View style={styles.imageContentSubtop}>
          <SvgDuration />
          <Text style={styles.titleColor}>{item.duration}</Text>
        </View>
        <Image style={styles.imageFav} source={{uri: item.imageUrl}} />
        <View style={styles.favoritesItemSecondary}>
          <Text style={styles.textFav}>{item.title}</Text>
          <View style={styles.favoritesItemSecondaryBottom}>
            <TouchableOpacity
              style={styles.btnFav}
              // onPress={() => handlePlay(item)}
            >
              <Text>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgDownload />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLikeItem(item)}>
              <SvgLikeIcon
                fill={isItemLiked(item) ? '#E5DEFF' : 'transparent'}
                stroke={isItemLiked(item) ? '#815cff' : '#E5DEFF'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.favoritesMainContent}>
        <View style={styles.centerContainer}>
          <Text style={styles.textMain}>Liked Practices</Text>
        </View>
        <Text>✨</Text>
      </View>
      {likedItems.length > 0 ? (
        <FlatList
          data={likedItems}
          renderItem={renderItem}
          keyExtractor={(item: Session) => item._id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <View style={styles.flowerIcon}>
            <SvgFlower />
          </View>
          <Text style={styles.noItemsText}>No items in favorites.</Text>
        </View>
      )}
      {/* {renderPlayer()} */}
    </SafeAreaView>
  );
};

export default SaveScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  favoritesMainContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textMain: {
    fontSize: 18,
    textAlign: 'center',
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  categoryHeaderSecond: {
    color: '#929292',
    fontWeight: '400',
  },
  renderItemContSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  favoritesItem: {
    marginHorizontal: 20,
    columnGap: 20,
    flexDirection: 'row',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.2,
    paddingBottom: 20,
    paddingTop: 25,
  },
  imageFav: {
    width: 150,
    height: 100,
    borderRadius: 15,
  },
  textFav: {
    fontSize: 16,
    width: '80%',
  },
  titleColor: {
    color: '#fff',
    fontSize: 14,
  },
  btnFav: {
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: 110,
    marginRight: 10,
  },
  favoritesItemSecondary: {
    justifyContent: 'space-between',
  },
  favoritesItemSecondaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 16,
    color: '#815CFF',
    fontWeight: '600',
  },
  flowerIcon: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 50,
    left: 0,
  },
  imageContentSubtop: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'center',
    position: 'absolute',
    top: 35,
    left: 10,
    zIndex: 1,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerImage: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 8,
  },
  progressBar: {
    width: '110%',
    position: 'absolute',
    flexDirection: 'row',
    top: -20,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  playerCondStyles: {flexDirection: 'row', alignItems: 'center', columnGap: 10},
  playerLeftStyles: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
});

// const setUpPlayer = async () => {
//   await TrackPlayer.setupPlayer();
//   await TrackPlayer.add(tracks);
// };

//?????? check if player has already been initialized before calling TrackPlayer.setupPlayer():
// let isPlayerInitialized = false;

// console.log('Liked Items:', likedItems);
// const handlePlay = async (item: any) => {
//   setSelectedItem(item);
//   await TrackPlayer.reset();
//   await TrackPlayer.add(tracks);
//   await TrackPlayer.play();
//   setPause('playing');
// };

// const handleClosePlayer = () => {
//   setSelectedItem(null);
//   TrackPlayer.stop();
// };
// console.log('meeeeoooooowww', likedItems);

//////////// FOR PLAYER
// const renderPlayer = () => {
//   if (selectedItem) {
//     return (
//       <LinearGradient
//         colors={['#E5DEFF', '#E5DEFF', '#B39FF8', '#815cff']}
//         start={{x: 0, y: 0.2}}
//         end={{x: 1, y: 0}}
//         style={styles.playerContainer}>
//         <Slider
//           style={styles.progressBar}
//           value={progress.position}
//           minimumValue={0}
//           maximumValue={progress.duration}
//           minimumTrackTintColor="#B39FF8"
//           maximumTrackTintColor="#E5DEFF"
//           onSlidingComplete={async value => {
//             await TrackPlayer.seekTo(value);
//           }}
//         />

//         <View style={styles.playerLeftStyles}>
//           <Image
//             style={styles.playerImage}
//             source={{uri: selectedItem.image}}
//           />
//           <View>
//             <Text>{selectedItem.title}</Text>
//           </View>
//         </View>
//         <View style={styles.playerCondStyles}>
//           <TouchableOpacity onPress={togglePause}>
//             {pause == 'paused' ? <SvgPlay /> : <SvgPause />}
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleClosePlayer}>
//             <SvgCloseIcon stroke="#000" />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     );
//   }
//   return null;
// };
// console.log('wtttttffff', likedItems);
/////////////////PLAYER
// const playbackState = usePlaybackState();
// const progress = useProgress();
// const [pause, setPause] = useState('paused');
// const [sliderValue, setSliderValue] = useState(0);

// const setUpPlayer = async () => {
//   if (!isPlayerInitialized) {
//     await TrackPlayer.setupPlayer();
//     isPlayerInitialized = true;
//   }
//   await TrackPlayer.add(tracks);
// };

// useEffect(() => {
//   setUpPlayer();
// }, []);

// const togglePause = () => {
//   if (pause == 'paused') {
//     TrackPlayer.play();
//     setPause('playing');
//   } else {
//     TrackPlayer.pause();
//     setPause('paused');
//   }
// };
/////////////////PLAYER
// const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
