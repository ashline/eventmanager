import {
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAILURE,
  COORDINATORS_GET_SUCCESS,
  COORDINATORS_GET_FAILURE,
  SUBMIT_FORM,
} from "../../data/constants";

const initialState = {
  coordinators: [],
  categories: [],
  isFormSubmitted: false,
  user: null,
  error: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_GET_SUCCESS:
      return { ...state, categories: action.response };
    case COORDINATORS_GET_SUCCESS:
      return {
        ...state,
        coordinators: filterUsers(action.response),
        user: getUser(action.response),
      };
    case CATEGORIES_GET_FAILURE:
      return { ...state, error: action.error };
    case COORDINATORS_GET_FAILURE:
      return { ...state, error: action.error };
    case SUBMIT_FORM:
      return { ...state, isFormSubmitted: true };
    default:
      return state;
  }
};

const filterUsers = (users) => users.filter((user) => user.name !== "Ashley");

const getUser = (users) => users.find((user) => user.name === "Ashley");

export default formReducer;
