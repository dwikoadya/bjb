import axios from 'axios';
import swal from 'sweetalert';
import env from 'config/env';

export const GET_BANNER_REQUEST = 'GET_BANNER_REQUEST';
export const GET_BANNER_SUCCESS = 'GET_BANNER_SUCCESS';
export const GET_BANNER_FAILED = 'GET_BANNER_FAILED';

export const ADD_BANNER_REQUEST = 'ADD_BANNER_REQUEST';
export const ADD_BANNER_SUCCESS = 'ADD_BANNER_SUCCESS';
export const ADD_BANNER_FAILED = 'ADD_BANNER_FAILED';

export const EDIT_BANNER_REQUEST = 'EDIT_BANNER_REQUEST';
export const EDIT_BANNER_SUCCESS = 'EDIT_BANNER_SUCCESS';
export const EDIT_BANNER_FAILED = 'EDIT_BANNER_FAILED';

export const DELETE_BANNER_REQUEST = 'DELETE_BANNER_REQUEST';
export const DELETE_BANNER_SUCCESS = 'DELETE_BANNER_SUCCESS';
export const DELETE_BANNER_FAILED = 'DELETE_BANNER_FAILED';

export const CHANGE_STATUS_BANNER_REQUEST = 'CHANGE_STATUS_BANNER_REQUEST';
export const CHANGE_STATUS_BANNER_SUCCESS = 'CHANGE_STATUS_BANNER_SUCCESS';
export const CHANGE_STATUS_BANNER_FAILED = 'CHANGE_STATUS_BANNER_FAILED';

export const SET_BANNER_DATA_DETAIL = 'SET_BANNER_DATA_DETAIL';
export const REFRESH_STATE_BANNER = 'REFRESH_STATE_BANNER';

const API_URL = `${env.baseUrl}api/v1`;

const queryBuilder = (array) => {
  /* eslint-disable no-unused-vars */
  const filtered = Object.entries(array).filter(([field, value]) => value)
  const convert = filtered.map(field => `q[${field[0]}]=${field[1].replace('$','')}`)
  return convert.join('&')
}

export const getBanner = ({ payload }) => async (dispatch) => {
  dispatch({ type: GET_BANNER_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = {
    url: API_URL + `/banners?per_page=${payload.dataPerPage}&page=${payload.page || 1}&${payload.params ? queryBuilder(payload.params) : ''}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  };
  try {
    const response = await axios(config);
    dispatch({ type: GET_BANNER_SUCCESS, payload: response.data });
  } catch(error) {
    dispatch({ type: GET_BANNER_FAILED });
    errorHandler(error);
  }
};

export const addBanner = ({ payload }) => async (dispatch) => {
  dispatch({ type: ADD_BANNER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  for (let [key, value] of Object.entries(payload)) {
    if (key === 'image') {
      Array.from(payload[key]).map(file => formData.append(`banner[${key}]`, file));
    } else {
      formData.append(`banner[${key}]`, value);
    }
  }
  const config = {
    url: API_URL + '/banners',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  };
  try {
    const response = await axios(config);
    swal('Berhasil!', 'Anda berhasil menambah data!', 'success');
    dispatch({ 
      type: ADD_BANNER_SUCCESS, 
      payload: response.data.data
    });
  } catch(error) {
    dispatch({ type: ADD_BANNER_FAILED });
    errorHandler(error);
  }
};

export const editBanner = ({ payload, targetId }) => async (dispatch) => {
  dispatch({ type: EDIT_BANNER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  for (let [key, value] of Object.entries(payload)) {
    if (key === 'image' && value) {
      Array.from(payload[key]).map(file => formData.append(`banner[${key}]`, file));
    } else {
      formData.append(`banner[${key}]`, value);
    }
  }
  const config = {
    url: API_URL + '/banners/' + targetId,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  };
  try {
    const response = await axios(config);
    swal('Berhasil!', 'Anda berhasil mengubah data!', 'success');
    dispatch({ type: EDIT_BANNER_SUCCESS, payload: response.data.data, id: targetId });
  } catch(error) {
    dispatch({ type: EDIT_BANNER_FAILED });
    errorHandler(error);
  }
};

export const deleteBanner = ({ payload }) => async (dispatch) => {
  dispatch({ type: DELETE_BANNER_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = { 
    url: API_URL + '/banners/' + payload.id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  }
  try {
    await axios(config);
    swal('Berhasil!', 'Anda berhasil menghapus data!', 'success');
    dispatch({ type: DELETE_BANNER_SUCCESS, id: payload.id });
  } catch(error) {
    dispatch({ type: DELETE_BANNER_FAILED });
    errorHandler(error);
  }
};

export const changeStatusBanner = ({ payload }) => async (dispatch) => {
  dispatch({ type: CHANGE_STATUS_BANNER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  formData.append('banner[status]', payload.status);
  formData.append('banner[description]', payload.description);
  const config = {
    url: API_URL + '/banners/' + payload.id,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  }
  try {
    await axios(config);
    if (payload.status === 'show') {
      swal('Berhasil!', 'Konten berhasil diperlihatkan!', 'success'); 
    } else {
      swal('Berhasil!', 'Konten berhasil disembunyikan!', 'success');
    }
    dispatch({ type: CHANGE_STATUS_BANNER_SUCCESS, id: payload.id, status: payload.status });
  } catch(error) {
    dispatch({ type: CHANGE_STATUS_BANNER_FAILED });
    errorHandler(error);
  }
};

export const setBannerDataDetail = ({ payload }) => (dispatch) => {
  dispatch({ type: SET_BANNER_DATA_DETAIL, payload });
};

export const refreshStateBanner = () => (dispatch) => {
  dispatch({ type: REFRESH_STATE_BANNER });
};

const errorHandler = (error) => {
  if (error?.response?.status === 401){
    localStorage.clear();
    window.location = '/auth/login';
  } else {
    swal(
      '', 
      'Terjadi kesalahan pada server',
      'error'
    )
  }
};