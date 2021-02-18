import axios from 'axios';
import env from 'config/env';

export const GET_JOB_POSITION_REQUEST = 'GET_JOB_POSITION_REQUEST';
export const GET_JOB_POSITION_SUCCESS = 'GET_JOB_POSITION_SUCCESS';
export const GET_JOB_POSITION_FAILED = 'GET_JOB_POSITION_FAILED';

const API_URL = `${env.baseUrl}api/v1`;

export const getJobPositions = () => async (dispatch) => {
  dispatch({ type: GET_JOB_POSITION_REQUEST });
  const freshToken = localStorage.getItem('token');
  const config = {
    url: API_URL + '/job_positions',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${freshToken}`
    }
  }
  try {
    const response = await axios(config);
    dispatch({ type: GET_JOB_POSITION_SUCCESS, payload: response.data.data });
  } catch(error) {
    dispatch({ type: GET_JOB_POSITION_FAILED });
  }
}