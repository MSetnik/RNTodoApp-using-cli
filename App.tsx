import React, {useEffect, useState} from 'react';
import Login from './src/modules/components/Login';
import Register from './src/modules/components/Register';
import TodoListScreen from './src/modules/components/TodoListScreen';
import TodoDetailsScreen from './src/modules/components/TodoDetailsScreen';
import TodoFormScreen from './src/modules/components/TodoFormScreen';
import Settings from './src/modules/components/Settings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {userLoggedIn} from './src/modules/redux/actions/actionCreators';
import auth from '@react-native-firebase/auth';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';

const App = (props: any) => {
  const Stack = createStackNavigator();

  const Tab = createMaterialBottomTabNavigator();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser]: any = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    props.userLoggedIn(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const NavTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="TodoListScreen"
          component={TodoListScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <IonIcons name="home" color={color} size={26} />
            ),
          }}
          initialParams={{userId: user.uid, userMail: user.email}}
        />
        <Tab.Screen
          name="TodoFormScreen"
          component={TodoFormScreen}
          initialParams={{userId: user.uid, userMail: user.email}}
          options={{
            tabBarLabel: 'New todo',
            tabBarIcon: ({color}) => (
              <IonIcons name="add-circle-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <IonIcons name="settings-outline" color={color} size={26} />
            ),
          }}
          initialParams={{userId: user.uid, userMail: user.email}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#003c8f" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1565c0',
            },
            headerTintColor: '#fff',
          }}>
          {user ? (
            <>
              <Stack.Screen
                name="TodoListScreen"
                component={NavTab}
                options={({route}) => ({
                  title: 'Todos',
                })}
                initialParams={{userId: user.uid, userMail: user.email}}
              />
              <Stack.Screen
                name="TodoDetailsScreen"
                component={TodoDetailsScreen}
                options={{title: 'Details'}}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
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
    userLoggedIn: (user: any) => dispatcher(userLoggedIn(user)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(App);
