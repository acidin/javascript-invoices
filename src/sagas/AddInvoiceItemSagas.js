import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_INVOICE_ITEM } from '../actions/types';
import { callRecalculateTotal } from './RecalculateTotalSagas';
import { addInvoiceItemSuccessfull } from '../actions/index';
import config from '../config.json';

// move to the separate api folder
const addInvoiceItemApi = ({ invoiceId, productId, quantity }) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .post(`${config.SERVER_URI}/invoices/${invoiceId}/items`, {
        product_id: productId,
        quantity: quantity,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};

// api end

export function* watchAddInvoiceItem() {
  yield takeLatest([ADD_INVOICE_ITEM], callAddInvoiceItem);
}

export function* callAddInvoiceItem(action) {
  try {
    const response = yield call(addInvoiceItemApi, action.payload);

    yield put(addInvoiceItemSuccessfull(response.data));

    yield call(callRecalculateTotal);
  } catch (error) {
    console.error('-----------', error);
  }
}
