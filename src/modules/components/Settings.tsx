import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {
  userLoggedout,
  deleteAllUserTodosThunk,
} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function Settings(props: any) {
  function deleteAllTodos() {
    Alert.alert(
      'You will delete all todos.',
      'Procede?',
      [
        {
          text: 'Yes',
          onPress: () => props.deleteAll(props.route.params.userId),
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  }

  function logout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.contentView}>
        <Text>Username: {props.route.params.userMail} </Text>
        <Button title="Logout" color="red" onPress={() => logout()} />
      </View>

      <View style={styles.contentView}>
        <Text>Delete all todos: </Text>
        <Button
          title="Delete all"
          color="red"
          onPress={() => deleteAllTodos()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});

const mapStateToProps = (state: any) => {
  const todos = state;
  return {todos};
};
const dispatchToProps = (dispatcher: any) => {
  return {
    logout: (userToken: boolean) => dispatcher(userLoggedout(userToken)),
    deleteAll: (userId: any) => dispatcher(deleteAllUserTodosThunk(userId)),
  };
};

export default connect(mapStateToProps, dispatchToProps)(Settings);
