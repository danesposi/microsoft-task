import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { taskListReducer } from './dataStore/taskListStore';

const persistedState = localStorage.getItem('microsoftTask') 
                       ? JSON.parse(localStorage.getItem('microsoftTask'))
                       : null

const store = createStore(taskListReducer, persistedState, composeWithDevTools())

store.subscribe(() => localStorage.setItem('microsoftTask', JSON.stringify(store.getState())))

export default store