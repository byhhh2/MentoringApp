/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

//LoginStackNavigation
import StackNavi from './login/navigation/StackNavi';

//redux
import rootReducer from './redux/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavi />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
