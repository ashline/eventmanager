import {
  COORDINATORS_GET,
  CATEGORIES_GET,
  SUBMIT_FORM,
} from "../../data/constants";
import * as API from "../../data/api";

export const getCoordinators = () => (dispatch) => {
  const promise = API.getCoordinators();
  return dispatch({
    type: COORDINATORS_GET,
    promise,
  });
};

export const getCategories = () => (dispatch) => {
  const promise = API.getCategories();
  return dispatch({
    type: CATEGORIES_GET,
    promise,
  });
};

export const submitForm = () => (dispatch) => {
  return dispatch({ type: SUBMIT_FORM });
};
