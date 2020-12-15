import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import IconsAntDesign from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  todoDelete,
  todoCompleted,
  userLoggedIn,
} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';

function TodoListScreen(props: any) {
  // const ref = firestore().collection('todo');
  const [todos, setTodos] = useState([]);
  const ref = firestore().collection('todo');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list: any = [];
      querySnapshot.forEach((doc) => {
        // const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          userID: doc.data().userID,
          text: doc.data().text,
          done: doc.data().done,
        });
        // console.log(doc.data().done);
      });
      // console.log(list);
      setTodos(list);
    });
  }, []);

  console.log(todos);

  const closeRow = (rowMap: any, todoId: number) => {
    if (rowMap[todoId]) {
      rowMap[todoId].closeRow();
    }
  };

  const complete = (id: number, rowMap: any) => {
    props.markTodoCompleted(id);
    console.log(id);
    closeRow(rowMap, id);
  };

  const deleteRow = (id: number) => {
    props.deleteTodos(id);
    console.log(id);
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
                  onPress={() => complete(data.item.id, rowMap)}>
                  {data.item.done ? 'Undone' : 'Done'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{padding: 20}}
                  onPress={() => deleteRow(data.item.id)}>
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

      <View style={styles.containerInput}>
        <Text style={styles.input}>
          current user:{' '}
          {props.state.userReducer.map((user: any) =>
            user.signedIn ? user.username : null,
          )}
        </Text>
        <Button
          // style={styles.btnAdd}
          title="add"
          onPress={() =>
            props.navigation.navigate('TodoFormScreen', {
              userId: props.userId,
            })
          }
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
    flexDirection: 'row',
    bottom: 0,
    padding: 5,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    textAlign: 'center',
  },
  btnAdd: {
    paddingLeft: 10,
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
});

const mapStateToProps = (state: any) => {
  var userid: any = null;
  state.userReducer.forEach((user: any) => {
    if (user.signedIn) {
      userid = user.id;
    }
  });

  const todos = state.todoReducer.filter((todo: any) => todo.userId == userid);
  return {
    todos: state.todoReducer,
    state: state,
    userTodos: todos,
    userId: userid,
  };
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    deleteTodos: (id: any) => dispatcher(todoDelete(id)),
    markTodoCompleted: (id: any) => dispatcher(todoCompleted(id)),
    login: (id: any, success: any) => dispatcher(userLoggedIn(id, success)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(TodoListScreen);
