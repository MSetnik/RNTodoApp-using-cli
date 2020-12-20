import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import IconsAntDesign from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  todoDeletedThunk,
  todoCompletedThunk,
} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';

function TodoListScreen(props: any) {
  const [todos, setTodos] = useState([]);
  const ref = firestore()
    .collection('todo')
    .where('userID', '==', props.route.params.userId);

  // useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={styles.headerSettingsTouchable}
  //         onPress={() =>
  //           props.navigation.navigate('Settings', {
  //             userMail: props.route.params.userMail,
  //             userId: props.route.params.userId,
  //           })
  //         }>
  //         <IconsAntDesign style={styles.headerSettingsBtn} name="setting" />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [props.navigation]);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list: any = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          userID: doc.data().userID,
          text: doc.data().text,
          done: doc.data().done,
        });
      });
      setTodos(list);
    });
  }, []);

  const closeRow = (rowMap: any, todoId: number) => {
    if (rowMap[todoId]) {
      rowMap[todoId].closeRow();
    }
  };

  const complete = (id: number, rowMap: any, status: any) => {
    props.markTodoCompleted(id, status);
    closeRow(rowMap, id);
  };

  const deleteRow = (id: number, rowMap: any) => {
    Alert.alert(
      'You will delete selected todo.',
      'Procede?',
      [
        {
          text: 'Yes',
          onPress: () => props.deleteTodoThunk(id),
        },
        {
          text: 'Cancel',
          onPress: () => closeRow(rowMap, id),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.flatlistView}>
        <SwipeListView
          // style={styles.flatlistContainer}
          data={todos}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate('TodoDetailsScreen', {
                  todo: item,
                })
              }>
              <View style={styles.flatlistContent}>
                <Text style={styles.textTask}>{item.text}</Text>
                {item.done ? <IconsAntDesign name="check" /> : null}
              </View>
            </TouchableWithoutFeedback>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity>
                <Text
                  style={{padding: 20}}
                  onPress={() =>
                    complete(data.item.id, rowMap, data.item.done)
                  }>
                  {data.item.done ? 'Undone' : 'Done'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{padding: 20}}
                  onPress={() => deleteRow(data.item.id, rowMap)}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          useNativeDriver={false}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  flatlistView: {
    flex: 1,
  },
  flatlistContent: {
    flexDirection: 'row',
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  textTask: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17,
  },

  containerInput: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 15,
  },
  input: {
    flex: 1,
    textAlign: 'center',
  },
  rowBack: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  headerSettingsBtn: {
    fontSize: 30,
    color: 'white',
  },
  headerSettingsTouchable: {
    marginRight: 15,
  },
});

const mapStateToProps = (state: any) => {
  // var userid: any = null;
  // state.userReducer.forEach((user: any) => {
  //   if (user.signedIn) {
  //     userid = user.id;
  //   }
  // });
  // const todos = state.todoReducer.filter((todo: any) => todo.userId == userid);
  // return {
  //   todos: state.todoReducer,
  //   state: state,
  //   userTodos: todos,
  //   userId: userid,
  // };
  return state;
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    deleteTodoThunk: (id: number) => dispatcher(todoDeletedThunk(id)),
    markTodoCompleted: (id: number, status: boolean) =>
      dispatcher(todoCompletedThunk(id, status)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(TodoListScreen);
