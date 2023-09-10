import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
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
  fetchYogas,
  getYogas,
  selectYogaLoading,
} from '../../../redux/slices/YogaSlice';
import {ActivityIndicator} from 'react-native-paper';
import HeaderAnimation from '../../../utils/HeaderAnimation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SvgSetting from '../../../assets/SettingsIcon';
import BottomSheetComponent from '../../../components/bottomsheet/BottomSheet';
import SvgCheckBox from '../../../assets/CheckBoxicon';
import SvgCheckBoxFill from '../../../assets/CheckBoxiconFilled';
import {
  fetchSessionsByType,
  setFilterType,
} from '../../../redux/slices/SessionSlice';

const PracticesScreen = ({navigation}: any) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const filterType = useSelector(
    (state: RootState) => state.sessions.filterType,
  );

  const yogas = useSelector((state: RootState) => getYogas(state));

  const isLoading = useSelector((state: RootState) => selectYogaLoading(state));

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const items = ['Basic', 'Morning', 'Evening', 'General'];

  const selectedItems = filterType ? [filterType] : [];

  const filteredYogas = useSelector((state: RootState) => {
    if (filterType) {
      return yogas.filter(yoga => yoga.type.toLowerCase() === filterType);
    }
    return yogas;
  });

  const handleItemSelect = (item: string) => {
    if (filterType === item.toLowerCase()) {
      dispatch(setFilterType(null));
    } else {
      dispatch(setFilterType(item.toLowerCase()));
      dispatch(fetchSessionsByType(item.toLowerCase()));
    }
  };

  useEffect(() => {
    dispatch(fetchYogas());
  }, [dispatch]);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={styles.mainCollectionWrapper}
        onPress={() => {
          setSelectedImageUrl(item.imgUrl);
          navigation.navigate('PracticeCollection', {
            selectedYoga: item,
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
      <GestureHandlerRootView>
        <LinearGradient
          colors={['#C17BFA', '#7F7DFA', '#8283FC']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}>
          <View style={styles.headerTop}>
            <Text style={styles.textCategory}>Yoga Sessions 🧘</Text>
            <TouchableOpacity
              style={styles.settingsStyle}
              onPress={toggleBottomSheet}>
              <SvgSetting />
            </TouchableOpacity>
          </View>
          <View style={styles.primaryContent}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <HeaderAnimation duration={1300}>
                {filteredYogas.map(item => renderItem({item}))}
              </HeaderAnimation>
            )}
          </View>
        </LinearGradient>
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
                {selectedItems.includes(item.toLowerCase()) ? (
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
    height: '1000%',
  },
  textCategory: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  mainCollectionWrapper: {
    borderWidth: 1,
    marginHorizontal: 25,
    borderRadius: 20,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
    paddingBottom: 8,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: 'cover',
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
  settingsStyle: {
    borderRadius: 80,
    borderWidth: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderColor: 'rgba(255,255,255, 0.1)',
    marginRight: 20,
    marginBottom: 20,
  },

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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 30,
    paddingLeft: 110,
  },
});

export default PracticesScreen;
