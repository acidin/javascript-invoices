import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PUSH_INVOICE } from '../actions/types';
import { updateInvoiceSuccessful } from '../actions/index';
import config from '../config.json';
import { callFetchInvoices } from './InvoicesSagas';

// move to the separate api folder
const updateInvoiceApi = (invoice) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .put(`${config.SERVER_URI}/invoices/${invoice.id}`, {
        invoice,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};
// api end

export function* watchUpdateInvoice() {
  yield takeLatest(PUSH_INVOICE, callUpdateInvoice);
}

function* callUpdateInvoice(action) {
  try {
    const invoice = action.payload;
    const response = yield call(updateInvoiceApi, invoice);

    yield put(updateInvoiceSuccessful(response.data));

    yield call(callFetchInvoices);
  } catch (error) {
    console.error('----------- push invoice error', error);
  }
}
