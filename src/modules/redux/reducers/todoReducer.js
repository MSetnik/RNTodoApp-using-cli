import {
  ADD_TODO_THUNK,
  DELETE_TODO_THUNK,
  TODO_COMPLETED_THUNK,
} from '../actions/types';

let lastId = 0;

export default function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO_THUNK:
      return state;

    case DELETE_TODO_THUNK:
      return state;

    case TODO_COMPLETED_THUNK:
      return state;

    default:
      return state;
  }
}
