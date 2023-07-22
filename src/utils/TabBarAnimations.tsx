import {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  useIsFocused,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

type TabBarAnimationsProps = {
  isFocused: boolean;
};

const useTabBarAnimations = ({isFocused}: TabBarAnimationsProps) => {
  const iconOpacity = useSharedValue(isFocused ? 1 : 0);
  const labelOpacity = useSharedValue(isFocused ? 1 : 0);
  const iconScale = useSharedValue(isFocused ? 1 : 0.8);
  const labelVisibility = useSharedValue(isFocused ? 1 : 0);
  const backgroundColor = useSharedValue('');
  const activeBackgroundColor = useSharedValue('#E5DEFF');
  const activeBorderRadius = useSharedValue(0);

  const animationConfig = {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  };

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
      transform: [{scale: iconScale.value}],
      backgroundColor: isFocused ? backgroundColor.value : 'transparent',
      borderRadius: activeBorderRadius.value,
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    return {
      opacity: labelVisibility.value,
      backgroundColor: isFocused ? backgroundColor.value : 'transparent',
      borderRadius: activeBorderRadius.value,
    };
  });

  useEffect(() => {
    iconOpacity.value = withTiming(isFocused ? 1 : 0, animationConfig);
    labelOpacity.value = withTiming(isFocused ? 1 : 0, animationConfig);
    iconScale.value = withTiming(isFocused ? 1 : 0.8, animationConfig);
    labelVisibility.value = withTiming(isFocused ? 1 : 0, animationConfig);

    if (isFocused) {
      backgroundColor.value = withTiming(
        activeBackgroundColor.value,
        animationConfig,
      );
      activeBorderRadius.value = withTiming(10, animationConfig);
    } else {
      activeBorderRadius.value = withTiming(0, animationConfig);
    }
  }, [isFocused]);

  return {iconStyle, labelStyle};
};

export default useTabBarAnimations;
