import {createStore, combineReducers, applyMiddleware} from 'redux';
import todoReducer from '../reducers/todoReducer';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  todoReducer,
  userReducer,
});

const store = () => createStore(rootReducer, applyMiddleware(thunk));

export default store;
