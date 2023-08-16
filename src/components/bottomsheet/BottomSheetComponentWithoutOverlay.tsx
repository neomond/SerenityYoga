import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isVisible: boolean;
  toggleBottomSheet: () => void;
  children: React.ReactNode;
  showHandleIndicator?: boolean;
  snapPoints?: string[];
}

const BottomSheetComponentWithoutOverlay: React.FC<BottomSheetProps> = ({
  isVisible,
  toggleBottomSheet,
  children,
  showHandleIndicator = true,
  snapPoints = ['25%', '60%'],
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChange = (index: number) => {
    console.log('Sheet index:', index);
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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

export default BottomSheetComponentWithoutOverlay;
