import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgCloseIcon from '../../assets/CloseIcon';
import SvgLikeIcon from '../../assets/LikeIcon';
import SvgDuration from '../../assets/DurationIcon';
import {getEmojiForCategory} from '../../utils/emojis';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {fetchSessions, getSessions} from '../../redux/slices/SessionSlice';

const CategoryMoodScreen = ({navigation, route}: any) => {
  const {category} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector(getSessions);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);
  console.log('Sessions:', sessions);

  const categorySessions = sessions.filter(session => {
    return session.categories.some(cat => cat._id === category._id);
  });

  console.log('Category Sessions:', categorySessions);

  return (
    <ScrollView>
      <LinearGradient
        colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
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
        <View style={styles.primaryContent}>
          {categorySessions.map(c => (
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
                    <Text>Listen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <SvgLikeIcon fill="#815cff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default CategoryMoodScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 60,
  },
  primaryContent: {
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingBottom: 200,
    height: '100%',
  },
  iconsHeader: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  profileStyle: {
    marginBottom: 25,
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
