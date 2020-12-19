import * as actions from './types';
import firestore from '@react-native-firebase/firestore';

export function todoAddedThunk(userId: number, todoText: string) {
  return (dispatch: any, getState: any) => {
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

export function deleteAllUserTodosThunk(userID: any) {
  return async (dispatch: any, getState: any) => {
    //async task
    const ref = firestore().collection('todo').where('userID', '==', userID);
    await ref.get().then((doc) => {
      doc.forEach((doc) => {
        firestore()
          .collection('todo')
          .doc(doc.id)
          .delete()
          .then(() => {
            dispatch({
              type: actions.DELETE_TODO_THUNK,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });

    // userTodos.forEach((todo) => {
    //   console.log(todo);
    // });
  };
}

export function todoDeletedThunk(id: any) {
  return (dispatch: any, getState: any) => {
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

export function todoCompletedThunk(id: any, status: any) {
  return (dispatch: any, getState: any) => {
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

// export function userTodosThunk(id: any, status: any) {
//   return (dispatch: any, getState: any) => {
//     //async task
//     const ref = firestore().collection('todo');

//     ref
//       .doc(id)
//       .update({
//         done: status ? false : true,
//       })
//       .then(() => {
//         dispatch({
//           type: actions.TODO_COMPLETED_THUNK,
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
// }

export function addNewUser(username: any, password: any) {
  return (dispatch: any, getState: any) => {
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

export function userLoggedIn(user: any) {
  return {
    type: actions.USER_LOGGEDIN,
    payload: {
      user: user,
    },
  };
}

export function userLoggedout(userToken: any) {
  return {
    type: actions.USER_LOGGEDOUT,
    payload: {
      userToken: userToken,
    },
  };
}

// export function getUserLoggedIn() {
//   return {
//     type: actions.GET_USER_LOGGEDIN,
//   };
// }
