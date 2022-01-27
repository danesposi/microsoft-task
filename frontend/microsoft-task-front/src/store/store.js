import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { taskListReducer } from './dataStore/taskListStore';
import { refreshReducer } from "./dataStore/refreshStore";
import { combineReducers } from "redux";
import { taskListInitialState } from "./dataStore/taskListStore";
import { refreshInitialState } from "./dataStore/refreshStore";

const persistedState = localStorage.getItem('microsoftTask') 
                       ? JSON.parse(localStorage.getItem('microsoftTask'))
                       : {taskListReducer: taskListInitialState, refreshReducer: refreshInitialState}

const reducer = combineReducers({taskListReducer, refreshReducer})

const store = createStore(reducer, persistedState, composeWithDevTools())

store.subscribe(() => localStorage.setItem('microsoftTask', JSON.stringify(store.getState())))

export default store