import {combineReducers} from 'redux';
import InvoicesReducer from './invoicesReducer';
import InvoiceDetailsReducer from './invoiceDetailsReducer';
import ProductsReducer from './productsReducer';

const rootReducer = combineReducers({
    InvoicesList: InvoicesReducer,
    InvoiceDetails: InvoiceDetailsReducer,
    ProductsList: ProductsReducer
});

export default rootReducer;