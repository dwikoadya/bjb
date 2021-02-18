import axios from 'axios';
import swal from 'sweetalert';
import env from 'config/env';

export const GET_LEARNING_CENTER_REQUEST = 'GET_LEARNING_CENTER_REQUEST';
export const GET_LEARNING_CENTER_SUCCESS = 'GET_LEARNING_CENTER_SUCCESS';
export const GET_LEARNING_CENTER_FAILED = 'GET_LEARNING_CENTER_FAILED';

export const ADD_LEARNING_CENTER_REQUEST = 'ADD_LEARNING_CENTER_REQUEST';
export const ADD_LEARNING_CENTER_SUCCESS = 'ADD_LEARNING_CENTER_SUCCESS';
export const ADD_LEARNING_CENTER_FAILED = 'ADD_LEARNING_CENTER_FAILED';

export const EDIT_LEARNING_CENTER_REQUEST = 'EDIT_LEARNING_CENTER_REQUEST';
export const EDIT_LEARNING_CENTER_SUCCESS = 'EDIT_LEARNING_CENTER_SUCCESS';
export const EDIT_LEARNING_CENTER_FAILED = 'EDIT_LEARNING_CENTER_FAILED';

export const DELETE_LEARNING_CENTER_REQUEST = 'DELETE_LEARNING_CENTER_REQUEST';
export const DELETE_LEARNING_CENTER_SUCCESS = 'DELETE_LEARNING_CENTER_SUCCESS';
export const DELETE_LEARNING_CENTER_FAILED = 'DELETE_LEARNING_CENTER_FAILED';

export const CHANGE_STATUS_LEARNING_CENTER_REQUEST = 'CHANGE_STATUS_LEARNING_CENTER_REQUEST';
export const CHANGE_STATUS_LEARNING_CENTER_SUCCESS = 'CHANGE_STATUS_LEARNING_CENTER_SUCCESS';
export const CHANGE_STATUS_LEARNING_CENTER_FAILED = 'CHANGE_STATUS_LEARNING_CENTER_FAILED';

export const SET_LEARNING_CENTER_DATA_DETAIL = 'SET_LEARNING_CENTER_DATA_DETAIL';
export const REFRESH_STATE_LEARNING_CENTER = 'REFRESH_STATE_LEARNING_CENTER';

const API_URL = `${env.baseUrl}api/v1`;

const month = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

const dateFormatter = (date) => {
  const arr = date.split('-');
  return `${arr[2]} ${month[arr[1] - 1]} ${arr[0]}`
};

const queryBuilder = (array) => {
  /* eslint-disable no-unused-vars */
  const filtered = Object.entries(array).filter(([field, value]) => value)
  const convert = filtered.map(field => `q[${field[0]}]=${field[1].replace('$','')}`)
  return convert.join('&')
}

export const getLearningCenter = ({ payload }) => async (dispatch) => {
  dispatch({ type: GET_LEARNING_CENTER_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = {
    url: API_URL + `/learning_centers?per_page=${payload.dataPerPage}&page=${payload.page || 1}&${payload.params ? queryBuilder(payload.params) : ''}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  };
  try {
    const response = await axios(config);
    dispatch({ type: GET_LEARNING_CENTER_SUCCESS, payload: response.data });
  } catch(error) {
    dispatch({ type: GET_LEARNING_CENTER_FAILED });
    errorHandler(error);
  }
};

export const addLearningCenter = ({ payload }) => async (dispatch) => {
  dispatch({ type: ADD_LEARNING_CENTER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  for (let [key, value] of Object.entries(payload)) {
    if (key === 'image') {
      Array.from(payload[key]).map(file => formData.append(`business_talk[${key}]`, file));
    } else {
      formData.append(`business_talk[${key}]`, value);
    }
  }
  const config = {
    url: API_URL + '/learning_centers',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  };
  try {
    const response = await axios(config);
    const mappedData = Object.assign({}, response.data.data, {
      event_on_display: dateFormatter(response.data.data.event_on)
    })
    swal('Berhasil!', 'Anda berhasil menambah data!', 'success');
    dispatch({ 
      type: ADD_LEARNING_CENTER_SUCCESS, 
      payload: mappedData
    });
  } catch(error) {
    dispatch({ type: ADD_LEARNING_CENTER_FAILED });
    errorHandler(error);
  }
};

export const editLearningCenter = ({ payload, targetId }) => async (dispatch) => {
  dispatch({ type: EDIT_LEARNING_CENTER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  for (let [key, value] of Object.entries(payload)) {
    if (key === 'image' && value) {
      Array.from(payload[key]).map(file => formData.append(`business_talk[${key}]`, file));
    } else {
      formData.append(`business_talk[${key}]`, value);
    }
  }
  const config = {
    url: API_URL + '/learning_centers/' + targetId,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  };
  try {
    const response = await axios(config);
    const mappedData = Object.assign({}, response.data.data, {
      event_on_display: dateFormatter(response.data.data.event_on)
    })
    swal('Berhasil!', 'Anda berhasil mengubah data!', 'success');
    dispatch({ type: EDIT_LEARNING_CENTER_SUCCESS, payload: mappedData, id: targetId });
  } catch(error) {
    dispatch({ type: EDIT_LEARNING_CENTER_FAILED });
    errorHandler(error);
  }
};

export const deleteLearningCenter = ({ payload }) => async (dispatch) => {
  dispatch({ type: DELETE_LEARNING_CENTER_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = { 
    url: API_URL + '/learning_centers/' + payload.id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  }
  try {
    await axios(config);
    swal('Berhasil!', 'Anda berhasil menghapus data!', 'success');
    dispatch({ type: DELETE_LEARNING_CENTER_SUCCESS, id: payload.id });
  } catch(error) {
    dispatch({ type: DELETE_LEARNING_CENTER_FAILED });
    errorHandler(error);
  }
};

export const changeStatusLearningCenter = ({ payload }) => async (dispatch) => {
  dispatch({ type: CHANGE_STATUS_LEARNING_CENTER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  formData.append('business_talk[status]', payload.status);
  formData.append('business_talk[description]', payload.description);
  const config = {
    url: API_URL + '/learning_centers/' + payload.id,
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
    dispatch({ type: CHANGE_STATUS_LEARNING_CENTER_SUCCESS, id: payload.id, status: payload.status });
  } catch(error) {
    dispatch({ type: CHANGE_STATUS_LEARNING_CENTER_FAILED });
    errorHandler(error);
  }
};

export const setLearningCenterDataDetail = ({ payload }) => (dispatch) => {
  dispatch({ type: SET_LEARNING_CENTER_DATA_DETAIL, payload });
};

export const refreshStateLearningCenter = () => (dispatch) => {
  dispatch({ type: REFRESH_STATE_LEARNING_CENTER });
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