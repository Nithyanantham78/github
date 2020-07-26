import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import listReducer from "./Reducer/ListReducer";
import userReducer from "./Reducer/userReducer";

export default () => {
    return createStore(combineReducers({listReducer,userReducer}),
    applyMiddleware(thunkMiddleware));
}







