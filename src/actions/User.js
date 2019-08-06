import {
  CREATE_NEW_USER,
  SHOW_MESSAGE_SUCCESS,
  HIDE_MESSAGE_SUCCESS,
  FETCH_ALL_USERS,
  SHOW_MESSAGE_FAILD,
  HIDE_MESSAGE_FAILD,
  RECEIVE_USERS,
  RECEIVE_USERS_SUCCESS,
} from '../constants/ActionTypes';

export const fetchAllUser = () => ({
  type: RECEIVE_USERS,
});

export const fetchAllUserSuccess = users => ({
  type: RECEIVE_USERS_SUCCESS,
  payload: users,
});

export const actionCreateUser = user => ({
  type: CREATE_NEW_USER,
  payload: user,
});
export const showAuthMessageFaild = message => ({
  type: SHOW_MESSAGE_FAILD,
  payload: message,
});

export const hideMessageFaild = () => ({
  type: HIDE_MESSAGE_FAILD,
});

export const showAuthMessageSuccess = message => ({
  type: SHOW_MESSAGE_SUCCESS,
  payload: message,
});

export const hideMessageSuccess = () => ({
  type: HIDE_MESSAGE_SUCCESS,
});
