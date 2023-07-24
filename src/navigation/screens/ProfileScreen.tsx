import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SvgBack from '../../assets/BackIcon';
import SvgProfSettingsIcn from '../../assets/ProfSettingsIcn';

const ProfileScreen = ({navigation}: any) => {
  return (
    <LinearGradient
      colors={['#62CBF7', '#6EC3FA', '#6DB9FE', '#6EBAFE']}
      start={{x: 0, y: 0.2}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <View style={styles.iconsHeader}>
        <View style={styles.favoritesMainContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgBack stroke="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.favoritesMainContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgProfSettingsIcn stroke="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.primaryContent}></View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 60,
  },
  iconsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  favoritesMainContent: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(229,222,255, 0.3)',
    backgroundColor: 'rgba(229,222,255, 0.3)',
    padding: 5,
  },
  headerText: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 20,
    marginRight: 10,
  },
});
