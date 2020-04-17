import 'regenerator-runtime/runtime';
import { put, takeLatest } from 'redux-saga/effects';
import { CLEAR_INVOICE_DETAILS_FETCH_DATA } from '../actions/types';
import { fetchProductsList, clearInvoiceDetails } from '../actions/index';

export function* watchClearInvoiceDetailsFetch() {
  yield takeLatest(
    CLEAR_INVOICE_DETAILS_FETCH_DATA,
    callClearInvoiceDetailsFetch
  );
}

export function* callClearInvoiceDetailsFetch() {
  yield put(clearInvoiceDetails);
  yield put(fetchProductsList);
}
