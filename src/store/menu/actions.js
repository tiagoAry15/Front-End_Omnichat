import {
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_FAIL,
  POST_ADD_MENU,
  POST_ADD_MENU_SUCCESS,
  POST_ADD_MENU_FAIL,
  PUT_UPDATE_MENU,
  PUT_UPDATE_MENU_SUCCESS,
  PUT_UPDATE_MENU_FAIL,
} from "./actionTypes"

export const getMenu = () => ({
  type: GET_MENU,
})

export const getMenuSuccess = menu => ({
  type: GET_MENU_SUCCESS,
  payload: menu,
})

export const getMenuFail = error => ({
  type: GET_MENU_FAIL,
  payload: error,
})

export const addMenu = menuData => ({
  type: POST_ADD_MENU,
  menuData,
})

export const addMenuSuccess = menu => ({
  type: POST_ADD_MENU_SUCCESS,
  payload: menu,
})

export const addMenuFail = error => ({
  type: POST_ADD_MENU_FAIL,
  payload: error,
})

export const updateMenu = menuData => ({
  type: PUT_UPDATE_MENU,
  menuData,
})

export const updateMenuSuccess = menu => ({
  type: PUT_UPDATE_MENU_SUCCESS,
  payload: menu,
})

export const updateMenuFail = error => ({
  type: PUT_UPDATE_MENU_FAIL,
  payload: error,
})
