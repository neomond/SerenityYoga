import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
// import {fetchCategories} from '../../redux/slices/CategoriesSlice';
import {AppDispatch, RootState} from '../../redux';
import {ActivityIndicator} from 'react-native-paper';
import SvgProfile from '../../assets/Profile';
import SvgDuration from '../../assets/DurationIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import {
  addItem,
  removeItem,
  setLikedItems,
} from '../../redux/slices/LikedItemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgFlower from '../../assets/Flower';
import {emojis, getEmojiForCategory} from '../../utils/emojis';
import {
  fetchCategories,
  getCategories,
} from '../../redux/slices/CategoriesSlice';

import {
  fetchSessionsAll,
  getMeditationSessions,
  getRandomSessions,
  getSessions,
} from '../../redux/slices/SessionSlice';
import {Session} from '../../models/Session';

const HomeScreen = ({navigation}: any) => {
  // const hideTabBar = () => {
  //   navigation.setOptions({
  //     tabBarStyle: {display: 'none'},
  //   });
  // };
  const dispatch = useDispatch<AppDispatch>();
  const {categories} = useSelector(getCategories);
  const sessions = useSelector(getSessions);
  const randomSessions = useSelector((state: RootState) =>
    getRandomSessions(state),
  );
  console.log('random', randomSessions);

  const isLoading = useSelector((state: RootState) => state.sessions.loading);
  const meditationSessions = useSelector(getMeditationSessions);
  console.log('isLoading:', isLoading);
  // console.log('randomSessions:', randomSessions);
  console.log('sessions:', sessions);
  // console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSessionsAll());
  }, [dispatch]);

  // for random categories and sessions

  //////////////////////////////
  // const {categories} = useSelector((state: RootState) => state.categoriesSlice);
  // const likedItems = useSelector(
  //   (state: RootState) => state.likedItemsSlice.likedItems,
  // );
  // const isLoading = useSelector(
  //   (state: RootState) => state.categoriesSlice.loading,
  // );

  // const handlePress = (dataItem: any) => {
  //   const isLiked = likedItems.some(item => item.key === dataItem.key);
  //   if (isLiked) {
  //     dispatch(removeItem(dataItem.key));
  //     AsyncStorage.setItem(
  //       'likedItems',
  //       JSON.stringify(likedItems.filter(item => item.key !== dataItem.key)),
  //     ).catch(error => console.log('Error removing item:', error));
  //   } else {
  //     dispatch(addItem(dataItem));
  //     AsyncStorage.setItem(
  //       'likedItems',
  //       JSON.stringify([...likedItems, dataItem]),
  //     ).catch(error => console.log('Error adding item:', error));
  //   }
  // };

  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   const loadLikedItems = async () => {
  //     try {
  //       const savedItems = await AsyncStorage.getItem('likedItems');
  //       if (savedItems) {
  //         dispatch(setLikedItems(JSON.parse(savedItems)));
  //       }
  //     } catch (error) {
  //       console.log('Error loading liked items:', error);
  //     }
  //   };
  //   loadLikedItems();
  // }, [dispatch]);

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
    // <HeaderAnimation duration={1300}>
    <LinearGradient
      colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
      start={{x: 0, y: 0.2}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.iconsHeader}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={styles.profileStyle}>
          <SvgProfile stroke="#E5DEFF" fill="transparent" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Welcome, Nazrin!</Text>
      <Text style={styles.subheaderText}>How are you feeling today?</Text>
      <View>
        <ScrollView
          style={styles.scrollCategories}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {categories.map(category => (
            <TouchableOpacity
              key={category._id}
              onPress={() =>
                navigation.navigate('CategoryMoodScreen', {category})
              }>
              <Text style={styles.categoryText}>
                {getEmojiForCategory(category.name)} {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.primaryContent}>
        <View style={styles.renderItemCont}>
          <View style={styles.renderItemContSecond}>
            <Text style={styles.categoryHeader}>Try this</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsScreen', {randomSessions})
              }>
              <Text style={styles.categoryHeaderSecond}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {randomSessions.map((session: Session) => (
              <View style={styles.imageContainer} key={session._id}>
                <Image style={styles.image} source={{uri: session.imageUrl}} />
                <Text style={styles.imageTitle}>{session.title}</Text>
                <View style={styles.imageContentTop}>
                  <View style={styles.imageContentSubtop}>
                    <SvgDuration />
                    <Text style={styles.titleColor}>{session.duration}</Text>
                  </View>
                  <TouchableOpacity>
                    <SvgLikeIcon />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.renderItemCont}>
          <View style={styles.renderItemContSecond}>
            <Text style={styles.categoryHeader}>Meditate</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsScreen', {meditationSessions})
              }>
              <Text style={styles.categoryHeaderSecond}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {meditationSessions.map((meditate: Session) => (
              <View style={styles.imageContainer} key={meditate._id}>
                <Image style={styles.image} source={{uri: meditate.imageUrl}} />
                <Text style={styles.imageTitle}>{meditate.title}</Text>
                <View style={styles.imageContentTop}>
                  <View style={styles.imageContentSubtop}>
                    <SvgDuration />
                    <Text style={styles.titleColor}>{meditate.duration}</Text>
                  </View>
                  <TouchableOpacity>
                    <SvgLikeIcon />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
    // </HeaderAnimation>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 60,
  },
  profileStyle: {
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
  },
  bellStyle: {
    marginBottom: 25,
    marginLeft: 20,
    borderRadius: 80,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
    marginRight: 20,
  },
  iconsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleColor: {
    color: '#fff',
    fontSize: 14,
  },

  primaryContent: {
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingBottom: 200,
    height: '100%',
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
    marginBottom: 20,
  },
  scrollCategories: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  categoryText: {
    marginRight: 10,
    color: '#fff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 280,
    height: 160,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 12,
    letterSpacing: 1,
    width: 155,
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#fff',
    fontWeight: '500',
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
    top: 15,
    left: 15,
    columnGap: 160,
  },
  imageContentSubtop: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
  },
  renderItemCont: {
    paddingLeft: 20,
    paddingBottom: 20,
    // height: '200%',
  },
  renderItemContSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  categoryHeaderSecond: {
    color: '#929292',
    fontWeight: '400',
    paddingRight: 20,
  },
  noItemsContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 16,
    color: '#815CFF',
    fontWeight: '600',
  },
  flowerIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: -30,
    left: 0,
    zIndex: -1,
  },
});
