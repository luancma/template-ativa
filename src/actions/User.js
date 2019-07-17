import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  SHOW_MESSAGE
} from "constants/ActionTypes";

export const createUserAction = (header, user) => {
  return {
    type: CREATE_USER,
    payload: { header, user }
  };
};

export const createUserSuccess = (user, message) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: { message, user }
  };
};
