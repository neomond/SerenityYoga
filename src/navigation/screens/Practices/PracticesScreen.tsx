import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSettings from '../../../assets/SettingsIcon';
import BottomSheetComponent from '../../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SvgCheckBox from '../../../assets/CheckBoxicon';
import SvgCheckBoxFill from '../../../assets/CheckBoxiconFilled';

const PracticesScreen = ({navigation}: any) => {
  const dummydata = [
    {
      id: '1',
      title: '10 sessions',
      subtitle: 'Remember to breathe',
      type: 'basic',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
    {
      id: '2',
      title: '5 sessions',
      subtitle: 'Remember to sleep',
      type: 'evening',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
    {
      id: '3',
      title: '8 sessions',
      subtitle: 'Remember to live',
      type: 'morning',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
    {
      id: '4',
      title: '3 sessions',
      subtitle: 'Remember to be special',
      type: 'special',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, doloribus',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    },
  ];

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const items = ['Basic', 'Morning', 'Evening', 'General'];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.mainCollectionWrapper}
        onPress={() => navigation.navigate('PracticeCollection')}>
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
    <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
          start={{x: 0, y: 0.2}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}>
          <View style={styles.iconsHeader}>
            <TouchableOpacity
              style={styles.profileStyle}
              onPress={toggleBottomSheet}>
              <SvgSettings stroke="#E5DEFF" fill="transparent" />
            </TouchableOpacity>
            <View style={styles.centerContainer}>
              <Text style={styles.textCategory}>Yoga 🧘‍♀️</Text>
            </View>
          </View>

          <View style={styles.primaryContent}>
            {dummydata.map(item => renderItem({item}))}
          </View>

          <BottomSheetComponent
            isVisible={isBottomSheetVisible}
            toggleBottomSheet={toggleBottomSheet}
            items={items}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}>
            <View style={styles.bottomSheetContent}>
              {items.map(item => (
                <Pressable
                  key={item}
                  style={styles.checkboxItem}
                  onPress={() => handleItemSelect(item)}>
                  <Text style={{fontSize: 16}}>{item}</Text>
                  {selectedItems.includes(item) ? (
                    <>
                      <Text style={styles.selectedItem}>✓</Text>
                      <SvgCheckBoxFill />
                    </>
                  ) : (
                    <SvgCheckBox />
                  )}
                </Pressable>
              ))}
              <TouchableOpacity
                onPress={toggleBottomSheet}
                style={styles.continueBtn}>
                <Text style={styles.closeButton}>Continue</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetComponent>
        </LinearGradient>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 60,
  },
  profileStyle: {
    marginBottom: 20,
    borderRadius: 80,
    borderWidth: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
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
    paddingVertical: 40,
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetContent: {
    flexDirection: 'column',
    marginTop: 20,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
  },
  checkboxItem: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    marginBottom: 12,
  },
  selectedItem: {
    position: 'absolute',
    right: '7%',
    zIndex: 999,
    color: '#fff',
  },
  continueBtn: {
    backgroundColor: '#8F6FFE',
    marginHorizontal: 25,
    borderRadius: 30,

    marginTop: 20,
  },
  textType: {
    alignItems: 'center',
    color: 'gray',
  },
  shadowForImage: {
    height: 160,
    width: '100%',
    backgroundColor: 'rgba(255,255,255, 0.18)',
    position: 'absolute',
    zIndex: 99999,
    top: 0,
  },
});

export default PracticesScreen;
