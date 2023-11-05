import {
  GET_MENU_SUCCESS,
  GET_MENU_FAIL,
  POST_ADD_MENU_SUCCESS,
  POST_ADD_MENU_FAIL,
  PUT_UPDATE_MENU_SUCCESS,
  PUT_UPDATE_MENU_FAIL
} from "./actionTypes"

const INIT_STATE = {
  menu: [],
  error: [],
  loading: true,
}

const MenuReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
        error: [],
        loading: false,
      }

    case GET_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_ADD_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
        loading: false,
      }

    case POST_ADD_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_UPDATE_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
        loading: false,
      };

    case PUT_UPDATE_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return {...state, loading: false}
  }
}

export default MenuReducer
