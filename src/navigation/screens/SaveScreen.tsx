import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import SvgBack from '../../assets/BackIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import SvgDownload from '../../assets/DownloadIcon';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';

const SaveScreen = ({navigation}: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const handlePress = () => {
    setIsLiked(!isLiked);
  };
  const likedItems = useSelector(
    (state: RootState) => state.likedItemsSlice.likedItems,
  );

  //   <View>
  //   {likedItems.map((item) => (
  //     <Text key={item.key}>{item.title}</Text>
  //   ))}
  // </View>
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.favoritesMainContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgBack />
        </TouchableOpacity>
        <Text style={styles.textMain}>Favorites</Text>
        <Text>✨</Text>
      </View>
      <View>
        <View style={styles.renderItemContSecond}>
          <Text style={styles.categoryHeader}>Yoga</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsScreen')}>
            <Text style={styles.categoryHeaderSecond}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.favoritesItem}>
          <Image
            style={styles.imageFav}
            source={require('../../assets/test.png')}
          />
          <View style={styles.favoritesItemSecondary}>
            <Text style={styles.textFav}>Morning Yoga</Text>
            <View style={styles.favoritesItemSecondaryBottom}>
              <TouchableOpacity style={styles.btnFav}>
                <Text>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SvgDownload />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePress}>
                <SvgLikeIcon fill={isLiked ? '#815cff' : 'transparent'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
    paddingBottom: 25,
  },
  imageFav: {
    width: 150,
    height: 100,
    borderRadius: 15,
  },
  textFav: {
    fontSize: 18,
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
});
