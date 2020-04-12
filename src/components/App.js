import React from 'react';
import InvoicesList from '../components/InvoicesList';
import ProductsList from '../components/ProductsList';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import {Router, Route, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/RootSagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(ReduxThunk)
));

sagaMiddleware.run(rootSaga);

const App = (props) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={InvoicesList}/>
            <Route path='/products' component={ProductsList}/>
        </Router>
    </Provider>
);

export default App;