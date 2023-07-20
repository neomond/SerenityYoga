import {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const HeaderAnimation = ({children, duration}: any) => {
  const headerOpacity = useSharedValue(0);

  // Define the animation timing and easing
  const animationConfig = {
    duration: duration || 1000, // Use the provided duration or 1000 ms by default
    easing: Easing.inOut(Easing.ease),
  };

  useEffect(() => {
    // Start the header animation
    headerOpacity.value = withTiming(1, animationConfig);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  return (
    <Animated.View style={[headerAnimatedStyle]}>{children}</Animated.View>
  );
};

export default HeaderAnimation;
