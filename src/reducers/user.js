/* eslint-disable no-case-declarations */

import * as actionTypes from 'actions';

const initialState = {
  data: [],
  dataDetail: null,
  pagination: null,
  error: false,
  loading: false,
  success: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_USER_REQUEST: 
    case actionTypes.ADD_USER_REQUEST:
    case actionTypes.EDIT_USER_REQUEST:
    case actionTypes.DELETE_USER_REQUEST:
    case actionTypes.CHANGE_STATUS_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
        pagination: action.payload.pagination,
        success: true,
      }
    
    case actionTypes.GET_USER_FAILED:
    case actionTypes.ADD_USER_FAILED:
    case actionTypes.EDIT_USER_FAILED:
    case actionTypes.DELETE_USER_FAILED:
    case actionTypes.CHANGE_STATUS_USER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
      }

    case actionTypes.ADD_USER_SUCCESS:
      const userCopy = [...state.data];
      userCopy.push(action.payload);
      return {
        ...state,
        data: userCopy,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.EDIT_USER_SUCCESS:
      const userCopy2 = [...state.data];
      const dataIndex = userCopy2.map(item => item.id).indexOf(action.id);
      userCopy2[dataIndex] = action.payload;
      return {
        ...state,
        data: userCopy2,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.id),
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.CHANGE_STATUS_USER_SUCCESS:
      const copyUser = [...state.data];
      const suspendedUserIndex = copyUser.map(user => user.id).indexOf(action.id);
      copyUser[suspendedUserIndex].status = action.status;
      return {
        ...state,
        data: copyUser,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.SET_USER_DATA_DETAIL:
      return {
        ...state,
        dataDetail: action.payload,
      }
    
    case actionTypes.REFRESH_STATE_USER:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
      }

    default:
      return state;
  }
};

export default userReducer;