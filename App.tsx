import React, {useState, useEffect} from 'react';
import Login from './src/modules/components/Login';
import Register from './src/modules/components/Register';
import TodoListScreen from './src/modules/components/TodoListScreen';
import TodoDetailsScreen from './src/modules/components/TodoDetailsScreen';
import TodoFormScreen from './src/modules/components/TodoFormScreen';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {connect} from 'react-redux';
// import {getUserLoggedIn} from './src/modules/redux/actions/actionCreators';
// import database from '@react-native-firebase/database';

const App = (props: any) => {
  const Stack = createStackNavigator();

  // useEffect(() => {
  //   const todos = database()
  //     .ref('/todo')
  //     .once('value')
  //     .then((snapshot) => {
  //       console.log('User data: ', snapshot.val());
  //     });
  // });

  const loginSuccessCallback = (success: any, user: any) => {
    if (success) {
      setLoggedInScreen(
        <>
          <Stack.Screen
            name="TodoListScreen"
            component={TodoListScreen}
            options={{title: 'Todos'}}
            initialParams={{user: user}}
          />
          <Stack.Screen
            name="TodoFormScreen"
            component={TodoFormScreen}
            options={{title: 'New Todo'}}
          />
          <Stack.Screen
            name="TodoDetailsScreen"
            component={TodoDetailsScreen}
            options={{title: 'Details'}}
          />
        </>,
      );
    }
  };

  const [loggedInScreen, setLoggedInScreen] = useState(
    <>
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{
          loginCallback: loginSuccessCallback,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        initialParams={{
          loginCallback: loginSuccessCallback,
        }}
      />
    </>,
  );

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1565c0',
            },
            headerTintColor: '#fff',
          }}>
          {loggedInScreen}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {state: state.userReducer};
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    // getLoggedInUser: () => dispatcher(getUserLoggedIn()),
  };
};

export default connect(mapStateToProps)(App);
