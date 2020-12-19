import {act} from 'react-test-renderer';
import {
  ADD_TODO_THUNK,
  DELETE_TODO_THUNK,
  TODO_COMPLETED_THUNK,
  GET_USER_TODOS,
  GET_ALL_TODOS,
} from '../actions/types';

let lastId = 0;

export default function todoReducer(state = [], action: any) {
  switch (action.type) {
    case ADD_TODO_THUNK:
      // console.log(action.payload.state);
      return state;

    case DELETE_TODO_THUNK:
      return state;

    case TODO_COMPLETED_THUNK:
      return state;

    case GET_USER_TODOS:
      return (state = action.payload.users);

    case GET_ALL_TODOS:
      return (state = action.payload.todos);

    default:
      return state;
  }
}
