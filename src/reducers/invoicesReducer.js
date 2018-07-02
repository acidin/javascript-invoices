import * as types from '../actions/types';

const INIT_STATE = {
    invoices: [],
    customers: {}
};

const InvoicesReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.FETCH_INVOICES:
            return {
                ...state,
                isFetching: true
            };
        case types.FETCH_INVOICES_SUCCESSFUL:
            return {
                ...state,
                invoices: Object.values(action.payload),
                isFetching: false
            };
        case types.DELETE_INVOICE_SUCCESSFUL:
            return {
                ...state,
                invoices: state.invoices.filter(
                    (invoice) => invoice.id !== action.payload.id)
            };
    }

    return state;
};

export default InvoicesReducer;

