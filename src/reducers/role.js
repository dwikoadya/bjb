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

const roleReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_ROLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        success: true,
      }

    case actionTypes.GET_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      }

    default:
      return state;
  }
};

export default roleReducer;