import "regenerator-runtime/runtime";
import { put, select } from 'redux-saga/effects';
import { 
    RECALCULATE_TOTAL,
} from '../actions/types';
import { pushInvoice } from '../actions/index'

export function* callRecalculateTotal() {
   const state = yield select();
   const {invoiceItems, products, invoice, invoice: {discount}} = state.InvoiceDetails;

   yield put({
        type: RECALCULATE_TOTAL,
        payload: {invoiceItems, products, discount}
    })

    yield put(pushInvoice(invoice))
}
