import * as types from '../actions/types';

const INIT_STATE = {
    invoice: {
        discount: 0,
        sum: 0
    },
    customers: [],
    products: {},
    invoiceItems: [],
    activeInvoiceId: null
};

const InvoiceDetailsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS_SUCCESSFUL:
            return {
                ...state,
                products: action.payload
            };
        case types.PUSH_INVOICE_SUCCESSFUL:
            return {
                ...state,
                invoice: {...state.invoice, id: action.payload.id},
                activeInvoiceId: action.payload.id
            };
        case types.FETCH_INVOICE_DETAILS_SUCCESSFUL:
            return {
                ...state,
                invoice: action.payload
            };
        case types.UPDATE_INVOICE_DETAILS:
            return {
                ...state,
                invoice: {
                    ...state.invoice,
                    [action.payload.field]: action.payload.value
                },
                activeInvoiceId: invoiceItems && invoiceItems[0] && parseInt(invoiceItems[0].invoice_id)
            };
        case types.ADD_INVOICE_ITEM_SUCCESSFUL:
            return {
                ...state,
                invoiceItems: [...state.invoiceItems, action.payload]
            };
        case types.FETCH_INVOICE_ITEMS_SUCCESSFUL:
            return {
                ...state,
                invoiceItems: Object.values(action.payload)
            };
        case types.DELETE_INVOICE_ITEM_SUCCESSFUL:
            return {
                ...state,
                invoiceItems: state.invoiceItems.filter(
                    item => item.id !== action.payload.id
                )
            };
        case types.UPDATE_INVOICE_ITEMS_QUANTITY_SUCCESSFUL:
            const updatedItem = action.payload,
                updatedItemsList = state.invoiceItems.map(invoiceItem =>
                    invoiceItem.id === updatedItem.id ? updatedItem : invoiceItem
                );

            return {
                ...state,
                invoiceItems: updatedItemsList
            };
        case types.RECALCULATE_TOTAL:
            const {invoiceItems, discount, products} = action.payload,
                newTotal = invoiceItems.reduce((total, item) =>
                        total +
                        item.quantity * products.find(p => p.id === item.product_id).price
                        , 0) * (1 - discount / 100);

            return {
                ...state,
                invoice: {
                    ...state.invoice,
                    total: newTotal.toFixed(2)
                },
                activeInvoiceId: invoiceItems && invoiceItems[0] && parseInt(invoiceItems[0].invoice_id)
            };
        case types.CLEAR_INVOICE_DETAILS:
            return INIT_STATE;

        case types.CLEAR_INVOICE_DETAILS_FETCH_DATA:
            return state;

        case types.SET_INVOICE_ACTIVE:
            return {
                ...state,
                activeInvoiceId: action.payload.id
            }
    }

    return state;
};

export default InvoiceDetailsReducer;

