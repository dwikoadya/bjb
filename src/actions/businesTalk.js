import axios from 'axios';
import swal from 'sweetalert';
import env from 'config/env';

export const GET_BUSINESS_TALK_REQUEST = 'GET_BUSINESS_TALK_REQUEST';
export const GET_BUSINESS_TALK_SUCCESS = 'GET_BUSINESS_TALK_SUCCESS';
export const GET_BUSINESS_TALK_FAILED = 'GET_BUSINESS_TALK_FAILED';

export const ADD_BUSINESS_TALK_REQUEST = 'ADD_BUSINESS_TALK_REQUEST';
export const ADD_BUSINESS_TALK_SUCCESS = 'ADD_BUSINESS_TALK_SUCCESS';
export const ADD_BUSINESS_TALK_FAILED = 'ADD_BUSINESS_TALK_FAILED';

export const EDIT_BUSINESS_TALK_REQUEST = 'EDIT_BUSINESS_TALK_REQUEST';
export const EDIT_BUSINESS_TALK_SUCCESS = 'EDIT_BUSINESS_TALK_SUCCESS';
export const EDIT_BUSINESS_TALK_FAILED = 'EDIT_BUSINESS_TALK_FAILED';

export const DELETE_BUSINESS_TALK_REQUEST = 'DELETE_BUSINESS_TALK_REQUEST';
export const DELETE_BUSINESS_TALK_SUCCESS = 'DELETE_BUSINESS_TALK_SUCCESS';
export const DELETE_BUSINESS_TALK_FAILED = 'DELETE_BUSINESS_TALK_FAILED';

export const CHANGE_STATUS_BUSINESS_TALK_REQUEST = 'CHANGE_STATUS_BUSINESS_TALK_REQUEST';
export const CHANGE_STATUS_BUSINESS_TALK_SUCCESS = 'CHANGE_STATUS_BUSINESS_TALK_SUCCESS';
export const CHANGE_STATUS_BUSINESS_TALK_FAILED = 'CHANGE_STATUS_BUSINESS_TALK_FAILED';

export const SET_BUSINESS_TALK_DATA_DETAIL = 'SET_BUSINESS_TALK_DATA_DETAIL';
export const REFRESH_STATE_BUSINESS_TALK = 'REFRESH_STATE_BUSINESS_TALK';

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

export const getBusinessTalk = ({ payload }) => async (dispatch) => {
  dispatch({ type: GET_BUSINESS_TALK_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = {
    url: API_URL + `/business_talks?per_page=${payload.dataPerPage}&page=${payload.page || 1}&${payload.params ? queryBuilder(payload.params) : ''}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  };
  try {
    const response = await axios(config);
    const newArr = response.data.data.map((item) => Object.assign({}, item, {
      event_on_display: dateFormatter(item.event_on)
    }));
    const dataMap = Object.assign({}, response.data, {
      data: newArr
    });
    dispatch({ type: GET_BUSINESS_TALK_SUCCESS, payload: dataMap });
  } catch(error) {
    dispatch({ type: GET_BUSINESS_TALK_FAILED });
    errorHandler(error);
  }
};

export const addBusinessTalk = ({ payload }) => async (dispatch) => {
  dispatch({ type: ADD_BUSINESS_TALK_REQUEST });
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
    url: API_URL + '/business_talks',
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
      type: ADD_BUSINESS_TALK_SUCCESS, 
      payload: mappedData
    });
  } catch(error) {
    dispatch({ type: ADD_BUSINESS_TALK_FAILED });
    errorHandler(error);
  }
};

export const editBusinessTalk = ({ payload, targetId }) => async (dispatch) => {
  dispatch({ type: EDIT_BUSINESS_TALK_REQUEST });
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
    url: API_URL + '/business_talks/' + targetId,
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
    dispatch({ type: EDIT_BUSINESS_TALK_SUCCESS, payload: mappedData, id: targetId });
  } catch(error) {
    dispatch({ type: EDIT_BUSINESS_TALK_FAILED });
    errorHandler(error);
  }
};

export const deleteBusinessTalk = ({ payload }) => async (dispatch) => {
  dispatch({ type: DELETE_BUSINESS_TALK_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = { 
    url: API_URL + '/business_talks/' + payload.id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  }
  try {
    await axios(config);
    swal('Berhasil!', 'Anda berhasil menghapus data!', 'success');
    dispatch({ type: DELETE_BUSINESS_TALK_SUCCESS, id: payload.id });
  } catch(error) {
    dispatch({ type: DELETE_BUSINESS_TALK_FAILED });
    errorHandler(error);
  }
};

export const changeStatusBusinessTalk = ({ payload }) => async (dispatch) => {
  dispatch({ type: CHANGE_STATUS_BUSINESS_TALK_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  formData.append('business_talk[status]', payload.status);
  formData.append('business_talk[description]', payload.description);
  const config = {
    url: API_URL + '/business_talks/' + payload.id,
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
    dispatch({ type: CHANGE_STATUS_BUSINESS_TALK_SUCCESS, id: payload.id, status: payload.status });
  } catch(error) {
    dispatch({ type: CHANGE_STATUS_BUSINESS_TALK_FAILED });
    errorHandler(error);
  }
};

export const setBusinessTalkDataDetail = ({ payload }) => (dispatch) => {
  dispatch({ type: SET_BUSINESS_TALK_DATA_DETAIL, payload });
};

export const refreshStateBusinessTalk = () => (dispatch) => {
  dispatch({ type: REFRESH_STATE_BUSINESS_TALK });
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