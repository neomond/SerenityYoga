import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BottomSheetComponent from '../../../components/bottomsheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SvgBack from '../../../assets/BackIcon';

const PracticePreviewScreen = ({navigation}: any) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/test.png')}
        style={styles.backgroundImage}>
        <View style={styles.topBackBtn}>
          <TouchableOpacity
            style={styles.goBackBtnStyle}
            onPress={() => navigation.goBack()}>
            <SvgBack stroke="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <BottomSheetComponent
        isVisible={true}
        snapPoints={['25%', '20%', '80%']}
        toggleBottomSheet={() => {
          console.log('meow');
        }}>
        <View style={styles.bottomSheetContent}>
          <Text>Bottom Sheet Content</Text>
        </View>
      </BottomSheetComponent>
    </GestureHandlerRootView>
  );
};

export default PracticePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  goBackBtnStyle: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.2)',
    backgroundColor: 'rgba(229,222,255, 0.2)',
    padding: 5,
    marginLeft: 20,
  },
  topBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 60,
    position: 'absolute',
    width: '100%',
  },
});
