import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgLikeIcon from '../../../assets/LikeIcon';
import SvgBack from '../../../assets/BackIcon';
import SvgDuration from '../../../assets/DurationIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';

import {fetchMeditationSessions} from '../../../redux/slices/MeditationSessions';
import {
  addItem,
  getLikes,
  removeItem,
} from '../../../redux/slices/LikedItemsSlice';
import {Session} from '../../../models/Session';

const MeditationsCollectionScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedImageUrl = route.params?.selectedImageUrl || null;
  const selectedMeditation = route.params?.selectedMeditation || null;
  const selectedRelatedSessions = selectedMeditation?.relatedSessions || [];

  const likedItems = useSelector((state: RootState) => getLikes(state));
  console.log(selectedRelatedSessions, 'RELATED MEDITATIONS');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation, dispatch, route]);

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchMeditationSessions()).then(() => {
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    handleRefresh();
  }, [dispatch]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderMeditationItem = ({item}: any) => (
    <View key={item._id} style={styles.favoritesItem}>
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
              onPress={() =>
                navigation.navigate('MeditationsPlayer', {
                  selectedMeditation: item,
                })
              }>
              <Text>Listen</Text>
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
      data={selectedRelatedSessions}
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
          <View style={styles.backIcon}>
            <TouchableOpacity
              style={styles.goBackBtnStyle}
              onPress={() => navigation.goBack()}>
              <SvgBack stroke="#fff" />
            </TouchableOpacity>
          </View>

          {selectedMeditation && (
            <>
              <View style={styles.secondaryCollectionWrapper}>
                <Text style={styles.textCollFirst}>
                  {selectedMeditation.title}
                </Text>
                <Text style={styles.textCollSecond}>
                  {selectedMeditation.subtitle}
                </Text>
                <Text style={styles.textCollThird}>
                  {selectedMeditation.description}
                </Text>
              </View>
            </>
          )}
        </>
      }
    />
  );
};

export default MeditationsCollectionScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  secondaryCollectionWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 5,
  },
  textCollFirst: {
    color: '#8F6FFE',
    fontSize: 16,
    fontWeight: '600',
  },
  textCollSecond: {
    fontSize: 18,
    fontWeight: '500',
  },
  textCollThird: {
    fontSize: 16,
  },
  secondaryWrapper: {
    paddingVertical: 20,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: '500',
  },
  favoritesItem: {
    columnGap: 30,
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
  },
  textFav: {
    fontSize: 16,
    width: '95%',
  },
  titleColor: {
    color: '#fff',
    fontSize: 14,
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
  favoritesMainContent: {
    position: 'absolute',
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.2)',
    backgroundColor: 'rgba(229,222,255, 0.2)',
    padding: 5,
  },
  goBackBtnStyle: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.4)',
    backgroundColor: 'rgba(229,222,255, 0.4)',
    padding: 5,
    marginLeft: 20,
  },
  backIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 30,
    position: 'absolute',
    width: '100%',
  },
});
