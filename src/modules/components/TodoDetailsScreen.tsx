import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {todoDelete, todoCompleted} from '../redux/actions/actionCreators';
import firestore from '@react-native-firebase/firestore';

function TodoDetailsScreen(props: any) {
  const [input, setInput] = useState(props.route.params.todo.text);

  function deleteTodo() {
    // props.deleteTodos(props.route.params.todo);
    // updateData();
    firestore()
      .collection('todo')
      .doc(props.route.params.todo.id)
      .delete()
      .then(() => {
        console.log('Todo Deleted!');
      });
    props.navigation.navigate('TodoListScreen');
  }

  function completeTodo() {
    // props.markTodoCompleted(props.route.params.todo);
    // // updateData();
    firestore()
      .collection('todo')
      .doc(props.route.params.todo.id)
      .update({
        done: props.route.params.todo.done ? false : true,
      })
      .then(() => {
        console.log('Todo updated!');
      });
    props.navigation.navigate('TodoListScreen');
  }

  function editTodo(input: any) {
    firestore()
      .collection('todo')
      .doc(props.route.params.todo.id)
      .update({
        text: input,
      })
      .then(() => {
        console.log('Todo updated!');
      });
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
            <Button title="Delete" color="red" onPress={() => deleteTodo()} />
          </View>
          <View style={styles.btns}>
            <Button
              title="Edit"
              color="green"
              onPress={() => editTodo(input)}
            />
          </View>
        </View>
        <View style={styles.viewTodoText}>
          <TextInput
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
    deleteTodos: (id: number) => dispatcher(todoDelete(id)),
    markTodoCompleted: (id: number) => dispatcher(todoCompleted(id)),
  };
};

export default connect(
  mapStateToProps,
  dispatchStateToProps,
)(TodoDetailsScreen);
