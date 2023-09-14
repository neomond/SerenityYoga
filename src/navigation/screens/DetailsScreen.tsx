import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgDuration from '../../assets/DurationIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import {
  addItem,
  getLikes,
  removeItem,
} from '../../redux/slices/LikedItemsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import SvgCloseIcon from '../../assets/CloseIcon';
import {Session} from '../../models/Session';

const DetailsScreen = ({route, navigation}: any) => {
  const likedItems = useSelector((state: RootState) => getLikes(state));
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

  // const handleItemPress = (item: Session) => {
  //   navigation.navigate('PracticePreview', {session: item});
  // };
  const handleItemPress = (item: Session) => {
    if (item.title.toLowerCase().includes('meditation')) {
      navigation.navigate('MeditationsPlayer', {
        selectedMeditation: item,
        randomTrack: true,
      });
    } else {
      navigation.navigate('PracticePreview', {
        session: item,
      });
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const {randomSessions, meditationSessions} = route.params;

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isFirstItem = index === 0;
    return (
      <ScrollView
        style={[
          styles.mainWrapper,
          isFirstItem ? styles.mainWrapper : styles.otherItemsWrapper,
        ]}>
        <View style={styles.elevationLow}>
          <Image
            source={{uri: item.imageUrl}}
            style={[
              styles.categoryImages,
              isFirstItem ? styles.categoryImages : styles.otherCategoryImages,
            ]}
          />
        </View>
        <Text
          style={[
            styles.imageTitle,
            isFirstItem ? styles.imageTitle : styles.otherImageTitle,
          ]}>
          {item.title}
        </Text>
        <TouchableOpacity
          style={[
            styles.playBtn,
            isFirstItem ? styles.playBtn : styles.otherPlayBtn,
          ]}
          onPress={() => handleItemPress(item)}>
          {randomSessions ? (
            <Text style={{fontSize: 14}}>Play</Text>
          ) : (
            <Text style={{fontSize: 14}}>Listen</Text>
          )}
        </TouchableOpacity>

        <View
          style={[
            styles.imageContentTop,
            isFirstItem
              ? styles.imageContentSubtop
              : styles.otherImageContentSubtop,
          ]}>
          <View style={styles.imageContentSubtop}>
            <SvgDuration />
            <Text style={styles.titleColor}>{item.duration}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleLikeItem(item);
            }}>
            <SvgLikeIcon
              style={[
                styles.heartStyleMain,
                isFirstItem
                  ? styles.heartStyleMain
                  : styles.otherHeartStyleMain,
              ]}
              fill={isItemLiked(item) ? '#815cff' : 'transparent'}
              stroke={isItemLiked(item) ? '#E5DEFF' : '#E5DEFF'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <LinearGradient
      colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
      start={{x: 0, y: 0.2}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.headerTop}>
        {randomSessions ? (
          <Text style={styles.textCategory}>Try This ✨</Text>
        ) : (
          <Text style={styles.textCategory}>Meditate 🧘‍♀️</Text>
        )}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeIconStyle}>
          <SvgCloseIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.primaryContent}>
        <FlatList
          // style={{height: '100%'}}
          data={randomSessions ? randomSessions : meditationSessions}
          renderItem={renderItem}
          keyExtractor={(item: Session) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    marginBottom: 25,
    paddingBottom: 15,
  },
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 25 : 30,
  },
  primaryContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 80,
    alignItems: 'center',
    height: '100%',
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
  otherCategoryImages: {
    width: 150,
    height: 100,
    borderRadius: 15,
  },
  imageTitle: {
    marginTop: 5,
    position: 'absolute',
    bottom: 20,
    left: 15,
    color: '#fff',
    fontSize: 14,
    width: 135,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.5,
    alignItems: 'center',
    backgroundColor: 'rgba(229,222,255, 0.3)',
    borderColor: 'rgba(229,222,255, 0)',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 2,
    // paddingHorizontal: 8,
    overflow: 'hidden',
  },
  otherImageTitle: {
    color: '#000',
    backgroundColor: 'transparent',
    left: 170,
    top: -8,
    fontSize: 15,
    width: 150,
    textAlign: 'left',
  },
  imageContentTop: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 18,
    left: 15,
    columnGap: 140,
  },
  imageContentSubtop: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'center',
    paddingVertical: 2,
  },
  otherImageContentSubtop: {
    paddingVertical: 2,
    top: 8,
    left: 10,
  },
  titleColor: {
    color: '#fff',
    fontSize: 15,
    marginRight: 12,
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
  otherPlayBtn: {
    right: 30,
    bottom: 0,
    backgroundColor: '#f0f0f0',
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
  elevationLow: {
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
    }),
  },
  otherItemsWrapper: {
    marginBottom: 20,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  heartStyleMain: {left: 185},
  otherHeartStyleMain: {left: -110, top: 0},
});
