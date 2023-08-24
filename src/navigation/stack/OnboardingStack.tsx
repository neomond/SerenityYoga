import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {OnboardingStepOne} from '../screens/Onboarding/OnboardingStepOne';
import {OnboardingStepTwo} from '../screens/Onboarding/OnboardingStepTwo';
import {OnboardingStepThree} from '../screens/Onboarding/OnboardingStepThree';

type OnboardingStackParamList = {
  OnboardingStepOne: undefined;
  OnboardingStepTwo: undefined;
  OnboardingStepThree: undefined;
  //   OnboardingStepFour: undefined;
};

const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingStackNavigator: React.FC = () => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="OnboardingStepOne"
        component={OnboardingStepOne}
        options={{headerShown: false}}
      />
      <OnboardingStack.Screen
        name="OnboardingStepTwo"
        component={OnboardingStepTwo}
        options={{headerShown: false}}
      />
      <OnboardingStack.Screen
        name="OnboardingStepThree"
        component={OnboardingStepThree}
        options={{headerShown: false}}
      />
      {/* <OnboardingStack.Screen
        name="OnboardingStepFour"
        component={OnboardingStepThree}
        options={{headerShown: false}}
      /> */}
    </OnboardingStack.Navigator>
  );
};
