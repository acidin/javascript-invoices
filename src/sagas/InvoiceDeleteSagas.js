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
    // FETCH_INVOICES
} from '../actions/types';
import { deleteInvoiceSuccessful } from '../actions/index'
import config from '../config.json'
import { callFetchInvoices } from './InvoicesSagas'

// move to the separate api folder
const deleteInvoiceApi = (invoiceId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URI}/invoices/${invoiceId}`)
            .then(response => resolve(response))
            .catch(error => reject(error.response.status))
    });
}
// api end
 

export function* watchDeleteInvoice() {
    yield takeLatest(
        // CLEAR_INVOICE_DETAILS_FETCH_DATA,
        // UPDATE_INVOICE_DETAILS,
        // UPDATE_PRODUCT_DETAILS,
        // PUSH_PRODUCT,
        // RECALCULATE_TOTAL,
        DELETE_INVOICE, callDeleteInvoice)
}

function* callDeleteInvoice(action) {
    try {
        const response = yield call(deleteInvoiceApi, action.payload)

        yield put(deleteInvoiceSuccessful(response.data.id))
        yield call(callFetchInvoices)
    } catch(error) {
        console.error('-----------', error)
    }
}