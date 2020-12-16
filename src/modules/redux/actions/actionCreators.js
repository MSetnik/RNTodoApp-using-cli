import * as actions from './types';
import firestore from '@react-native-firebase/firestore';

// export function todoAdded(userId, todoText) {
//   return {
//     type: actions.ADD_TODO,
//     payload: {
//       userId: userId,
//       todoText: todoText,
//     },
//   };
// }

export function todoAddedThunk(userId, todoText) {
  return (dispatch, getState) => {
    //async task
    const ref = firestore().collection('todo');
    ref
      .add({
        userID: userId,
        text: todoText,
        done: false,
      })
      .then(() => {
        dispatch({
          type: actions.ADD_TODO_THUNK,
          payload: {
            userId: userId,
            todoText: todoText,
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

// export function todoDelete(todoId) {
//   return {
//     type: actions.DELETE_TODO,
//     payload: {
//       id: todoId,
//     },
//   };
// }

export function todoDeletedThunk(id) {
  return (dispatch, getState) => {
    //async task
    const ref = firestore().collection('todo');

    ref
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: actions.DELETE_TODO_THUNK,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

// export function todoCompleted(id) {
//   return {
//     type: actions.TODO_COMPLETED,
//     payload: {
//       todoId: id,
//     },
//   };
// }

export function todoCompletedThunk(id, status) {
  return (dispatch, getState) => {
    //async task
    const ref = firestore().collection('todo');

    ref
      .doc(id)
      .update({
        done: status ? false : true,
      })
      .then(() => {
        dispatch({
          type: actions.TODO_COMPLETED_THUNK,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function userTodosThunk(id) {
  return (dispatch, getState) => {
    //async task
    const ref = firestore().collection('todo');

    ref
      .doc(id)
      .update({
        done: status ? false : true,
      })
      .then(() => {
        dispatch({
          type: actions.TODO_COMPLETED_THUNK,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function addNewUser(username, password) {
  return (dispatch, getState) => {
    //async task
    const ref = firestore().collection('user');
    ref
      .add({
        username: username,
        password: password,
      })
      .then(() => {
        dispatch({
          type: actions.ADD_USER_THUNK,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

// export function userLoggedIn(id, success) {
//   return {
//     type: actions.USER_LOGGEDIN,
//     payload: {
//       id: id,
//       success: success,
//     },
//   };
// }

// export function getUserLoggedIn() {
//   return {
//     type: actions.GET_USER_LOGGEDIN,
//   };
// }
