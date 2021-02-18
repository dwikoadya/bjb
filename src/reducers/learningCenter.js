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

const learningCenterReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_LEARNING_CENTER_REQUEST: 
    case actionTypes.ADD_LEARNING_CENTER_REQUEST:
    case actionTypes.EDIT_LEARNING_CENTER_REQUEST:
    case actionTypes.DELETE_LEARNING_CENTER_REQUEST:
    case actionTypes.CHANGE_STATUS_LEARNING_CENTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
        pagination: action.payload.pagination,
        success: true,
      }
    
    case actionTypes.GET_LEARNING_CENTER_FAILED:
    case actionTypes.ADD_LEARNING_CENTER_FAILED:
    case actionTypes.EDIT_LEARNING_CENTER_FAILED:
    case actionTypes.DELETE_LEARNING_CENTER_FAILED:
    case actionTypes.CHANGE_STATUS_LEARNING_CENTER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
      }

    case actionTypes.ADD_LEARNING_CENTER_SUCCESS:
      const learningCenter = [...state.data];
      learningCenter.push(action.payload);
      return {
        ...state,
        data: learningCenter,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.EDIT_LEARNING_CENTER_SUCCESS:
      const learningCenter2 = [...state.data];
      const dataIndex = learningCenter2.map(item => item.id).indexOf(action.id);
      learningCenter2[dataIndex] = action.payload;
      return {
        ...state,
        data: learningCenter2,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.DELETE_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.id),
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.CHANGE_STATUS_LEARNING_CENTER_SUCCESS:
      const learningCenter1 = [...state.data];
      const suspendedUserIndex = learningCenter1.map(user => user.id).indexOf(action.id);
      learningCenter1[suspendedUserIndex].status = action.status;
      return {
        ...state,
        data: learningCenter1,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.SET_LEARNING_CENTER_DATA_DETAIL:
      return {
        ...state,
        dataDetail: action.payload,
      }
    
    case actionTypes.REFRESH_STATE_LEARNING_CENTER:
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

export default learningCenterReducer;