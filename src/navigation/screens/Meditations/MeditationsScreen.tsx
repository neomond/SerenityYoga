import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {
  fetchMeditations,
  getMeditations,
} from '../../../redux/slices/MeditationSlice';

const MeditationsScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const meditations = useSelector((state: RootState) => getMeditations(state));

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMeditations());
  }, [dispatch]);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={styles.mainCollectionWrapper}
        onPress={() => {
          setSelectedImageUrl(item.imgUrl);
          navigation.navigate('MeditationsCollection', {
            selectedMeditation: item,
            selectedImageUrl: item.imgUrl,
          });
        }}>
        <View style={styles.shadowForImage}></View>
        <Image style={styles.image} source={{uri: item.imgUrl}} />
        <View style={styles.secondaryCollectionWrapper}>
          <Text style={styles.textCollFirst}>{item.title}</Text>
          <Text style={styles.textType}>✦ {item.type}</Text>
          <Text style={styles.textCollSecond}>{item.subtitle}</Text>
          <Text style={styles.textCollThird}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#C17BFA', '#7F7DFA', '#8283FC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <View style={styles.iconsHeader}>
          <Text style={styles.textCategory}>Meditations 🧘‍♀️</Text>
        </View>
        <View style={styles.primaryContent}>
          {meditations.meditations.map(item => renderItem({item}))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  iconsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  primaryContent: {
    rowGap: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 30,
    height: '100%',
  },
  textCategory: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  mainCollectionWrapper: {
    borderWidth: 1,
    marginHorizontal: 25,
    borderRadius: 20,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
    paddingBottom: 8,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  secondaryCollectionWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    rowGap: 5,
  },
  textCollFirst: {
    color: '#8F6FFE',
    fontSize: 15,
    fontWeight: '600',
  },
  textCollSecond: {
    fontSize: 17,
    fontWeight: '500',
  },
  textCollThird: {
    fontSize: 15,
  },

  textType: {
    alignItems: 'center',
    color: 'gray',
  },
  shadowForImage: {
    height: 160,
    width: '100%',
    backgroundColor: 'rgba(255,255,255, 0.09)',
    position: 'absolute',
    zIndex: 99999,
    top: 0,
  },
});

export default MeditationsScreen;
