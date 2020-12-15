import {ADD_USER, USER_LOGGEDIN, GET_USER_LOGGEDIN} from '../actions/types';

let lastId = 0;
let userLoggedIn = null;

export default function userReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: ++lastId,
          username: action.payload.username,
          password: action.payload.password,
          signedIn: false,
        },
      ];

    case USER_LOGGEDIN:
      state.forEach((user) => {
        if (user.id == action.payload.id) {
          user.signedIn = action.payload.success;
        }
      });
      return state;

    case GET_USER_LOGGEDIN:
      state.forEach((user) => {
        if (user.signedIn) {
          userLoggedIn = user;
        }
      });
      return user;

    default:
      return state;
  }
}
