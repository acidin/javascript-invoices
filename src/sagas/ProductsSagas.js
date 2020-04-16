import 'regenerator-runtime/runtime';
import axios from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { FETCH_PRODUCTS } from '../actions/types';
import { receiveProductsList } from '../actions/index';
import config from '../config.json';

// move to the separate api folder
const fetchProductsApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.SERVER_URI}/products`)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.status));
  });
};

// api end

export function* watchFetchProducts() {
  yield takeLatest(
    [
      // CLEAR_INVOICE_DETAILS_FETCH_DATA,
      // UPDATE_INVOICE_DETAILS,
      // UPDATE_PRODUCT_DETAILS,
      // PUSH_PRODUCT,
      // RECALCULATE_TOTAL,
      FETCH_PRODUCTS,
    ],
    callFetchProductsList
  );
}

export function* callFetchProductsList() {
  try {
    const response = yield call(fetchProductsApi);

    yield put(receiveProductsList(response.data));
  } catch (error) {
    console.error('-----------', error);
  }
}
