import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {userLoggedIn} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import background from '../../assets/loginImg.jpg';

const Login = (props: any) => {
  const validateEmail = (text: any) => {
    console.log(text);
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

  const login = () => {
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
          .signInWithEmailAndPassword(username, password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch((error) => {
            Alert.alert(
              'User not found',
              'Pleas insert correct Email address and password',
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const [users, setUsers] = useState([]);
  // const ref = firestore().collection('user');

  // useEffect(() => {
  //   return ref.onSnapshot((querySnapshot) => {
  //     const list: any = [];
  //     querySnapshot.forEach((doc) => {
  //       list.push({
  //         id: doc.id,
  //         username: doc.data().username,
  //         password: doc.data().password,
  //       });
  //     });
  //     setUsers(list);
  //   });
  // }, []);

  // function checkLogin(username: string, password: string) {
  //   let userFound = false;

  //   if (username != '' || password != '') {
  //     users.forEach((user: any) => {
  //       if (user.username == username && user.password == password) {
  //         userFound = true;
  //         props.login(true, user);
  //       }
  //     });

  //     if (!userFound) {
  //       ToastAndroid.show('Wrong username or password', ToastAndroid.SHORT);
  //     }
  //   } else {
  //     ToastAndroid.show(
  //       'Insert valid username or password',
  //       ToastAndroid.SHORT,
  //     );
  //   }
  // }

  return (
    <View style={styles.mainView}>
      <View style={styles.image}>
        <View style={styles.loginContainer}>
          <Text style={styles.mainText}>Login</Text>
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
              onPress={() => login()}
              title="Log in"
              // onPress={() => props.route.params.loginCallback(true)}
            />
          </View>
          <View style={styles.viewRegisterBtn}>
            <Text style={styles.registerText}>
              Dont have an account? Register here!
            </Text>
            <Button
              title="Register"
              onPress={() => props.navigation.navigate('Register')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

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
    height: 500,
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
  console.log(state);
  return {state: state.userReducer};
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    login: (user: any) => dispatcher(userLoggedIn(user)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(Login);
