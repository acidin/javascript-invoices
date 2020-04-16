import { all, call } from 'redux-saga/effects';
import { watchFetchInvoices } from './InvoicesSagas';
import { watchDeleteInvoice } from './InvoiceDeleteSagas';
import { watchCreateInvoice } from './InvoicesDetailsSagas';
import { watchAddInvoiceItem } from './AddInvoiceItemSagas';
import { watchFetchProducts } from './ProductsSagas';
import { watchFetchInvoiceItems } from './InvoiceItemsSagas';
import { watchFetchInvoiceDetails } from './InvoiceDetailsSagas';

export default function* rootSaga() {
  yield all([
    watchFetchInvoices(),
    watchDeleteInvoice(),
    watchAddInvoiceItem(),
    watchFetchProducts(),
    watchFetchInvoiceItems(),
    watchFetchInvoiceDetails(),
    // watchCreateInvoice()
  ]);
}
