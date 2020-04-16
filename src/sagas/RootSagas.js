import { all, call } from 'redux-saga/effects';
import { watchFetchInvoices } from './InvoicesSagas';
import { watchDeleteInvoice } from './InvoiceDeleteSagas';
import { watchCreateInvoice } from './CreateInvoiceSagas';
import { watchUpdateInvoice } from './UpdateInvoiceSagas';
import { watchAddInvoiceItem } from './AddInvoiceItemSagas';
import { watchFetchProducts } from './ProductsSagas';
import { watchFetchInvoiceItems } from './InvoiceItemsSagas';
import { watchFetchInvoiceDetails } from './InvoiceDetailsSagas';
import { watchUpdateInvoiceDetails } from './UpdateInvoiceDetailsSagas';

export default function* rootSaga() {
  yield all([
    watchFetchInvoices(),
    watchDeleteInvoice(),
    watchAddInvoiceItem(),
    watchFetchProducts(),
    watchFetchInvoiceItems(),
    watchFetchInvoiceDetails(),
    // watchCreateInvoice(),
    watchUpdateInvoice(),
    watchUpdateInvoiceDetails(),
  ]);
}
