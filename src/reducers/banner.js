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

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_BANNER_REQUEST: 
    case actionTypes.ADD_BANNER_REQUEST:
    case actionTypes.EDIT_BANNER_REQUEST:
    case actionTypes.DELETE_BANNER_REQUEST:
    case actionTypes.CHANGE_STATUS_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_BANNER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
        pagination: action.payload.pagination,
        success: true,
      }
    
    case actionTypes.GET_BANNER_FAILED:
    case actionTypes.ADD_BANNER_FAILED:
    case actionTypes.EDIT_BANNER_FAILED:
    case actionTypes.DELETE_BANNER_FAILED:
    case actionTypes.CHANGE_STATUS_BANNER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
      }

    case actionTypes.ADD_BANNER_SUCCESS:
      const BannerCopy = [...state.data];
      BannerCopy.push(action.payload);
      return {
        ...state,
        data: BannerCopy,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.EDIT_BANNER_SUCCESS:
      const BannerCopy2 = [...state.data];
      const dataIndex = BannerCopy2.map(item => item.id).indexOf(action.id);
      BannerCopy2[dataIndex] = action.payload;
      return {
        ...state,
        data: BannerCopy2,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.DELETE_BANNER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.id),
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.CHANGE_STATUS_BANNER_SUCCESS:
      const BannerCopy1 = [...state.data];
      const suspendedUserIndex = BannerCopy1.map(user => user.id).indexOf(action.id);
      BannerCopy1[suspendedUserIndex].status = action.status;
      return {
        ...state,
        data: BannerCopy1,
        error: false,
        loading: false,
        success: true,
      }

    case actionTypes.SET_BANNER_DATA_DETAIL:
      return {
        ...state,
        dataDetail: action.payload,
      }
    
    case actionTypes.REFRESH_STATE_BANNER:
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

export default bannerReducer;