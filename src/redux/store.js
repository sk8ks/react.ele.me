import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';

const loggerMiddleware = createLogger();
let createStoreWithMiddleware = null;
if (process.env.NODE_ENV === 'development') {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,    // 打印 action 日志
    )(createStore);
} else if (process.env.NODE_ENV === 'production') {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
    )(createStore);
}


const configureStore = (initialState = {}) => createStoreWithMiddleware(rootReducer, initialState);

export default configureStore;
