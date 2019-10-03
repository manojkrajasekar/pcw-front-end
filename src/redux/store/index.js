// import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';

// import pagesReducer from '../reducers/pagesReducer';
// import rootSaga from '../sagas';
// const configureStore = () => {
//     const sagaMiddleware = createSagaMiddleware();
//     const store = createStore(
//         pagesReducer,
//         compose(
//             applyMiddleware(createSagaMiddleware),
//             window.__REDUX_DEVTOOLs_extension &&
//                 window.__REDUX_DEVTOOLs_extension__(),
//         ),
//     );
//     sagaMiddleware.run(rootSaga);
//     return store;
// }

// export default configureStore;

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

import pagesReducer from '../reducers/pagesReducer';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    
    const store = createStore(
        pagesReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? compose(
                  applyMiddleware(sagaMiddleware),
                  window.__REDUX_DEVTOOLS_EXTENSION__(),
              )
            : applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;