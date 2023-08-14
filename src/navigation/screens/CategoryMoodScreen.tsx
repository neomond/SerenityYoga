import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgCloseIcon from '../../assets/CloseIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import SvgDuration from '../../assets/DurationIcon';
import {getEmojiForCategory} from '../../utils/emojis';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {fetchSessions, getSessions} from '../../redux/slices/SessionSlice';
import {ActivityIndicator} from 'react-native-paper';

import HeaderAnimation from '../../utils/HeaderAnimation';
import {fetchCategories} from '../../redux/slices/CategoriesSlice';
import {Session} from '../../models/Session';
import {
  addItem,
  getLikes,
  removeItem,
} from '../../redux/slices/LikedItemsSlice';

const CategoryMoodScreen = ({navigation, route}: any) => {
  const {category} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector(getSessions);
  const isLoading = useSelector((state: RootState) => state.sessions.loading);
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

  useEffect(() => {
    dispatch(fetchSessions(category._id));
  }, [dispatch]);

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

  //   console.log('Sessions:', sessions);

  //   const categorySessions = sessions.filter(session => {
  //     return session.categories.some(cat => cat._id === category._id);
  //   });

  //   console.log('Category Sessions:', categorySessions);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <HeaderAnimation duration={1300}>
          <View style={styles.iconsHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.profileStyle}>
              <SvgCloseIcon stroke="#E5DEFF" fill="transparent" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>
            {category.name} {''}
            {getEmojiForCategory(category.name)}
          </Text>
          <Text style={styles.subheaderText}>{category.description}</Text>
        </HeaderAnimation>
        <View style={[styles.primaryContent]}>
          <HeaderAnimation duration={2000}>
            {sessions.map(c => (
              <View style={styles.favoritesItem} key={c._id}>
                <View style={styles.imageContentSubtop}>
                  <SvgDuration />
                  <Text style={styles.titleColor}>{c.duration}</Text>
                </View>
                <Image style={styles.imageFav} source={{uri: c.imageUrl}} />
                <View style={styles.favoritesItemSecondary}>
                  <Text style={styles.textFav}>{c.title}</Text>
                  <View style={styles.favoritesItemSecondaryBottom}>
                    <TouchableOpacity style={styles.btnFav}>
                      <Text>
                        {category.name === 'Meditation' ? 'Listen' : 'Play'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLikeItem(c)}>
                      <SvgLikeIcon
                        fill={isItemLiked(c) ? '#E5DEFF' : 'transparent'}
                        stroke={isItemLiked(c) ? '#815cff' : '#E5DEFF'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </HeaderAnimation>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default CategoryMoodScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  primaryContent: {
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    height: '200%',
  },
  iconsHeader: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  profileStyle: {
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    marginRight: 20,
    borderRadius: 80,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
  },
  headerText: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
  },
  subheaderText: {
    color: '#fff',
    fontWeight: '300',
    marginHorizontal: 20,
    fontSize: 16,
    marginBottom: 25,
    width: '85%',
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
    maxWidth: 170,
  },
  favoritesItemSecondary: {
    justifyContent: 'space-between',
  },
  favoritesItemSecondaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  btnFav: {
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: 110,
    marginRight: 10,
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
  titleColor: {
    color: '#fff',
    fontSize: 14,
  },
});

// const isItemLiked = (item: Session) => {
//   const likedItems = useSelector(
//     (state: RootState) => state.likedItemsSlice.likedItems,
//   );
//   return likedItems.some(likedItem => likedItem._id === item._id);
// };

// const handleLikeItem = (item: Session) => {
//   if (isItemLiked(item)) {
//     dispatch(removeItem(item._id));
//   } else {
//     dispatch(addItem(item));
//   }
// };
