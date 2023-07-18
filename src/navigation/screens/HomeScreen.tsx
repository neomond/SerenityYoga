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
import {fetchCategories} from '../../redux/slices/CategoriesSlice';
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

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {categories} = useSelector((state: RootState) => state.categoriesSlice);
  const likedItems = useSelector(
    (state: RootState) => state.likedItemsSlice.likedItems,
  );
  const isLoading = useSelector(
    (state: RootState) => state.categoriesSlice.loading,
  );

  const handlePress = (dataItem: any) => {
    const isLiked = likedItems.some(item => item.key === dataItem.key);
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

  useEffect(() => {
    dispatch(fetchCategories());
    const loadLikedItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('likedItems');
        if (savedItems) {
          dispatch(setLikedItems(JSON.parse(savedItems)));
        }
      } catch (error) {
        console.log('Error loading liked items:', error);
      }
    };
    loadLikedItems();
  }, [dispatch]);

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.renderItemCont}>
        <View style={styles.renderItemContSecond}>
          <Text style={styles.categoryHeader}>{item.category}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailsScreen', {category: item})
            }>
            <Text style={styles.categoryHeaderSecond}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.data.map((dataItem: any) => {
            const isLiked = likedItems.some(item => item.key === dataItem.key);
            return (
              <View key={dataItem.key} style={styles.imageContainer}>
                <Image source={{uri: dataItem.image}} style={styles.image} />
                <Text style={styles.imageTitle}>{dataItem.title}</Text>
                <View style={styles.imageContentTop}>
                  <View style={styles.imageContentSubtop}>
                    <SvgDuration />
                    <Text style={styles.titleColor}>{dataItem.duration}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePress(dataItem)}>
                    <SvgLikeIcon
                      fill={isLiked ? '#815cff' : 'transparent'}
                      stroke={isLiked ? '#815cff' : '#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

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
        {/* <TouchableOpacity style={styles.bellStyle}>
          <SvgNotifications />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.headerText}>Welcome, Nazrin!</Text>
      <Text style={styles.subheaderText}>How are you feeling today?</Text>
      <View>
        <ScrollView
          style={styles.scrollCategories}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <Text style={styles.categoryText}>🤯 Stress</Text>
          <Text style={styles.categoryText}>🥵 Anxiety</Text>
          <Text style={styles.categoryText}>😖 Depression</Text>
          <Text style={styles.categoryText}>😨 Fear</Text>
          <Text style={styles.categoryText}>😢 Sadness</Text>
          <Text style={styles.categoryText}>😡 Anger</Text>
          <Text style={styles.categoryText}>😌 Calmness</Text>
          <Text style={styles.categoryText}>😄 Happiness</Text>
        </ScrollView>
      </View>
      <View style={styles.primaryContent}>
        {categories.length > 0 ? (
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        ) : (
          <View style={styles.noItemsContainer}>
            <View style={styles.flowerIcon}>
              <SvgFlower />
            </View>
            <Text style={styles.noItemsText}>No Categories.</Text>
          </View>
        )}
      </View>
    </LinearGradient>
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
    // width: 45,
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
    // width: 45,
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
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#fff',
    fontWeight: '600',
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
