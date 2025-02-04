import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_ORDERS,
  GET_ORDER_BY_ID,
  POST_ADD_ORDER,
  PUT_UPDATE_ORDER,
  DELETE_ORDER,
} from "./actionTypes";

import {
  getOrdersSuccess,
  getOrdersFail,
  getOrderByIdSuccess,
  getOrderByIdFail,
  addOrderSuccess,
  addOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,

} from "./actions";

import { getOrders, getOrderById, addOrder, updateOrder, deleteOrder} from './api';

function* onGetOrders() {
  try {

    const response = yield call(getOrders);
   
    console.log('Response:', response);
    yield put(getOrdersSuccess(response))
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    yield put(getOrdersFail(error));
  }
}

function* onGetOrderById({ orderId }) {
  try {
    const response = yield call(getOrderById, orderId);
    yield put(getOrderByIdSuccess(response));
  } catch (error) {
    yield put(getOrderByIdFail(error));
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

function* onUpdateOrder({ orderData }) {
  try {
    const response = yield call(updateOrder, orderData);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    console.error(error)
    console.error('Erro detalhado: ', error.response || error.mensage || error);
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ orderId }) {
  console.log('SAGA', orderId)
  try {
    const response = yield call(deleteOrder, orderId);
    console.log("Saga delete response:",response)
    yield put(deleteOrderSuccess(orderId));
  } catch (error) {
    yield put(deleteOrderFail(error));
  }
}


function* orderSaga() {
  yield takeEvery(GET_ORDER_BY_ID, onGetOrderById);
  yield takeLatest(GET_ORDERS, onGetOrders);
  yield takeEvery(POST_ADD_ORDER, onAddOrder);
  yield takeEvery(PUT_UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
}

export default orderSaga;
