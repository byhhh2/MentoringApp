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

const App = () => {
  return (
    <NavigationContainer>
      <StackNavi />
    </NavigationContainer>
  );
};

export default App;
