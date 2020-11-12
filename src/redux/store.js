import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import promiseMiddleware from "./promiseMiddleware";

import rootReducer from "./reducers";

const middleware = [thunk, promiseMiddleware];

export default createStore(rootReducer, applyMiddleware(...middleware));
