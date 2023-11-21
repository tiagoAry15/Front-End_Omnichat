import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
  POST_ADD_ORDER_SUCCESS,
  POST_ADD_ORDER_FAIL,
  PUT_UPDATE_ORDER_SUCCESS,
  PUT_UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL
} from "./actionTypes"

const INIT_STATE = {
  orders: [],
  error: [],
  loading: true,
}

const OrderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      }
    
    case GET_ORDER_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      }

    case POST_ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_UPDATE_ORDER_SUCCESS:
      const updatedOrder = action.payload;
      const orders = state.orders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      return {
        ...state,
        orders: orders,
        loading: false,
      };

    case PUT_UPDATE_ORDER_FAIL:
      console.error('Conteúdo de action.payload:', action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
      
    case DELETE_ORDER_SUCCESS:
      const orderIdToDelete = action.payload;
      console.log("Pedidos antes do delete:", state.orders)
      const updatedOrders = state.orders.filter((order, index) => index != orderIdToDelete);
      console.log("Pedidos pos-delete:", updatedOrders)
      return {
        ...state,
        orders: updatedOrders,
        loading: false,
      }
    
    case DELETE_ORDER_FAIL:
      console.error('Conteúdo de action.payload:', action.payload);
      return{
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return {...state, loading: true}
  }
}

export default OrderReducer
