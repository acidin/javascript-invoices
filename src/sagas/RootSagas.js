import { all, call } from 'redux-saga/effects';
import { watchFetchInvoices } from './InvoicesSagas';
import { watchDeleteInvoice } from './InvoiceDeleteSagas';
import { watchCreateInvoice } from './InvoicesDetailsSagas'
 
export default function* rootSaga() {
    yield all([
        watchFetchInvoices(),
        watchDeleteInvoice()
        // watchCreateInvoice()
    ]);
}