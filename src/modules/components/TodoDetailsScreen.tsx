import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {todoDelete, todoCompleted} from '../redux/actions/actionCreators';

function TodoDetailsScreen(props: any) {
  function deleteTodo() {
    props.deleteTodos(props.route.params.todo[0].id);
    props.navigation.navigate('TodoListScreen');
  }

  function completeTodo() {
    props.markTodoCompleted(props.route.params.todo[0].id);
    props.navigation.navigate('TodoListScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.viewButtons}>
          <View style={styles.btns}>
            <Button
              title={
                props.route.params.todo[0].done ? 'remove checkmark' : 'done'
              }
              onPress={() => completeTodo()}
            />
          </View>
          <View style={styles.btns}>
            <Button title="Delete" color="red" onPress={() => deleteTodo()} />
          </View>
        </View>
        <View style={styles.viewTodoText}>
          <Text style={styles.todoText}>
            {props.route.params.todo[0].todoText}
          </Text>
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
