import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_INVOICE_DETAILS } from '../actions/types';
import { receiveInvoiceDetails } from '../actions/index';
import config from '../config.json';

// move to the separate api folder
const fetchInvoiceDetailsApi = (invoiceId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.SERVER_URI}/invoices/${invoiceId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};

// api end

export function* watchFetchInvoiceDetails() {
  yield takeLatest([FETCH_INVOICE_DETAILS], callFetchInvoiceDetails);
}

export function* callFetchInvoiceDetails(action) {
  try {
    const response = yield call(fetchInvoiceDetailsApi, action.payload);

    yield put(receiveInvoiceDetails(response.data));
  } catch (error) {
    console.error('-----------', error);
  }
}
