import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import {LogBox} from 'react-native';
// import background from "../assets/loginImg.jpg";
import {addNewUser} from '../redux/actions/actionCreators';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

function Register(props: any) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  console.log(props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const ref = firestore().collection('user');
  const [users, setUsers] = useState([]);

  // function getUsers() {
  //   useEffect(() => {
  //     return ref.onSnapshot((querySnapshot) => {
  //       let user: any = {};
  //       querySnapshot.forEach((doc) => {
  //         if (
  //           username == doc.data().username &&
  //           password == doc.data().password
  //         ) {
  //           user = {
  //             id: doc.id,
  //             username: username,
  //             password: password,
  //           };
  //         }
  //         // console.log(doc.data().done);
  //       });
  //       // console.log(list);
  //       setUsers(user);
  //     });
  //   }, []);
  // }

  function RegisterUser(username: string, password: string) {
    let userFound;
    if (username != '' && password != '') {
      props.route.params.users.forEach((user: any) => {
        if (username == user.username) {
          userFound = true;
          ToastAndroid.show('Username is already taken', ToastAndroid.SHORT);
        } else {
          userFound = false;
        }
      });

      if (!userFound) {
        props.addNewUser(username, password);

        ToastAndroid.show('Successfull registration', ToastAndroid.SHORT);
        props.navigation.navigate('Login');
      }
    } else {
      ToastAndroid.show(
        'Insert valid username and password',
        ToastAndroid.SHORT,
      );
    }

    // if (username != null && password != null) {
    //   props.addNewUser(username, password);
    //   // props.route.params.loginCallback(true, users);

    //   ToastAndroid.show('Successfull registration', ToastAndroid.SHORT);
    //   props.navigation.navigate('Login');
    // } else {
    //   ToastAndroid.show(
    //     'Insert valid username and password',
    //     ToastAndroid.SHORT,
    //   );
    // }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.image}>
        <View style={styles.loginContainer}>
          <Text style={styles.mainText}>Register</Text>
          <View style={styles.loginInputContainer}>
            <View style={styles.usernameView}>
              <Text style={styles.usernameText}>Username:</Text>
              <TextInput
                style={styles.usernameInput}
                placeholder="New username"
                onChangeText={(e) => setUsername(e)}></TextInput>
            </View>
            <View style={styles.passwordView}>
              <Text style={styles.passwordText}>Password:</Text>
              <TextInput
                style={styles.passwordInput}
                placeholder="New password"
                onChangeText={(e) => setPassword(e)}></TextInput>
            </View>
          </View>
          <View style={styles.viewLoginBtn}>
            <Button
              // style={styles.buttonLogin}
              onPress={() => RegisterUser(username, password)}
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
    // login: (id: number, success: string) =>
    // dispatcher(userLoggedIn(id, success)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(Register);
