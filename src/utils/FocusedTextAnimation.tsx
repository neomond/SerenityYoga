import React, {useState, useEffect} from 'react';
import {Text, Animated, Easing, View} from 'react-native';

export const FocusedText = ({focused, label}: any) => {
  const [translateX] = useState(new Animated.Value(0));

  useEffect(() => {
    if (focused) {
      Animated.timing(translateX, {
        toValue: 10,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View style={{transform: [{translateX}]}}>
      <Text
        style={{
          marginLeft: -6,
          fontSize: 11,
          color: '#815CFF',
          paddingRight: 10,
        }}>
        {label}
      </Text>
    </Animated.View>
  );
};
