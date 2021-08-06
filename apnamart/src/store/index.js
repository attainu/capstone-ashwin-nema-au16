import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
    thunk
]
const appMiddleware = applyMiddleware(...middlewares)

export default createStore(reducers,composer(appMiddleware));