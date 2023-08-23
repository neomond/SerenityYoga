import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useUnsubscribe} from '../../../utils/unsubscribe';

interface LogoutConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const LogoutConfirmationModal: React.FC<
  LogoutConfirmationModalProps
> = ({isVisible, onClose, onLogout}) => {
  useUnsubscribe();
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: '#fff',
                    borderColor: '#000',
                    borderWidth: 1,
                  },
                ]}
                onPress={onClose}>
                <Text style={[styles.modalButtonText, {color: '#000'}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={onLogout}>
                <Text style={styles.modalButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 25,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 35,
    backgroundColor: '#815cff',
    width: 140,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
