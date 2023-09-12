import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import SvgBack from '../../../assets/BackIcon';
import SvgSignOut from '../../../assets/SignoutIcon';
import {LogoutConfirmationModal} from './LogoutConfirmationModal';

export const ProfileHeader = ({
  navigation,
  onLogout,
  isLogoutModalVisible,
  toggleLogoutModal,
}: any) => {
  return (
    <View style={styles.iconsHeader}>
      <TouchableOpacity
        style={styles.favoritesMainContent}
        onPress={() => navigation.goBack()}>
        <SvgBack stroke="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Profile</Text>
      <View style={styles.favoritesMainContent}>
        <TouchableOpacity onPress={toggleLogoutModal}>
          <SvgSignOut stroke="#fff" />
        </TouchableOpacity>
      </View>
      <LogoutConfirmationModal
        isVisible={isLogoutModalVisible}
        onClose={toggleLogoutModal}
        onLogout={onLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
