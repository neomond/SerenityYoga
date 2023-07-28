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

const PracticesCollectionScreen = ({navigation}: any) => {
  const dummydata = [
    {
      id: '1',
      subtitle: 'Remember to breathe',
      author: 'with Adriene',
      duration: '10:00',
      activityLevel: '✦ low intensity',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
    {
      id: '2',
      subtitle: 'Remember to sleep',
      activityLevel: '✦✦ middle intensity',
      author: 'with Adriene',
      duration: '10:00',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
    {
      id: '3',
      subtitle: 'Remember to live',
      author: 'with Adriene',
      duration: '10:00',
      activityLevel: '✦✦✦ high intensity',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
    {
      id: '4',
      subtitle: 'Remember to be special',
      activityLevel: '✦✦✦ high intensity',
      author: 'with Adriene',
      duration: '10:00',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
  ];

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
          <Text style={styles.textType}>{item.activityLevel}</Text>
          <View style={styles.favoritesItemSecondaryBottom}>
            <TouchableOpacity style={styles.btnFav}>
              <Text>Start</Text>
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
          <Image
            style={styles.image}
            source={require('../../../assets/test.png')}
          />
          <View style={styles.favoritesMainContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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

export default PracticesCollectionScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
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
  },
  textFav: {
    marginBottom: -5,
    fontSize: 16,
  },
  titleColor: {
    color: '#fff',
    fontSize: 14,
  },
  textType: {
    alignItems: 'center',
    color: 'gray',
    paddingBottom: 6,
  },
  favoritesItemSecondary: {
    justifyContent: 'center',
    rowGap: 10,
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
    marginTop: 40,
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
});
