import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PUSH_INVOICE } from '../actions/types';
import { createUpdateInvoiceSuccessful } from '../actions/index';
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

const updateInvoiceApi = ({ customer_id, discount, sum }) => {
  debugger;
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .put(`${config.SERVER_URI}/invoices/${invoice.id}`, {
        customer_id,
        discount,
        total: sum,
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
    const invoice = action.payload,
      { id } = invoice;

    let response;

    if (id) {
      response = yield call(updateInvoiceApi, invoice);
      console.log('update invoice response', response);
    } else {
      response = yield call(pushInvoiceApi, invoice);

      console.log('push invoice response', response);
    }

    yield put(createUpdateInvoiceSuccessful(response.data));
  } catch (error) {
    console.error('----------- push invoice error', error);
  }
}
