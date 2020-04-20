import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PUSH_INVOICE } from '../actions/types';
import { createUpdateInvoiceSuccessful } from '../actions/index';
import { callFetchInvoices } from './InvoicesSagas';
import config from '../config.json';

// move to the separate api folder
const pushInvoiceApi = ({ customer_id, discount, sum }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .post(`${config.SERVER_URI}/invoices`, {
        customer_id,
        discount,
        total: sum,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};

const updateInvoiceApi = ({ id, customer_id, discount, total }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .put(`${config.SERVER_URI}/invoices/${id}`, {
        customer_id,
        discount,
        total,
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
  try {
    const invoice = action.payload,
      { id } = invoice;

    let response;

    if (id) {
      response = yield call(updateInvoiceApi, invoice);
    } else {
      response = yield call(pushInvoiceApi, invoice);
    }

    yield put(createUpdateInvoiceSuccessful(response.data));
    yield call(callFetchInvoices);
  } catch (error) {
    console.error('----------- push invoice error', error);
  }
}
