import axios from 'axios';
import swal from 'sweetalert';
import env from 'config/env';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';

export const CHANGE_STATUS_USER_REQUEST = 'CHANGE_STATUS_USER_REQUEST';
export const CHANGE_STATUS_USER_SUCCESS = 'CHANGE_STATUS_USER_SUCCESS';
export const CHANGE_STATUS_USER_FAILED = 'CHANGE_STATUS_USER_FAILED';

export const SET_USER_DATA_DETAIL = 'SET_USER_DATA_DETAIL';
export const REFRESH_STATE_USER = 'REFRESH_STATE_USER';

const API_URL = `${env.baseUrl}api/v1`;

export const getUser = ({ payload }) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = {
    url: API_URL + `/user_admins?per_page=${payload.dataPerPage}&order=asc&page=${payload.page}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  };
  try {
    const response = await axios(config);
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
  } catch(error) {
    dispatch({ type: GET_USER_FAILED });
    errorHandler(error);
  }
};

export const addUser = ({ payload }) => async (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  for (let [key, value] of Object.entries(payload)) {
    if (key === 'photo') {
      Array.from(payload[key]).map(file => formData.append(`user[${key}]`, file));
    } else {
      if (key === 'job_position_id' || key === 'branch_office_id' || key === 'nip') {
        formData.append(`user[user_profile_attributes][${key}]`, value);
      } else {
        if (key === 'role_ids') {
          formData.append('user[role_ids][]', value);
        } else {
          formData.append(`user[${key}]`, value);
        }
      }
    }
  }
  const config = {
    url: API_URL + '/user_admins',
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
      type: ADD_USER_SUCCESS, 
      payload: response.data.data
    });
  } catch(error) {
    dispatch({ type: ADD_USER_FAILED });
    errorHandler(error);
  }
};

export const editUser = ({ payload, targetId }) => async (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  for (let [key, value] of Object.entries(payload)) {
    if (key === 'photo' && value) {
      Array.from(payload[key]).map(file => formData.append(`user[${key}]`, file));
    } else {
      if (key === 'job_position_id' || key === 'branch_office_id' || key === 'nip') {
        formData.append(`user[user_profile_attributes][${key}]`, value);
      } else {
        if (key === 'role_ids') {
          formData.append('user[role_ids][]', value);
        } else {
          formData.append(`user[${key}]`, value);
        }
      }
    }
  }
  const config = {
    url: API_URL + '/user_admins/' + targetId,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  };
  try {
    const response = await axios(config);
    swal('Berhasil!', 'Anda berhasil mengubah data!', 'success');
    dispatch({ type: EDIT_USER_SUCCESS, payload: response.data.data, id: targetId });
  } catch(error) {
    dispatch({ type: EDIT_USER_FAILED });
    errorHandler(error);
  }
};

export const deleteUser = ({ payload }) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = { 
    url: API_URL + '/user_admins/' + payload.id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  }
  try {
    await axios(config);
    swal('Berhasil!', 'Anda berhasil menghapus data!', 'success');
    dispatch({ type: DELETE_USER_SUCCESS, id: payload.id });
  } catch(error) {
    dispatch({ type: DELETE_USER_FAILED });
    errorHandler(error);
  }
};

export const changeStatusUser = ({ payload }) => async (dispatch) => {
  dispatch({ type: CHANGE_STATUS_USER_REQUEST });
  const freshToken = localStorage.getItem('token');
  let formData = new FormData();
  formData.append('user[status]', payload.status);
  const config = {
    url: API_URL + '/user_admins/' + payload.id,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${freshToken}`
    },
    data: formData
  }
  try {
    await axios(config);
    if (payload.status === 'suspend') {
      swal('Berhasil!', 'User berhasil disuspend!', 'success'); 
    } else {
      swal('Berhasil!', 'User berhasil diaktifkan!', 'success');
    }
    dispatch({ type: CHANGE_STATUS_USER_SUCCESS, id: payload.id, status: payload.status });
  } catch(error) {
    dispatch({ type: CHANGE_STATUS_USER_FAILED });
    errorHandler(error);
  }
};

export const setUserDataDetail = ({ payload }) => (dispatch) => {
  dispatch({ type: SET_USER_DATA_DETAIL, payload });
};

export const refreshStateUser = () => (dispatch) => {
  dispatch({ type: REFRESH_STATE_USER });
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