import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheetComponent from '../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SvgCheckBox from '../../assets/CheckBoxicon';
import SvgCheckBoxFill from '../../assets/CheckBoxiconFilled';
import SvgProfile from '../../assets/Profile';

const MeditationsScreen = ({navigation}: any) => {
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

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <View style={styles.iconsHeader}>
          <TouchableOpacity
            style={styles.profileStyle}
            onPress={() => navigation.navigate('ProfileScreen')}>
            <SvgProfile stroke="#E5DEFF" fill="transparent" />
          </TouchableOpacity>
          <View style={styles.centerContainer}>
            <Text style={styles.textCategory}>Meditation 🧘‍♀️</Text>
          </View>
        </View>
        <View style={styles.primaryContent}>
          {/* render item will start here  */}
          <TouchableOpacity
            style={styles.mainCollectionWrapper}
            onPress={() => navigation.navigate('MeditationsCollection')}>
            <Image
              style={styles.image}
              source={require('../../assets/test.png')}
            />
            <View style={styles.secondaryCollectionWrapper}>
              <Text style={styles.textCollFirst}>10 meditations</Text>
              <Text style={styles.textCollSecond}>Remember to breathe</Text>
              <Text style={styles.textCollThird}>
                Bring awareness Back onto the menu. Reconnect with yourself
              </Text>
            </View>
          </TouchableOpacity>
          {/* render item will end here  */}
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
                  <SvgCheckBox />
                ) : (
                  <>
                    <Text style={styles.selectedItem}>✓</Text>
                    <SvgCheckBoxFill />
                  </>
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
  bellStyle: {
    marginBottom: 25,
    borderRadius: 80,
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    fontWeight: '700',
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
  },
  image: {
    width: '100%',
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
});

export default MeditationsScreen;
