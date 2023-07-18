import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Modal} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isVisible: boolean;
  toggleBottomSheet: () => void;
  children: React.ReactNode;
  items: string[]; // Pass the array of items
  selectedItems: string[]; // Pass the array of selected items
  onItemSelect: (item: string) => void; // Handle item selection
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  isVisible,
  toggleBottomSheet,
  children,
  items,
  selectedItems,
  onItemSelect,
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
        {children}
      </BottomSheet>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default BottomSheetComponent;
