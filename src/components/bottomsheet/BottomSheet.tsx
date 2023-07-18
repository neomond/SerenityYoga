import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isVisible: boolean;
  toggleBottomSheet: () => void;
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  isVisible,
  toggleBottomSheet,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['25%', '60%'];

  useEffect(() => {
    if (!isVisible) {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChange = (index: number) => {
    console.log('Sheet index:', index);
  };

  const handleBackdropPress = () => {
    toggleBottomSheet();
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableOpacity style={styles.backdrop} onPress={handleBackdropPress} />
      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 1 : 0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            This is the Bottom Sheet content.
          </Text>
          <TouchableOpacity onPress={toggleBottomSheet}>
            <Text style={styles.closeButton}>Continue</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default BottomSheetComponent;
