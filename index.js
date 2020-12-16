import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import * as actionCreators from './src/modules/redux/actions/actionCreators';
// import database from '@react-native-firebase/database';
import store from './src/modules/redux/store/store';

const Redux = () => {
  const reduxStore = store();

  // reduxStore.dispatch(actionCreators.todoAdded(1, 'new todo user user'));
  // reduxStore.dispatch(actionCreators.todoAdded(1, 'todo user 1'));

  // reduxStore.dispatch(actionCreators.todoAdded(2, 'todo user test'));
  // reduxStore.dispatch(actionCreators.todoAdded(2, 'user 2 new todo'));

  // reduxStore.dispatch(actionCreators.addUser('user', 'user'));
  // reduxStore.dispatch(actionCreators.addUser('test', 'test'));

  // database()
  //   .setPersistenceEnabled(true)
  //   .then(() => console.log('Realtime Database persistence enabled'));

  return (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Redux);
