import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_ORDERS,
  POST_ADD_ORDER,
  PUT_UPDATE_ORDER,
  DELETE_ORDER,
} from "./actionTypes";

import {
  getOrdersSuccess,
  getOrdersFail,
  addOrderSuccess,
  addOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,

} from "./actions";

import { getOrders, addOrder, updateOrder, deleteOrder } from './api';

function* onGetOrders() {
  try {
    console.log('Call API...');
    const response = yield call(fetch, 'https://us-central1-pizzadobill-rpin.cloudfunctions.net/read_all_orders');
    console.log('API CHAMADA COM SUCESSO');
    const data = yield response.json();
    console.log('API DATA: ', data);
    yield put(getOrdersSuccess(data))
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    yield put(getOrdersFail(error));
  }
}


function* onAddOrder({ order }) {
  try {
    const response = yield call(addOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFail(error));
  }
}

function* onUpdateOrder({ order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    console.error(error)
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ orderId }) {
  try {
    const response = yield call(deleteOrder, orderId);
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    yield put(deleteOrderFail(error));
  }
}


function* orderSaga() {
  yield takeLatest(GET_ORDERS, onGetOrders);
  yield takeEvery(POST_ADD_ORDER, onAddOrder);
  yield takeEvery(PUT_UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
}

export default orderSaga;
