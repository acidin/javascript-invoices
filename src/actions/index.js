import * as types from './types';
import config from '../config.json';

const asyncFetch = (actionType, uri, options = {}, additionalAction) => {
  return (dispatch) => {
    dispatch({ type: actionType });

    fetch(`${config.SERVER_URI}${uri}`, options)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: `${actionType}_SUCCESSFUL`, payload: data })
      )
      .then(() => {
        if (additionalAction) dispatch(additionalAction);
      });
  };
};

export const fetchInvoicesList = () => {
  return {
    type: types.FETCH_INVOICES,
  };
};

export const receiveInvoicesList = (invoices) => {
  return {
    type: types.FETCH_INVOICES_SUCCESSFUL,
    payload: invoices,
  };
};

export const fetchProductsList = () => {
  return {
    type: types.FETCH_PRODUCTS,
  };
};

export const receiveProductsList = (products) => {
  return {
    type: types.FETCH_PRODUCTS_SUCCESSFUL,
    payload: products,
  };
};

export const pushInvoice = (invoice) => {
  return invoice.id ? updateInvoice(invoice) : createInvoice(invoice);
};

export const createInvoice = (invoice) => {
  return asyncFetch(types.PUSH_INVOICE, `/invoices`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoice),
  });
};

// export const createInvoice = (invoice) => {
//   return {
//     type: types.PUSH_INVOICE,
//     payload: invoice,
//   };
// };

// export const createInvoiceSuccessful = (invoice) => {
//   return {
//     type: types.PUSH_INVOICE_SUCCESSFUL,
//     payload: invoice,
//   };
// };

export const deleteInvoice = (invoiceId) => {
  return {
    type: types.DELETE_INVOICE,
    payload: invoiceId,
  };
};

export const deleteInvoiceSuccessful = (invoiceId) => {
  return {
    type: types.DELETE_INVOICE_SUCCESSFUL,
    payload: invoiceId,
  };
};

export const setInvoiceActive = (id) => {
  return {
    type: types.SET_INVOICE_ACTIVE,
    payload: { id },
  };
};

// export const updateInvoice = (invoice) => {
//   return asyncFetch(
//     types.PUSH_INVOICE,
//     `/invoices/${invoice.id}`,
//     {
//       method: 'put',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(invoice),
//     },
//     fetchInvoicesList()
//   );
// };

export const updateInvoice = (invoice) => {
  return {
    type: types.PUSH_INVOICE,
    payload: invoice,
  };
};

export const updateInvoiceSuccessful = (invoice) => {
  return {
    type: types.PUSH_INVOICE_SUCCESSFUL,
    payload: invoice,
  };
};

// export const updateInvoiceDetails = (field, value) => {
//   return (dispatch) => {
//     Promise.resolve(
//       dispatch({
//         type: types.UPDATE_INVOICE_DETAILS,
//         payload: { field, value },
//       })
//     )
//       .then(() => dispatch(recalculateTotal()))
//       .then(() => dispatch(fetchInvoicesList()));
//   };
// };

export const updateInvoiceDetails = (field, value) => {
  return {
    type: types.UPDATE_INVOICE_DETAILS,
    payload: { field, value },
  };
};

export const addInvoiceItem = (invoiceId, productId, quantity) => {
  return {
    type: types.ADD_INVOICE_ITEM,
    payload: { invoiceId, productId, quantity },
  };
};

export const addInvoiceItemSuccessfull = (invoiceData) => {
  return {
    type: types.ADD_INVOICE_ITEM_SUCCESSFUL,
    payload: invoiceData,
  };
};

export const fetchInvoiceItems = (invoiceId) => {
  return {
    type: types.FETCH_INVOICE_ITEMS,
    payload: invoiceId,
  };
};

export const receiveInvoiceItems = (invoiceItems) => {
  return {
    type: types.FETCH_INVOICE_ITEMS_SUCCESSFUL,
    payload: invoiceItems,
  };
};

export const updateInvoiceItem = (invoiceId, invoiceItemId, newQuantity) => {
  return asyncFetch(
    types.UPDATE_INVOICE_ITEMS_QUANTITY,
    `/invoices/${invoiceId}/items/${invoiceItemId}`,
    {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    },
    recalculateTotal()
  );
};

export const deleteInvoiceItem = (invoiceId, itemId) => {
  return asyncFetch(
    types.DELETE_INVOICE_ITEM,
    `/invoices/${invoiceId}/items/${itemId}`,
    {
      method: 'delete',
    },
    recalculateTotal()
  );
};

export const fetchInvoiceDetails = (invoiceId) => {
  return {
    type: types.FETCH_INVOICE_DETAILS,
    payload: invoiceId,
  };
};

export const receiveInvoiceDetails = (invoiceDetails) => {
  return {
    type: types.FETCH_INVOICE_DETAILS_SUCCESSFUL,
    payload: invoiceDetails,
  };
};

export const recalculateTotal = () => {
  return (dispatch, getState) => {
    const {
      invoiceItems,
      products,
      invoice: { discount },
    } = getState().InvoiceDetails;

    Promise.resolve(
      dispatch({
        type: types.RECALCULATE_TOTAL,
        payload: { invoiceItems, products, discount },
      })
    ).then(() => {
      dispatch(pushInvoice(getState().InvoiceDetails.invoice));
    });
  };
};

export const clearInvoiceDetails = () => {
  return {
    type: types.CLEAR_INVOICE_DETAILS,
  };
};

export const clearInvoiceDetailsFetchData = () => {
  return (dispatch) => {
    Promise.resolve(
      dispatch({
        type: types.CLEAR_INVOICE_DETAILS_FETCH_DATA,
      })
    )
      .then(dispatch(clearInvoiceDetails()))
      .then(dispatch(fetchProductsList()));
  };
};

export const pushProduct = (product) => {
  return product.id ? updateProduct(product) : createProduct(product);
};

export const createProduct = (product) => {
  return asyncFetch(types.PUSH_PRODUCT, `/products`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
};

export const updateProduct = (product) => {
  return asyncFetch(
    types.PUSH_PRODUCT,
    `/products/${product.id}`,
    {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    },
    fetchProductsList()
  );
};

export const updateProductDetails = (field, value) => {
  return (dispatch, getState) => {
    Promise.resolve(
      dispatch({
        type: types.UPDATE_PRODUCT_DETAILS,
        payload: { field, value },
      })
    )
      .then(() => dispatch(pushProduct(getState().ProductsList.productDetails)))
      .then(() => dispatch(fetchProductsList()));
  };
};

export const deleteProduct = (productId) => {
  return asyncFetch(types.DELETE_PRODUCT, `/products/${productId}`, {
    method: 'delete',
  });
};

export const setProductActive = (id) => {
  return {
    type: types.SET_PRODUCT_ACTIVE,
    payload: { id },
  };
};

export const fetchProductDetails = (id) => {
  return {
    type: types.FETCH_PRODUCT_DETAILS,
    payload: { id },
  };
};
