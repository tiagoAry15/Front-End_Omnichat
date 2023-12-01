import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
  POST_ADD_ORDER,
  POST_ADD_ORDER_SUCCESS,
  POST_ADD_ORDER_FAIL,
  PUT_UPDATE_ORDER,
  PUT_UPDATE_ORDER_SUCCESS,
  PUT_UPDATE_ORDER_FAIL,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL
} from "./actionTypes"

export const getOrders = () => ({
  type: GET_ORDERS,
})

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})

export const getOrdersFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const getOrderById = orderId => ({
  type: GET_ORDER_BY_ID,
  orderId,
})

export const getOrderByIdSuccess = order => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  payload: order,
})

export const getOrderByIdFail = error => ({
  type: GET_ORDER_BY_ID_FAIL,
  payload: error,
})

export const addOrder = order => ({
  type: POST_ADD_ORDER,
  order,
})

export const addOrderSuccess = order => ({
  type: POST_ADD_ORDER_SUCCESS,
  payload: order,
})

export const addOrderFail = error => ({
  type: POST_ADD_ORDER_FAIL,
  payload: error,
})

export const updateOrder = orderData => (
  console.warn('ativado', orderData),
  {
  type: PUT_UPDATE_ORDER,
  orderData,
})

export const updateOrderSuccess = order => (
  console.log('funcionou', order),
  {
  type: PUT_UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrderFail = error => (
  {
  type: PUT_UPDATE_ORDER_FAIL,
  payload: error,
})

export const deleteOrder = orderId => {
  console.log("ACTION DELETE_ORDER: ",orderId)
return {
  type: DELETE_ORDER,
  orderId,
  };
};

export const deleteOrderSuccess = orderId => {
  console.log("DELETEORDER_SUCESS: ", orderId)
  return{
  type: DELETE_ORDER_SUCCESS,
  payload: orderId,
}};

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})
