import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import SvgLikeIcon from '../../../assets/LikeIcon';
import SvgBack from '../../../assets/BackIcon';
import SvgDuration from '../../../assets/DurationIcon';

const dummydata = [
  {
    id: '1',
    subtitle: 'Remember to breathe',
    author: 'by Adriene',
    duration: '10:00',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
    imgUrl:
      'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
  },
  {
    id: '2',
    subtitle: 'Remember to sleep',
    author: 'by Adriene',
    duration: '10:00',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
    imgUrl:
      'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
  },
  {
    id: '3',
    subtitle: 'Remember to live',
    author: 'by Adriene',
    duration: '10:00',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
    imgUrl:
      'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
  },
  {
    id: '4',
    subtitle: 'Remember to be special',
    author: 'by Adriene',
    duration: '10:00',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
    imgUrl:
      'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
  },
];

const MeditationsCollectionScreen = ({navigation, route}: any) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);
  const selectedImageUrl = route.params?.selectedImageUrl || null;

  const renderMeditationItem = ({item}: any) => (
    <View key={item.id} style={styles.favoritesItem}>
      <View style={styles.imageContentSubtop}>
        <SvgDuration />
        <Text style={styles.titleColor}>{item.duration}</Text>
      </View>
      <View style={{flexDirection: 'row', columnGap: 15, marginHorizontal: 25}}>
        <Image style={styles.imageFav} source={{uri: item.imgUrl}} />
        <View style={styles.favoritesItemSecondary}>
          <Text style={styles.textFav}>{item.subtitle}</Text>
          <View style={styles.favoritesItemSecondaryBottom}>
            <TouchableOpacity
              style={styles.btnFav}
              onPress={() => navigation.navigate('PracticePreview')}>
              <Text>Listen</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgLikeIcon fill="#815cff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={dummydata}
      renderItem={renderMeditationItem}
      keyExtractor={item => item.id}
      style={styles.mainWrapper}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {selectedImageUrl && (
            <Image style={styles.image} source={{uri: selectedImageUrl}} />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              top: 30,
              position: 'absolute',
              width: '100%',
            }}>
            <TouchableOpacity
              style={styles.goBackBtnStyle}
              onPress={() => navigation.goBack()}>
              <SvgBack stroke="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.secondaryCollectionWrapper}>
            <Text style={styles.textCollFirst}>10 meditations</Text>
            <Text style={styles.textCollSecond}>Remember to breathe</Text>
            <Text style={styles.textCollThird}>
              Bring awareness Back onto the menu. Reconnect with yourself
            </Text>
          </View>
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
    top: 35,
    left: 10,
    zIndex: 1,
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
    borderColor: 'rgba(229,222,255, 0.2)',
    backgroundColor: 'rgba(229,222,255, 0.2)',
    padding: 5,
    marginLeft: 20,
  },
});
