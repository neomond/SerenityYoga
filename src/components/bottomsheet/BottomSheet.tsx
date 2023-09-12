import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Modal, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isVisible: boolean;
  toggleBottomSheet: () => void;
  children: React.ReactNode;
  items?: string[];
  selectedItems?: string[];
  onItemSelect?: (item: string) => void;
  showHandleIndicator?: boolean;
  snapPoints?: string[];
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  isVisible,
  toggleBottomSheet,
  children,
  items = [],
  selectedItems = [],
  onItemSelect = () => {},
  showHandleIndicator = true,
  snapPoints = ['25%', '60%'],
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (!isVisible) {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChange = (index: number) => {
    // console.log('Sheet index:', index);
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
        handleIndicatorStyle={
          showHandleIndicator
            ? styles.handleIndicator
            : styles.handleIndicatorNone
        }>
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
  handleIndicatorNone: {
    backgroundColor: '#fff',
  },
});

export default BottomSheetComponent;

{
  /* <CheckBox
     disabled={false}
    value={isChecked}
    style={styles.checkbox}
    hideBox
    boxType="square"
    onValueChange={handleCheckboxChange}
    onCheckColor="#8866ff"
    /> */
}
