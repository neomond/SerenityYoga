import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SvgLikeIcon from '../../../assets/LikeIcon';
import SvgDuration from '../../../assets/DurationIcon';
import SvgBack from '../../../assets/BackIcon';
import SvgSetting from '../../../assets/SettingsIcon';
import BottomSheetComponent from '../../../components/bottomsheet/BottomSheet';
import {useEffect, useState} from 'react';
import SvgCheckBox from '../../../assets/CheckBoxicon';
import SvgCheckBoxFill from '../../../assets/CheckBoxiconFilled';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const PracticesCollectionScreen = ({navigation}: any) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
      unsubscribe();
    };
  }, [navigation]);

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
        'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
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
        'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
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
        'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
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
        'https://img.freepik.com/premium-photo/abstract-creative-background-using-your-project-ui-ux-design_155807-1066.jpg',
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
        <GestureHandlerRootView>
          <Image
            style={styles.image}
            source={require('../../../assets/test.png')}
          />
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
            <TouchableOpacity
              style={styles.settingsStyle}
              onPress={toggleBottomSheet}>
              <SvgSetting />
            </TouchableOpacity>
          </View>
          <View style={styles.secondaryCollectionWrapper}>
            <Text style={styles.textCollFirst}>10 meditations</Text>
            <Text style={styles.textCollSecond}>Remember to breathe</Text>
            <Text style={styles.textCollThird}>
              Bring awareness Back onto the menu. Reconnect with yourself
            </Text>
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
        </GestureHandlerRootView>
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
    fontSize: 12,
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
  goBackBtnStyle: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.2)',
    backgroundColor: 'rgba(229,222,255, 0.2)',
    padding: 5,
    marginLeft: 20,
  },
  settingsStyle: {
    borderRadius: 80,
    borderWidth: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
    marginRight: 20,
  },

  // bottom sheet
  bottomSheetContent: {
    flexDirection: 'column',
    marginTop: 20,
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
  closeButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
  },
});
