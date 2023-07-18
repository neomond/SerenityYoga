import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Modal, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isVisible: boolean;
  toggleBottomSheet: () => void;
  children: React.ReactNode;
  items: string[];
  selectedItems: string[];
  onItemSelect: (item: string) => void;
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
        onChange={handleSheetChange}
        handleIndicatorStyle={styles.handleIndicator}>
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
  handleIndicator: {
    height: 4,
    width: 50,
    borderRadius: 2,
    marginTop: 15,
  },
});

export default BottomSheetComponent;
