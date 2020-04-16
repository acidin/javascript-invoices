import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_INVOICES } from '../actions/types';
import { receiveInvoicesList, deleteInvoiceSuccessful } from '../actions/index';
import config from '../config.json';

// move to the separate api folder
const fetchInvoicesApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.SERVER_URI}/invoices`)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};
// api end

export function* watchFetchInvoices() {
  yield takeLatest([FETCH_INVOICES], callFetchInvoices);
}

export function* callFetchInvoices() {
  try {
    const response = yield call(fetchInvoicesApi);

    yield put(receiveInvoicesList(response.data));
  } catch (error) {
    console.error('-----------', error);
  }
}
