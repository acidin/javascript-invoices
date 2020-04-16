import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PUSH_INVOICE } from '../actions/types';
import { createInvoiceSuccessful } from '../actions/index';
import config from '../config.json';

// move to the separate api folder
const pushInvoiceApi = (invoice) => {
  debugger;
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .post(`${config.SERVER_URI}/invoices`, {
        invoice,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};
// api end

export function* watchCreateInvoice() {
  yield takeLatest(PUSH_INVOICE, callPushInvoice);
}

function* callPushInvoice(action) {
  debugger;
  console.log('---action----', action);
  try {
    const invoice = action.payload;
    const response = yield call(pushInvoiceApi, invoice);

    console.log('push invoice response', response);
    yield put(createInvoiceSuccessful(response.data));
  } catch (error) {
    console.error('----------- push invoice error', error);
  }
}
