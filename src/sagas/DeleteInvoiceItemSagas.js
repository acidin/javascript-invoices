import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_INVOICE_ITEM } from '../actions/types';
import { deleteInvoiceItemSuccessful } from '../actions/index';
import config from '../config.json';
import { callRecalculateTotal } from './RecalculateTotalSagas';

// move to the separate api folder
const deleteInvoiceItemApi = ({ invoiceId, itemId }) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${config.SERVER_URI}/invoices/${invoiceId}/items/${itemId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};
// api end

export function* watchDeleteInvoiceItem() {
  yield takeLatest(DELETE_INVOICE_ITEM, callDeleteInvoiceItem);
}

function* callDeleteInvoiceItem(action) {
  try {
    const response = yield call(deleteInvoiceItemApi, action.payload);

    yield put(deleteInvoiceItemSuccessful(response.data.id));
    yield call(callRecalculateTotal);
  } catch (error) {
    console.error('-----------', error);
  }
}
