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
import {connect} from 'react-redux';
import {userLoggedIn} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';
// import background from '../../assets/loginImg.jpg';

const Login = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const ref = firestore().collection('todo');

  // useEffect(() => {
  //   return ref.onSnapshot((querySnapshot) => {
  //     const list: any = [];
  //     querySnapshot.forEach((doc) => {
  //       // const {title, complete} = doc.data();
  //       // list.push({
  //       //   id: doc.id,
  //       //   title,
  //       //   complete,
  //       // });
  //       console.log(doc.data());
  //     });
  //     // console.log(list);
  //   });
  // }, []);

  // const users = firestore().collection('todo').get();

  // console.log(users);

  function checkLogin(username: string, password: string) {
    props.state.forEach((user: any) => {
      if (user.username == username && user.password == password) {
        props.login(user.id, true);

        props.route.params.loginCallback(true);
        // console.log(props.state);
      }
    });
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.image}>
        <View style={styles.loginContainer}>
          <Text style={styles.mainText}>Login</Text>
          <View style={styles.loginInputContainer}>
            <View style={styles.usernameView}>
              <Text style={styles.usernameText}>Username:</Text>
              <TextInput
                style={styles.usernameInput}
                placeholder="username"
                onChangeText={(e) => setUsername(e)}></TextInput>
            </View>
            <View style={styles.passwordView}>
              <Text style={styles.passwordText}>Password:</Text>
              <TextInput
                style={styles.passwordInput}
                placeholder="password"
                onChangeText={(e) => setPassword(e)}></TextInput>
            </View>
          </View>
          <View style={styles.viewLoginBtn}>
            <Button
              onPress={() => checkLogin(username, password)}
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
  return {state: state.userReducer};
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    login: (id: number, success: string) =>
      dispatcher(userLoggedIn(id, success)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(Login);
