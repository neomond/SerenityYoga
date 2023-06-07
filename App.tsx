import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import {Provider} from 'react-redux';
import store from './src/redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
