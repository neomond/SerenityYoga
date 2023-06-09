import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveScreen from '../screens/SaveScreen';

type SaveStackParamList = {
  Save: undefined;
};

const SaveStack = createNativeStackNavigator<SaveStackParamList>();

export const SaveStackNavigator: React.FC = () => {
  return (
    <SaveStack.Navigator>
      <SaveStack.Screen
        name="Save"
        component={SaveScreen}
        options={{headerShown: false}}
      />
    </SaveStack.Navigator>
  );
};
