import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
} from 'react-native';
import {LogBox} from 'react-native';
// import background from "../assets/loginImg.jpg";
import {addNewUser} from '../redux/actions/actionCreators';
import {userLoggedIn} from '../redux/actions/actionCreators';

import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function Register(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (text: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      // setState({ email: text })
      return false;
    } else {
      setUsername(text);
      console.log('Email is Correct');
      return true;
    }
  };

  const register = () => {
    if (username == '' || password == '') {
      Alert.alert(
        'Email or password is empty.',
        'Input valid email or password',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    } else {
      if (validateEmail(username)) {
        auth()
          .createUserWithEmailAndPassword(username, password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch((error) => {
            Alert.alert(
              'OOPS!',
              'Something went wrong',
              [
                {
                  text: 'Ok',
                  onPress: () => {},
                },
              ],
              {cancelable: false},
            );
            // if (error.code === 'auth/email-already-in-use') {
            //   console.log('That email address is already in use!');
            // }
            // if (error.code === 'auth/invalid-email') {
            //   console.log('That email address is invalid!');
            // }
            // if (error.code === 'auth/wrong-password') {
            //   console.log('That email address is already in use!');
            // }
            // console.error(error);
          });
      } else {
        Alert.alert(
          'Wrong Email format.',
          'Pleas insert valid Email address',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  // const ref = firestore().collection('user');
  // const [users, setUsers] = useState([]);

  // function RegisterUser(username: string, password: string) {
  //   let userFound;
  //   if (username != '' && password != '') {
  //     props.route.params.users.forEach((user: any) => {
  //       if (username == user.username) {
  //         userFound = true;
  //         ToastAndroid.show('Username is already taken', ToastAndroid.SHORT);
  //       } else {
  //         userFound = false;
  //       }
  //     });

  //     if (!userFound) {
  //       props.addNewUser(username, password);

  //       ToastAndroid.show('Successfull registration', ToastAndroid.SHORT);
  //       props.navigation.navigate('Login');
  //     }
  //   } else {
  //     ToastAndroid.show(
  //       'Insert valid username and password',
  //       ToastAndroid.SHORT,
  //     );
  //   }
  // }

  // const register = () => {
  //   auth()
  //     .createUserWithEmailAndPassword(username, password)
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     });
  // };
  return (
    <View style={styles.mainView}>
      <View style={styles.image}>
        <View style={styles.loginContainer}>
          <Text style={styles.mainText}>Register</Text>
          <View style={styles.loginInputContainer}>
            <View style={styles.usernameView}>
              <Text style={styles.usernameText}>Email:</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.usernameInput}
                placeholder="john.doe@gmail.com"
                onChangeText={(e) => setUsername(e)}></TextInput>
            </View>
            <View style={styles.passwordView}>
              <Text style={styles.passwordText}>Password:</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.passwordInput}
                placeholder="password"
                onChangeText={(e) => setPassword(e)}></TextInput>
            </View>
          </View>
          <View style={styles.viewLoginBtn}>
            <Button
              // style={styles.buttonLogin}
              onPress={() => register()}
              disabled={password.length >= 6 ? false : true}
              title="Register"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    padding: 20,
    width: 300,
    height: 450,
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  loginInputContainer: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  usernameView: {
    marginBottom: 40,
    width: '100%',
  },
  passwordView: {
    marginBottom: 40,
    width: '100%',
  },
  usernameText: {
    fontSize: 20,
    textAlign: 'center',
  },
  usernameInput: {
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  passwordText: {
    fontSize: 20,
    textAlign: 'center',
  },
  passwordInput: {
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  viewLoginBtn: {
    alignSelf: 'stretch',
  },
  viewRegisterBtn: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  buttonLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    flexDirection: 'row',
    flex: 1,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

const mapStateToProps = (state: any) => {
  return {state};
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    addNewUser: (username: any, password: any) =>
      dispatcher(addNewUser(username, password)),
    login: (user: any) => dispatcher(userLoggedIn(user)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(Register);
