import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgLikeIcon from '../../../assets/LikeIcon';
import SvgDuration from '../../../assets/DurationIcon';
import SvgBack from '../../../assets/BackIcon';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {
  fetchSessionsAll,
  getRandomNonMeditationSessions,
} from '../../../redux/slices/SessionSlice';
import {Session} from '../../../models/Session';
import {
  addItem,
  getLikes,
  removeItem,
} from '../../../redux/slices/LikedItemsSlice';

const PracticesCollectionScreen = ({navigation, route}: any) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);

  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) =>
    getRandomNonMeditationSessions(state),
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const likedItems = useSelector((state: RootState) => getLikes(state));
  const {selectedImageUrl, selectedYoga} = route.params || {};

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchSessionsAll());
    setIsRefreshing(false);
  };

  useEffect(() => {
    handleRefresh();
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

  const handleItemClick = (item: Session) => {
    navigation.navigate('PracticePreview', {session: item});
  };

  const renderMeditationItem = ({item}: any) => (
    <View key={item.id} style={styles.favoritesItem}>
      <View style={styles.imageContentSubtop}>
        <SvgDuration />
        <Text style={styles.titleColor}>{item.duration}</Text>
      </View>
      <View style={{flexDirection: 'row', columnGap: 15, marginHorizontal: 25}}>
        <Image style={styles.imageFav} source={{uri: item.imageUrl}} />
        <View style={styles.favoritesItemSecondary}>
          <Text style={styles.textFav}>{item.title}</Text>
          <View style={styles.favoritesItemSecondaryBottom}>
            <TouchableOpacity
              style={styles.btnFav}
              onPress={() => handleItemClick(item)}>
              <Text>Start</Text>
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
    </View>
  );

  return (
    <FlatList
      data={sessions}
      renderItem={renderMeditationItem}
      keyExtractor={item => item._id}
      style={styles.mainWrapper}
      showsVerticalScrollIndicator={false}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      ListHeaderComponent={
        <>
          {selectedImageUrl && (
            <Image style={styles.image} source={{uri: selectedImageUrl}} />
          )}
          <View style={styles.topNav}>
            <TouchableOpacity
              style={styles.goBackBtnStyle}
              onPress={() => navigation.goBack()}>
              <SvgBack stroke="#fff" />
            </TouchableOpacity>
          </View>

          {selectedYoga && (
            <>
              <View style={styles.secondaryCollectionWrapper}>
                <Text style={styles.textCollFirst}>{selectedYoga.title}</Text>
                <Text style={styles.textCollSecond}>
                  {selectedYoga.subtitle}
                </Text>
                <Text style={styles.textCollThird}>
                  {selectedYoga.description}
                </Text>
              </View>
            </>
          )}
        </>
      }
    />
  );
};

export default PracticesCollectionScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  secondaryCollectionWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 7,
    textAlign: 'center',
  },
  textCollFirst: {
    color: '#8F6FFE',
    fontSize: 16,
    fontWeight: '600',
  },
  textCollSecond: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  textCollThird: {
    fontSize: 16,
    width: '100%',
    textAlign: 'justify',
  },
  secondaryWrapper: {
    paddingVertical: 20,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: '500',
  },
  favoritesItem: {
    columnGap: 15,
    flexDirection: 'row',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.2,
    paddingBottom: 20,
    paddingTop: 25,
  },
  imageContentSubtop: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'center',
    position: 'absolute',
    top: 38,
    left: 35,
    zIndex: 1,
  },
  imageFav: {
    width: 150,
    height: 100,
    borderRadius: 15,
    // resizeMode: 'center',
  },
  textFav: {
    fontSize: 16,
    width: '90%',
  },
  titleColor: {
    color: '#fff',
    fontSize: 14,
  },
  textType: {
    alignItems: 'center',
    color: 'gray',
    paddingBottom: 6,
    fontSize: 12,
  },
  favoritesItemSecondary: {
    justifyContent: 'space-between',
  },
  favoritesItemSecondaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnFav: {
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: 110,
    marginRight: 10,
  },
  goBackBtnStyle: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.2)',
    backgroundColor: 'rgba(229,222,255, 0.2)',
    padding: 5,
    marginLeft: 20,
  },
  settingsStyle: {
    borderRadius: 80,
    borderWidth: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
    marginRight: 20,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 60,
    position: 'absolute',
    width: '100%',
  },
});
