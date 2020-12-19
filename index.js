import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/modules/redux/store/store';

const Redux = () => {
  const reduxStore = store();

  return (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Redux);
