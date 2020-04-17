import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UPDATE_INVOICE_ITEMS_QUANTITY } from '../actions/types';
import { updateInvoiceItemSuccessful } from '../actions/index';
import config from '../config.json';
import { callRecalculateTotal } from './RecalculateTotalSagas';
// import { callFetchInvoices } from './InvoicesSagas';

// move to the separate api folder
const updateInvoiceItemApi = (invoiceId, invoiceItemId, newQuantity) => {
  debugger;
  return new Promise((resolve, reject) => {
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios
      .put(
        `${config.SERVER_URI}/invoices/${invoiceId}/items/${invoiceItemId}`,
        {
          quantity: newQuantity,
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};
// api end

export function* watchUpdateInvoiceItem() {
  yield takeLatest(UPDATE_INVOICE_ITEMS_QUANTITY, callUpdateInvoiceItem);
}

function* callUpdateInvoiceItem(action) {
  try {
    const { invoiceId, invoiceItemId, newQuantity } = action.payload;
    const response = yield call(
      updateInvoiceItemApi,
      invoiceId,
      invoiceItemId,
      newQuantity
    );

    debugger;
    yield put(updateInvoiceItemSuccessful(response.data));

    yield call(callRecalculateTotal);

    // yield call(callFetchInvoices);
  } catch (error) {
    console.error('----------- push invoice error', error);
  }
}
