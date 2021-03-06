import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../Reducers/index";
import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


export default store;
