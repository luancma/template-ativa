import {
  CREATE_NEW_USER,
  SHOW_MESSAGE_SUCCESS,
  HIDE_MESSAGE_SUCCESS,
  HIDE_MESSAGE_FAILD,
  SHOW_MESSAGE_FAILD,
  RECEIVE_USERS,
  RECEIVE_USERS_SUCCESS,
  RECEIVE_USERS_FAILED,
} from '../constants/ActionTypes';

const INIT_STATE = {
  token: localStorage.getItem('user'),
  users: [],
  user: {},
  alertMessage: '',
  showMessageSuccess: false,
  showMessageFaild: false,
  showLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case RECEIVE_USERS: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case RECEIVE_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        showLoading: false,
      };
    }
    case RECEIVE_USERS_FAILED: {
      return {
        ...state,
        showMessageFaild: true,
        showLoading: false,
      };
    }
    case SHOW_MESSAGE_SUCCESS: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessageSuccess: true,
      };
    }
    case HIDE_MESSAGE_SUCCESS: {
      return {
        ...state,
        alertMessage: '',
        showMessageSuccess: false,
      };
    }
    case SHOW_MESSAGE_FAILD: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessageFaild: true,
      };
    }
    case HIDE_MESSAGE_FAILD: {
      return {
        ...state,
        alertMessage: '',
        showMessageFaild: false,
      };
    }
    default:
      return state;
  }
};
