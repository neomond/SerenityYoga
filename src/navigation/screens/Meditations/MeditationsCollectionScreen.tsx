import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SvgLikeIcon from '../../../assets/LikeIcon';
import SvgBack from '../../../assets/BackIcon';
import SvgDuration from '../../../assets/DurationIcon';

const MeditationsCollectionScreen = ({navigation}: any) => {
  return (
    <View style={styles.mainWrapper}>
      <ScrollView>
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
          <View style={styles.secondaryWrapper}>
            <Text style={styles.secondaryText}>
              Meditations in this collection
            </Text>
            {/* rendered item starts */}
            <View style={styles.favoritesItem}>
              <View style={styles.imageContentSubtop}>
                <SvgDuration />
                <Text style={styles.titleColor}>11:00</Text>
              </View>
              <Image
                style={styles.imageFav}
                source={require('../../../assets/test.png')}
              />

              <View style={styles.favoritesItemSecondary}>
                <Text style={styles.textFav}>Meow</Text>
                <View style={styles.favoritesItemSecondaryBottom}>
                  <TouchableOpacity
                    style={styles.btnFav}
                    // onPress={() => handlePlay(item)}
                  >
                    <Text>Start</Text>
                    {/* <Text>{pause === 'paused' ? 'Play' : 'Pause'}</Text> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                  // onPress={() => handleRemove(item)}
                  >
                    <SvgLikeIcon fill="#815cff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* rendered item ends */}
          </View>
        </View>
      </ScrollView>
    </View>
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
    marginTop: 70,
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
