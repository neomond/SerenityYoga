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
import SvgBack from '../../assets/BackIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import SvgDownload from '../../assets/DownloadIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {removeItem} from '../../redux/slices/LikedItemsSlice';
import SvgFlower from '../../assets/Flower';
import SvgDuration from '../../assets/DurationIcon';
import {DataItem} from '../../redux/slices/CategoriesSlice';
import SvgCloseIcon from '../../assets/CloseIcon';
import LinearGradient from 'react-native-linear-gradient';
import SvgPause from '../../assets/PauseIcon';

// const tracks = [
//   {
//     id: '1',
//     url: require('../../assets/tracks/meditation1.mp3'),
//     title: 'Blues Beat',r
//   },
//   {
//     id: '2',
//   url: require('../../assets/tracks/meditation2.mp3'),
//     title: 'Country Song',
//   },
//   {
//     id: '3',
//   url: require('../../assets/tracks/meditation3.mp3'),
//     title: 'Country Song',
//   },
// ];

const SaveScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const likedItems = useSelector(
    (state: RootState) => state.likedItemsSlice.likedItems,
  );

  const handleRemove = (item: any) => {
    setIsLiked(!isLiked);
    dispatch(removeItem(item.key));
  };

  const handlePlay = (item: any) => {
    setSelectedItem(item);
  };

  const handleClosePlayer = () => {
    setSelectedItem(null);
  };

  const renderItem = ({item}: {item: any}) => (
    <View key={item.key} style={styles.favoritesItem}>
      <View style={styles.imageContentSubtop}>
        <SvgDuration />
        <Text style={styles.titleColor}>{item.duration}</Text>
      </View>
      <Image style={styles.imageFav} source={{uri: item.image}} />
      <View style={styles.favoritesItemSecondary}>
        <Text style={styles.textFav}>{item.title}</Text>
        <View style={styles.favoritesItemSecondaryBottom}>
          <TouchableOpacity
            style={styles.btnFav}
            onPress={() => handlePlay(item)}>
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgDownload />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemove(item)}>
            <SvgLikeIcon fill="#815cff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderPlayer = () => {
    if (selectedItem) {
      return (
        <LinearGradient
          colors={['#E5DEFF', '#E5DEFF', '#B39FF8', '#815cff']}
          start={{x: 0, y: 0.2}}
          end={{x: 1, y: 0}}
          style={styles.playerContainer}>
          <View style={styles.playerLeftStyles}>
            <Image
              style={styles.playerImage}
              source={{uri: selectedItem.image}}
            />
            <View>
              <Text>{selectedItem.title}</Text>
              <Text>{selectedItem.duration}</Text>
            </View>
          </View>
          <View style={styles.playerCondStyles}>
            <TouchableOpacity>
              <SvgPause />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClosePlayer}>
              <SvgCloseIcon stroke="#000" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.favoritesMainContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgBack />
        </TouchableOpacity>
        <Text style={styles.textMain}>Favorites</Text>
        <Text>✨</Text>
      </View>
      {likedItems.length > 0 ? (
        <FlatList
          data={likedItems}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <View style={styles.flowerIcon}>
            <SvgFlower />
          </View>
          <Text style={styles.noItemsText}>No items in favorites.</Text>
        </View>
      )}
      {renderPlayer()}
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
  playerCondStyles: {flexDirection: 'row', alignItems: 'center', columnGap: 10},
  playerLeftStyles: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
});
