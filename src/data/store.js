import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers';
import promiseMiddleware from './middlewares/promise';
import notificationsMiddleware from './middlewares/notifications';

export default function configureStore(preloadedState) {
    const middlewares = [/* loggerMiddleware, thunkMiddleware,*/promiseMiddleware, notificationsMiddleware ];
    const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer, /*monitorReducersEnhancer*/];
    const composedEnhancers = compose(...enhancers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    if(process.env.NODE_ENV !== 'production' && module.hot){
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    };

    return store;
}