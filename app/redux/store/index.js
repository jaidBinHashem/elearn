import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";

import combineReducers from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const initialState = {};

const store = createStore(
    combineReducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
    )
);

sagaMiddleware.run(rootSaga);
// const action = type => store.dispatch({type});

export default store;
