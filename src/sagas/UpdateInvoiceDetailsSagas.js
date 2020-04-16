import 'regenerator-runtime/runtime';
import { takeLatest, call } from 'redux-saga/effects';
import { UPDATE_INVOICE_DETAILS } from '../actions/types';
import { callRecalculateTotal } from './RecalculateTotalSagas';
import { callFetchInvoices } from './InvoicesSagas';

export function* watchUpdateInvoiceDetails() {
  yield takeLatest([UPDATE_INVOICE_DETAILS], callUpdateInvoiceDetails);
}

export function* callUpdateInvoiceDetails() {
  yield call(callRecalculateTotal);
  yield call(callFetchInvoices);
}
