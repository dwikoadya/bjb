import axios from 'axios';
import env from 'config/env';

export const GET_ROLE_REQUEST = 'GET_ROLE_REQUEST';
export const GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS';
export const GET_ROLE_FAILED = 'GET_ROLE_FAILED';

const API_URL = `${env.baseUrl}api/v1`;

export const getRoles = () => async (dispatch) => {
  dispatch({ type: GET_ROLE_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = {
    url: API_URL + '/roles',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  }
  try {
    const response = await axios(config);
    dispatch({ type: GET_ROLE_SUCCESS, payload: response.data.data });
  } catch(error) {
    dispatch({ type: GET_ROLE_FAILED });
  }
}