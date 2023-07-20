import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ScreenOpeningAnimation = ({children}: any) => {
  const screenOpacity = useSharedValue(0);

  useEffect(() => {
    // Define the animation timing and easing
    const animationConfig = {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    };

    // Start the screen opening animation
    screenOpacity.value = withTiming(1, animationConfig);
  }, []);

  const getScreenAnimatedStyle = () => {
    return {
      opacity: screenOpacity.value,
      transform: [{scale: screenOpacity.value}], // Optional: Add more transformations here
    };
  };

  return (
    <Animated.View style={getScreenAnimatedStyle()}>{children}</Animated.View>
  );
};

export default ScreenOpeningAnimation;
