import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux/store';
// Import Screens
import Main from './Main';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
  </Provider>
   
    );
};

export default App;