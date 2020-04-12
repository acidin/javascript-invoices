import "regenerator-runtime/runtime";
import axios from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { 
    // CLEAR_INVOICE_DETAILS_FETCH_DATA,
    // UPDATE_INVOICE_DETAILS,
    // UPDATE_PRODUCT_DETAILS,
    // PUSH_PRODUCT,
    // RECALCULATE_TOTAL,
    // FETCH_INVOICES
    PUSH_INVOICE
} from '../actions/types';
import { createInvoiceSuccessful } from '../actions/index'
import config from '../config.json';

// move to the separate api folder
const pushInvoiceApi = (invoice) => {
    debugger
    return new Promise((resolve, reject) => {
        axios.defaults.headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        axios.post(`${config.SERVER_URI}/invoices`, {
            body: JSON.stringify(invoice)
        })
        .then(response => resolve(response))
        .catch(error => reject(error.response.status))
    })
}
// api end

export function* watchCreateInvoice() {
    yield takeLatest(PUSH_INVOICE, callPushInvoice)
}

function* callPushInvoice(action) {
    debugger
    console.log('---action----', action)
    try {
        const invoice = action.payload
        const response = yield call(pushInvoiceApi, invoice)

        console.log('push invoice response', response)
        yield put(createInvoiceSuccessful(response.data))
    } catch(error) {
        console.error('----------- push invoice error', error)
    }

}