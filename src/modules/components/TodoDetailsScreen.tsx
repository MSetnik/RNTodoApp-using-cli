import React, {useState} from 'react';
import {View, Button, Alert, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {
  todoDeletedThunk,
  todoCompletedThunk,
} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';

function TodoDetailsScreen(props: any) {
  const [input, setInput] = useState(props.route.params.todo.text);

  function deleteTodo() {
    props.deleteTodoThunk(props.route.params.todo.id);
    props.navigation.navigate('TodoListScreen');
  }

  function deleteTodoAlert() {
    Alert.alert(
      'You will delete selected todo.',
      'Procede?',
      [
        {
          text: 'Yes',
          onPress: () => deleteTodo(),
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  }

  function completeTodo() {
    props.markTodoCompleted(
      props.route.params.todo.id,
      props.route.params.todo.done,
    );
    props.navigation.navigate('TodoListScreen');
  }

  function editTodo(input: any) {
    firestore()
      .collection('todo')
      .doc(props.route.params.todo.id)
      .update({
        text: input,
      })
      .then(() => {});
    props.navigation.navigate('TodoListScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.viewButtons}>
          <View style={styles.btns}>
            <Button
              title={props.route.params.todo.done ? 'remove checkmark' : 'done'}
              onPress={() => completeTodo()}
            />
          </View>
          <View style={styles.btns}>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteTodoAlert()}
            />
          </View>
          <View style={styles.btns}>
            <Button
              title="Save"
              color="green"
              onPress={() => editTodo(input)}
            />
          </View>
        </View>
        <View style={styles.viewTodoText}>
          <TextInput
            autoFocus={true}
            style={styles.todoText}
            onChangeText={(e) => setInput(e)}
            value={input}></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    marginTop: 10,
    flex: 1,
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btns: {
    margin: 5,
  },
  viewTodoText: {
    padding: 10,
  },
  todoText: {
    fontSize: 18,
  },
});

const mapStateToProps = (state: any, id: number) => {
  const todos = state;
  return {
    todos: todos,
    id: id,
  };
};

const dispatchStateToProps = (dispatcher: any) => {
  return {
    deleteTodoThunk: (id: number) => dispatcher(todoDeletedThunk(id)),
    markTodoCompleted: (id: number, status: boolean) =>
      dispatcher(todoCompletedThunk(id, status)),
  };
};

export default connect(
  mapStateToProps,
  dispatchStateToProps,
)(TodoDetailsScreen);
