import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_INVOICE_ITEMS } from '../actions/types';
import { receiveInvoiceItems } from '../actions/index';
import config from '../config.json';

// move to the separate api folder
const fetchInvoiceItemsApi = (invoiceId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.SERVER_URI}/invoices/${invoiceId}/items`)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};

// api end

export function* watchFetchInvoiceItems() {
  yield takeLatest([FETCH_INVOICE_ITEMS], callFetchInvoiceItems);
}

export function* callFetchInvoiceItems(action) {
  try {
    const response = yield call(fetchInvoiceItemsApi, action.payload);

    yield put(receiveInvoiceItems(response.data));
  } catch (error) {
    console.error('-----------', error);
  }
}
