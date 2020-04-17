import { all } from 'redux-saga/effects';
import { watchFetchInvoices } from './InvoicesSagas';
import { watchDeleteInvoice } from './InvoiceDeleteSagas';
import { watchCreateInvoice } from './CreateInvoiceSagas';
import { watchUpdateInvoice } from './UpdateInvoiceSagas';
import { watchAddInvoiceItem } from './AddInvoiceItemSagas';
import { watchFetchProducts } from './ProductsSagas';
import { watchFetchInvoiceItems } from './InvoiceItemsSagas';
import { watchFetchInvoiceDetails } from './InvoiceDetailsSagas';
import { watchUpdateInvoiceDetails } from './UpdateInvoiceDetailsSagas';
import { watchUpdateInvoiceItem } from './UpdateInvoiceItemSagas';
import { watchDeleteInvoiceItem } from './DeleteInvoiceItemSagas';
import { watchClearInvoiceDetailsFetch } from './ClearInvoiceDetailsFetchDataSagas';

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
    watchUpdateInvoiceItem(),
    watchDeleteInvoiceItem(),
    watchClearInvoiceDetailsFetch(),
  ]);
}
