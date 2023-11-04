import React from 'react';
import Main from './src/Main';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Main />
  </GestureHandlerRootView>
);

export default App;
