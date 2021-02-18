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

const jobPositionReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_JOB_POSITION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_JOB_POSITION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        success: true,
      }

    case actionTypes.GET_JOB_POSITION_FAILED:
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

export default jobPositionReducer;