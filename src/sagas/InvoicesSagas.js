import "regenerator-runtime/runtime";
import axios from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { 
    // CLEAR_INVOICE_DETAILS_FETCH_DATA,
    // UPDATE_INVOICE_DETAILS,
    // UPDATE_PRODUCT_DETAILS,
    // PUSH_PRODUCT,
    // RECALCULATE_TOTAL,
    DELETE_INVOICE,
    FETCH_INVOICES
} from '../actions/types';
import { receiveInvoicesList, deleteInvoiceSuccessful } from '../actions/index'
import config from '../config.json';

// move to the separate api folder
const fetchInvoicesApi = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URI}/invoices`)
            .then(response => resolve(response))
            .catch(error => reject(error.response.status))
    });
}

// api end
 
export function* watchFetchInvoices() {
    yield takeLatest([
        // CLEAR_INVOICE_DETAILS_FETCH_DATA,
        // UPDATE_INVOICE_DETAILS,
        // UPDATE_PRODUCT_DETAILS,
        // PUSH_PRODUCT,
        // RECALCULATE_TOTAL,
        FETCH_INVOICES
    ], callFetchInvoices);
}

 
export function* callFetchInvoices() {
    try {
        // const fetchInvoices = fetch(`${config.SERVER_URI}'/invoices'`, {})
        const response = yield call(fetchInvoicesApi);

        console.log('fetch invoices response-----', response)
        yield put(receiveInvoicesList(response.data)); 
    } catch(error) {
        console.error('-----------', error)
    }
}
