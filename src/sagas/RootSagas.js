import { all, call } from 'redux-saga/effects';
import { watchFetchInvoices } from './InvoicesSagas';
import { watchDeleteInvoice } from './InvoiceDeleteSagas';
import { watchCreateInvoice } from './InvoicesDetailsSagas'
import { watchAddInvoiceItem } from './AddInvoiceItemSagas'
 
export default function* rootSaga() {
    yield all([
        watchFetchInvoices(),
        watchDeleteInvoice(),
        watchAddInvoiceItem()
        // watchCreateInvoice()
    ]);
}