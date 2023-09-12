import axios from "axios";
import {ACTION_TYPE, BASE_URL} from "../../constants/constants";

const fetchQuestions = () => {
  return dispatch => {
    return axios
      .get(BASE_URL)
      .then(res => {
        dispatch(fetchDataSuccess(res?.data?.results));
        return res?.data;
      })
      .catch(err => {
        dispatch(fetchDataError(err));
      });
  };
};

const fetchDataSuccess = data => {
  return {
    type: ACTION_TYPE.GET_QUESTIONS,
    payload: data,
  };
};

const fetchDataError = err => {
  return {
    type: ACTION_TYPE.ERROR_QUESTIONS,
    payload: err,
  };
};

export default fetchQuestions;
