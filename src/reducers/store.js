import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import reducers from './index';

const store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk), autoRehydrate()));

export default store;
