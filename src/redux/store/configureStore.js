import { createStore, combineReducers } from 'redux';
import pbiReducer from '../reducers/pbiReducer';
import taskReducer from '../reducers/taskReducer';
import userReducer from '../reducers/userReducer';
import sprintReducer from '../reducers/sprintReducer';

//configureStore

const combine = combineReducers({
    pbiReducer,
    taskReducer,
    userReducer,
    sprintReducer
});

const store = () => {
    const store = createStore(combine);
    return store;
}

export default store;
