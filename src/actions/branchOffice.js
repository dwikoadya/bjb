import axios from 'axios';
import env from 'config/env';

export const GET_BRANCH_OFFICE_REQUEST = 'GET_BRANCH_OFFICE_REQUEST';
export const GET_BRANCH_OFFICE_SUCCESS = 'GET_BRANCH_OFFICE_SUCCESS';
export const GET_BRANCH_OFFICE_FAILED = 'GET_BRANCH_OFFICE_FAILED';

const API_URL = `${env.baseUrl}api/v1`;

export const getBranchOffices = () => async (dispatch) => {
  dispatch({ type: GET_BRANCH_OFFICE_REQUEST });
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
    dispatch({ type: GET_BRANCH_OFFICE_SUCCESS, payload: response.data.data });
  } catch(error) {
    dispatch({ type: GET_BRANCH_OFFICE_FAILED });
  }
}