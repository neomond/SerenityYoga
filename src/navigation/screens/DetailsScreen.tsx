import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgDuration from '../../assets/DurationIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import {addItem, removeItem} from '../../redux/slices/LikedItemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import SvgCloseIcon from '../../assets/CloseIcon';

const DetailsScreen = ({route, navigation}: any) => {
  // to not show bottom bar in this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);
  /////////////////////////////

  const dispatch = useDispatch<AppDispatch>();
  const likedItems = useSelector(
    (state: RootState) => state.likedItemsSlice.likedItems,
  );
  const {category} = route.params;

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isLiked = likedItems.some(likedItem => likedItem.key === item.key);

    const handlePress = (dataItem: any) => {
      if (isLiked) {
        dispatch(removeItem(dataItem.key));
        AsyncStorage.setItem(
          'likedItems',
          JSON.stringify(likedItems.filter(item => item.key !== dataItem.key)),
        ).catch(error => console.log('Error removing item:', error));
      } else {
        dispatch(addItem(dataItem));
        AsyncStorage.setItem(
          'likedItems',
          JSON.stringify([...likedItems, dataItem]),
        ).catch(error => console.log('Error adding item:', error));
      }
    };

    return (
      <View style={styles.mainWrapper}>
        <Image source={{uri: item.image}} style={styles.categoryImages} />
        <Text style={styles.imageTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.playBtn}>
          <Text style={{fontSize: 14}}>More Info</Text>
        </TouchableOpacity>

        <View style={styles.imageContentTop}>
          <View style={styles.imageContentSubtop}>
            <SvgDuration />
            <Text style={styles.titleColor}>{item.duration}</Text>
          </View>
          <TouchableOpacity onPress={() => handlePress(item)}>
            <SvgLikeIcon
              style={{marginLeft: 45}}
              fill={isLiked ? '#815cff' : 'transparent'}
              stroke={isLiked ? '#815cff' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
      start={{x: 0, y: 0.2}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.headerTop}>
        <Text style={styles.textCategory}>{category.category} ✨</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeIconStyle}>
          <SvgCloseIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.primaryContent}>
        <FlatList
          data={category.data}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.key}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    marginBottom: 20,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.2,
    paddingBottom: 15,
  },
  linearGradient: {
    paddingTop: 90,
  },
  primaryContent: {
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  textCategory: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 20,
    marginRight: 10,
  },
  categoryImages: {
    width: 320,
    height: 170,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 5,
    position: 'absolute',
    bottom: 28,
    left: 15,
    color: '#fff',
    fontSize: 14,
    width: 95,
    fontWeight: '700',
    alignItems: 'center',
    backgroundColor: 'rgba(229,222,255, 0.2)',
    borderColor: 'rgba(229,222,255, 0)',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  imageContentTop: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 18,
    left: 15,
    columnGap: 160,
  },
  imageContentSubtop: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'center',
  },
  titleColor: {
    color: '#fff',
    fontSize: 14,
  },
  playBtn: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    borderRadius: 25,
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#E5DEFF',
    width: 105,
    marginRight: 10,
  },
  closeIconStyle: {
    marginBottom: 25,
    marginLeft: 20,
    borderRadius: 80,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
    marginleft: 120,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 30,
    paddingLeft: 110,
  },
});
