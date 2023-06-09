import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveScreen from '../screens/SaveScreen';

type SaveStackParamList = {
  SaveMain: undefined;
};

const SaveStack = createNativeStackNavigator<SaveStackParamList>();

export const SaveStackNavigator: React.FC = () => {
  return (
    <SaveStack.Navigator>
      <SaveStack.Screen
        name="SaveMain"
        component={SaveScreen}
        options={{headerShown: false}}
      />
    </SaveStack.Navigator>
  );
};
