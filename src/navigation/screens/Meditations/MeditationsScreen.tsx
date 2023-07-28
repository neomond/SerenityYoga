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
    <LinearGradient
      colors={['#c47afb', '#A07AFA', '#8380fb', '#8866ff']}
      start={{x: 0, y: 0.2}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.iconsHeader}>
        <Text style={styles.textCategory}>Meditations 🧘‍♀️</Text>
      </View>
      <View style={styles.primaryContent}>
        {/* render item will start here  */}
        <TouchableOpacity
          style={styles.mainCollectionWrapper}
          onPress={() => navigation.navigate('MeditationsCollection')}>
          <Image
            style={styles.image}
            source={require('../../../assets/test.png')}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 60,
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
});

export default MeditationsScreen;
