import {
  ADD_USER,
  USER_LOGGEDIN,
  ADD_USER_THUNK,
  USER_LOGGEDOUT,
} from '../actions/types';

export default function userReducer(state = [], action: any) {
  let userToken = false;
  switch (action.type) {
    case ADD_USER_THUNK:
      return state;

    case USER_LOGGEDIN:
      userToken = action.payload.userToken;
      return {user: action.payload.user};

    case USER_LOGGEDOUT:
      userToken = action.payload.userToken;
      return {userToken: action.payload.userToken};

    default:
      return state;
  }
}
