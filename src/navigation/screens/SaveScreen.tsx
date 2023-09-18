import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SectionList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgLikeIcon from '../../assets/LikeIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {
  addItem,
  getLikes,
  loadLikedItems,
  removeItem,
} from '../../redux/slices/LikedItemsSlice';
import SvgFlower from '../../assets/Flower';
import SvgDuration from '../../assets/DurationIcon';
import {Session} from '../../models/Session';
import AudioPlayer from '../../components/musicPlayer/AudioPlayer';
import HeaderAnimation from '../../utils/HeaderAnimation';

const SaveScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const likedItems = useSelector((state: RootState) => getLikes(state));

  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [selectedAudioItem, setSelectedAudioItem] = useState(null);
  const handleListenPress = (item: any) => {
    setSelectedAudioItem(item);
    setShowAudioPlayer(true);
  };

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

  // here i filter by keywords and divide liked items
  const likedPractices = likedItems.filter(
    item => !item.title.toLowerCase().includes('meditation'),
  );

  const likedMeditations = likedItems.filter(item =>
    item.title.toLowerCase().includes('meditation'),
  );

  const combinedData = likedPractices.concat(likedMeditations);

  const renderItem = ({item}: {item: any}) => {
    return (
      <HeaderAnimation duration={1000}>
        <View key={item._id} style={styles.favoritesItem}>
          <View style={styles.imageContentSubtop}>
            <SvgDuration />
            <Text style={styles.titleColor}>{item.duration} mins</Text>
          </View>
          <Image style={styles.imageFav} source={{uri: item.imageUrl}} />
          <View style={styles.favoritesItemSecondary}>
            <Text style={styles.textFav}>{item.title}</Text>
            <View style={styles.favoritesItemSecondaryBottom}>
              <TouchableOpacity
                style={styles.btnFav}
                onPress={() => {
                  if (item.title.toLowerCase().includes('meditation')) {
                    handleListenPress(item);
                  } else {
                    navigation.navigate('PracticePreview', {session: item});
                  }
                }}>
                <Text>
                  {item.title.toLowerCase().includes('meditation')
                    ? 'Listen'
                    : 'Play'}
                </Text>
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
      </HeaderAnimation>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={{textAlign: 'center', fontSize: 18, paddingBottom: 10}}>
          Favorites
        </Text>
      </View>

      {combinedData.length > 0 ? (
        <SectionList
          sections={[
            {title: 'Practices', data: likedPractices},
            {title: 'Meditations', data: likedMeditations},
          ]}
          keyExtractor={(item: Session) => item._id}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.favoritesMainContent}>
              <View style={styles.centerContainer}>
                <Text style={styles.textMain}>{title}</Text>
              </View>
              <Text>✨</Text>
            </View>
          )}
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
      {showAudioPlayer && selectedAudioItem && (
        <AudioPlayer
          selectedItem={selectedAudioItem}
          onClose={() => setShowAudioPlayer(false)}
        />
      )}
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
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  textMain: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
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
    paddingTop: 15,
    marginBottom: 10,
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
    top: 30,
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

  centerContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  playerCondStyles: {flexDirection: 'row', alignItems: 'center', columnGap: 10},
  playerLeftStyles: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
});
