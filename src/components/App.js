import React from 'react';
import InvoicesList from '../components/InvoicesList';
import ProductsList from '../components/ProductsList';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import {Router, Route, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk)
));

const App = (props) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={InvoicesList}/>
            <Route path='/products' component={ProductsList}/>
        </Router>
    </Provider>
);

export default App;