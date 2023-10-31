import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_MENU,
   POST_ADD_MENU,
  PUT_UPDATE_MENU,
} from "./actionTypes";


import {
  getMenuSuccess,
  getMenuFail,
  addMenuSuccess,
  addMenuFail,
  updateMenuSuccess,
  updateMenuFail

} from "./actions";

import { getMenu, createMenu, updateMenu } from './api';

function* onGetMenu() {
  try {
    const response = yield call(getMenu);
    yield put(getMenuSuccess(response));
  } catch (error) {
    yield put(getMenuFail(error));
  }
}


function* oncreateMenu({ Menu }) {
  try {
    const response = yield call(createMenu, Menu);
    yield put(addMenuSuccess(response));
  } catch (error) {
    yield put(addMenuFail(error));
  }
}

function* onUpdateMenu({ Menu }) {
  try {
    const response = yield call(updateMenu, Menu);
    yield put(updateMenuSuccess(response));
  } catch (error) {
    yield put(updateMenuFail(error));
  }
}


function* menuSaga() {
  yield takeLatest(GET_MENU, onGetMenu);
  yield takeEvery(POST_ADD_MENU, oncreateMenu);
  yield takeEvery(PUT_UPDATE_MENU, onUpdateMenu);

}

export default menuSaga;
