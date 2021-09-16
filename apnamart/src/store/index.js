import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
    thunk
]

const appMiddleware = applyMiddleware(...middlewares)

export const store = createStore(reducers,composer(appMiddleware))

export const persistor = persistStore(store)