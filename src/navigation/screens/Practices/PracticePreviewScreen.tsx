import {
  Image,
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
        snapPoints={['25%', '27%', '80%']}
        toggleBottomSheet={() => {
          console.log('meow');
        }}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomshtopCont}>
            <View>
              <Text style={styles.bottomshHeaderText}>Morning Yoga Flow</Text>
              <Text>with Elly</Text>
            </View>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../../../assets/test.png')}
            />
          </View>
          <TouchableOpacity style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#f5f5f5',
            width: '100%',
            height: '100%',
          }}>
          <View style={styles.descFirst}>
            <View>
              <Text>10 min</Text>
            </View>
            <View>
              <Text>Low intensity</Text>
            </View>
          </View>

          <Text style={{marginHorizontal: 20, fontSize: 16}}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
            sequi nisi illum quisquam doloribus quasi ut, eos deleniti
            recusandae natus magnam, corporis quaerat commodi numquam
            blanditiis, nobis a impedit dolor. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.Namaste
          </Text>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <Text style={styles.bottomshHeaderText}>Workout Structure</Text>
            <View
              style={{
                marginTop: 12,
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 18,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text>🧘‍♀️ Workout</Text>
                <Text>10 min</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 18,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>😌 Shavasana meditation</Text>
                <Text>5 min</Text>
              </View>
            </View>
          </View>
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
  bottomshHeaderText: {fontSize: 20, fontWeight: '600', paddingBottom: 5},
  bottomshtopCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startBtn: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#815cff',
    paddingVertical: 15,
    borderRadius: 30,
  },
  startBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
  descFirst: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 25,
    flexDirection: 'row',
    columnGap: 20,
    // justifyContent: 'space-between',
    borderRadius: 20,
  },
});
