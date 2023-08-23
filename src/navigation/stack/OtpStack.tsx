import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {OTPStepOne} from '../screens/OTP/OTPStepOne';
import {OTPStepTwo} from '../screens/OTP/OTPStepTwo';
import {OTPStepThree} from '../screens/OTP/OTPStepThree';

type OtpStackParamList = {
  OtpMain: undefined;
  OtpFirst: undefined;
  OtpSecond: undefined;
  OtpThird: undefined;
};

const OtpStack = createNativeStackNavigator<OtpStackParamList>();

export const OtpStackNavigator: React.FC = () => {
  return (
    <OtpStack.Navigator>
      <OtpStack.Screen
        name="OtpFirst"
        component={OTPStepOne}
        options={{headerShown: false}}
      />
      <OtpStack.Screen
        name="OtpSecond"
        component={OTPStepTwo}
        options={{headerShown: false}}
      />
      <OtpStack.Screen
        name="OtpThird"
        component={OTPStepThree}
        options={{headerShown: false}}
      />
    </OtpStack.Navigator>
  );
};
