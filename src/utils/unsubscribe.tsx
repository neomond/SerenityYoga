import {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';

export const useUnsubscribe = () => {
  const navigation = useNavigation();

  return useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.dispatch(StackActions.pop());
    });

    return unsubscribe;
  }, [navigation]);
};
