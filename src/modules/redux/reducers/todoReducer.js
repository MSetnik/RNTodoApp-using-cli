import { ADD_TODO, DELETE_TODO, TODO_COMPLETED } from "../actions/types";

let lastId = 0;

export default function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: ++lastId,
          userId: action.payload.userId,
          todoText: action.payload.todoText,
          done: false,
        },
      ];

    case DELETE_TODO:
      return state.filter((todo) => todo.id != action.payload.id);

    case TODO_COMPLETED:
      return state.map((todo) =>
        todo.id == action.payload.todoId
          ? {
              id: todo.id,
              userId: todo.userId,
              todoText: todo.todoText,
              done: !todo.done,
            }
          : todo
      );

    default:
      return state;
  }
}
