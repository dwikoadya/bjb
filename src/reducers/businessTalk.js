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

const businessTalkReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_BUSINESS_TALK_REQUEST: 
    case actionTypes.ADD_BUSINESS_TALK_REQUEST:
    case actionTypes.EDIT_BUSINESS_TALK_REQUEST:
    case actionTypes.DELETE_BUSINESS_TALK_REQUEST:
    case actionTypes.CHANGE_STATUS_BUSINESS_TALK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_BUSINESS_TALK_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
        pagination: action.payload.pagination,
        success: true,
      }
    
    case actionTypes.GET_BUSINESS_TALK_FAILED:
    case actionTypes.ADD_BUSINESS_TALK_FAILED:
    case actionTypes.EDIT_BUSINESS_TALK_FAILED:
    case actionTypes.DELETE_BUSINESS_TALK_FAILED:
    case actionTypes.CHANGE_STATUS_BUSINESS_TALK_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
      }

    case actionTypes.ADD_BUSINESS_TALK_SUCCESS:
      const businessTalkCopy = [...state.data];
      businessTalkCopy.push(action.payload);
      return {
        ...state,
        data: businessTalkCopy,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.EDIT_BUSINESS_TALK_SUCCESS:
      const businessTalkCopy2 = [...state.data];
      const dataIndex = businessTalkCopy2.map(item => item.id).indexOf(action.id);
      businessTalkCopy2[dataIndex] = action.payload;
      return {
        ...state,
        data: businessTalkCopy2,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.DELETE_BUSINESS_TALK_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.id),
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.CHANGE_STATUS_BUSINESS_TALK_SUCCESS:
      const businessTalkCopy1 = [...state.data];
      const suspendedUserIndex = businessTalkCopy1.map(user => user.id).indexOf(action.id);
      businessTalkCopy1[suspendedUserIndex].status = action.status;
      return {
        ...state,
        data: businessTalkCopy1,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.SET_BUSINESS_TALK_DATA_DETAIL:
      return {
        ...state,
        dataDetail: action.payload,
      }
    
    case actionTypes.REFRESH_STATE_BUSINESS_TALK:
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

export default businessTalkReducer;